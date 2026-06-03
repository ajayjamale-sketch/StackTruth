const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const pagesToFix = [
  'About.tsx', 'Blog.tsx', 'Careers.tsx', 'Contact.tsx',
  'Documentation.tsx', 'FAQPage.tsx', 'Features.tsx',
  'Jobs.tsx', 'KnowledgeBase.tsx', 'Pricing.tsx',
  'PrivacyPolicy.tsx', 'TermsConditions.tsx', 'Tutorials.tsx',
  'Login.tsx', 'Register.tsx'
];

pagesToFix.forEach(page => {
  const fullPath = path.join(pagesDir, page);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;

  // Replace h1 text-white with text-foreground
  if (content.includes('<h1 className="') && content.includes('text-white')) {
    content = content.replace(/(<h1[^>]*className="[^"]*)text-white([^"]*")/g, '$1text-foreground$2');
    modified = true;
  }
  
  // Replace specific text-slate/text-white instances in About.tsx
  if (page === 'About.tsx') {
    content = content.replace(/text-slate-200\/80/g, 'text-muted-foreground');
    content = content.replace(/text-white/g, (match, offset, string) => {
      // only replace if not inside a button or bg-primary (actually we just checked, there are none in About)
      return 'text-foreground';
    });
    content = content.replace(/text-slate-300\/70/g, 'text-muted-foreground');
    modified = true;
  }

  // Common subtitle colors
  if (content.match(/text-slate-[23]00\/[0-9]+/)) {
    content = content.replace(/text-slate-[23]00\/[0-9]+/g, 'text-muted-foreground');
    modified = true;
  }

  if (page === 'Login.tsx' || page === 'Register.tsx') {
    // Testimonial quote and logo in Login/Register split layout
    content = content.replace(/className="font-bold text-white/g, 'className="font-bold text-foreground');
    content = content.replace(/className="text-white\/70 text-sm/g, 'className="text-muted-foreground text-sm');
    content = content.replace(/className="text-white font-medium/g, 'className="text-foreground font-medium');
    content = content.replace(/className="text-white\/40 text-xs/g, 'className="text-muted-foreground text-xs');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed colors in ${page}`);
  }
});

console.log("Done");
