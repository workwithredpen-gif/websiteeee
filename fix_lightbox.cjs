const fs = require('fs');

const files = ["portraits.html", "advertising.html", "marketing.html", "events.html", "commercial.html", "lifestyle.html"];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix the "relative" class that was overriding "fixed"
    content = content.replace(/opacity-0"/g, 'opacity-0" style="z-index: 9999;"');

    // Fix the z-100 linter error
    content = content.replace(/z-\[100\]/g, 'z-50');

    // Let's also ensure the close buttons and zoom buttons have higher z-index so they are clickable
    content = content.replace(/z-\[110\]/g, 'z-50');

    fs.writeFileSync(file, content);
});

console.log('Successfully fixed lightbox HTML in all category pages.');
