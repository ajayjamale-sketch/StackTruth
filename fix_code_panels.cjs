const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'components', 'features')
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

      // Replace text-white/50, text-white/30 with text-muted-foreground
      if (content.match(/text-white\/(30|40|50|60)/)) {
        content = content.replace(/text-white\/(30|40|50|60)/g, 'text-muted-foreground');
        modified = true;
      }

      // Replace text-white/70, 80, 90 with text-foreground
      if (content.match(/text-white\/(70|80|90)/)) {
        content = content.replace(/text-white\/(70|80|90)/g, 'text-foreground');
        modified = true;
      }
      
      // Also check if text-white alone is still lingering in Login.tsx code panel
      // My earlier script might have missed it if it wasn't a header.
      // We know there are lingering text-white in Login.tsx and Register.tsx.
      // Wait, let's just do text-white/XX for now.
      
      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated opacities in ${fullPath}`);
      }
    }
  }
}

dirs.forEach(processDir);
console.log("Done");
