const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'components', 'features')
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // We want to append " dark" to className strings that contain "section-dark", "section-dark-2", or "section-hero"
      // Match className="... section-dark ..." and ensure it doesn't already have " dark" or "dark "
      
      const regex = /className=(["'])([^"']*(?:section-dark|section-hero)[^"']*)\1/g;
      
      content = content.replace(regex, (match, quote, classList) => {
        const classes = classList.split(/\s+/);
        if (!classes.includes('dark')) {
          classes.push('dark');
          modified = true;
          return `className=${quote}${classes.join(' ')}${quote}`;
        }
        return match;
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

dirs.forEach(dir => {
  if (fs.existsSync(dir)) processDir(dir);
});

console.log("Done");
