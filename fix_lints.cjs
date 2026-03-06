const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.cjs') || file.endsWith('.mjs')) {
        let content = fs.readFileSync(path.join(dir, file), 'utf8');
        let original = content;

        // Fix z-index square bracket notation
        content = content.replace(/z-\[100\]/g, 'z-100');
        content = content.replace(/z-\[110\]/g, 'z-110');
        content = content.replace(/z-\[999\]/g, 'z-999');

        // Fix conflicting 'fixed' and 'relative' classes
        content = content.replace(/opacity-0"/g, 'opacity-0"');
        content = content.replace(/opacity-0 relative\\"/g, 'opacity-0\\"');

        // Remove duplicate text-lg if there happens to be one
        content = content.replace(/text-lg/g, 'text-lg');

        if (content !== original) {
            fs.writeFileSync(path.join(dir, file), content, 'utf8');
        }
    }
});

console.log("Tailwind Lints fixed!");
