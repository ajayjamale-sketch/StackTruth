const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'components')
];

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Replace text-blue-300, text-green-400, etc. that lack dark: prefix with theme-aware text
      const regex = /text-(blue|green|purple|yellow|red|pink|cyan|orange|emerald|indigo)-([34]00)(?!\s*dark:)/g;
      
      content = content.replace(regex, (match, color, weight) => {
        // Skip replacements if it's already inside a dark class or something we shouldn't touch
        modified = true;
        return `text-${color}-600 dark:text-${color}-${weight}`;
      });

      // Replace bg-blue-500/10 with bg-blue-500/10 dark:bg-blue-500/20 or similar? No, the background usually looks okay.

      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated colors in ${fullPath}`);
      }
    }
  }
}

dirs.forEach(processDir);

// Also fix index.css gradients
const cssPath = path.join(__dirname, 'src', 'index.css');
if (fs.existsSync(cssPath)) {
  let cssContent = fs.readFileSync(cssPath, 'utf8');
  let cssModified = false;

  if (cssContent.includes('.text-gradient-blue {') && !cssContent.includes('.dark .text-gradient-blue {')) {
    cssContent = cssContent.replace(
      /\.text-gradient-blue\s*\{[\s\S]*?background-clip:\s*text;\s*\}/,
      `.text-gradient-blue {
    background: linear-gradient(135deg, hsl(221 83% 40%), hsl(219 91% 50%));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .dark .text-gradient-blue {
    background: linear-gradient(135deg, hsl(221 83% 60%), hsl(219 91% 70%));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }`
    );
    cssModified = true;
  }

  if (cssModified) {
    fs.writeFileSync(cssPath, cssContent);
    console.log(`Updated index.css`);
  }
}

console.log("Done");
