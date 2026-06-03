const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'components', 'features'),
  path.join(__dirname, 'src', 'components', 'layout')
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
      
      const regex = /className=(["'])([^"']*(?:section-dark|section-hero)[^"']*)\1/g;
      
      content = content.replace(regex, (match, quote, classList) => {
        const classes = classList.split(/\s+/).filter(c => c !== 'dark');
        modified = true;
        return `className=${quote}${classes.join(' ')}${quote}`;
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

dirs.forEach(processDir);
console.log("Done");
