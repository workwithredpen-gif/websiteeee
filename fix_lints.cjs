const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.html') || file.endsWith('.cjs') || file.endsWith('.mjs') || file.endsWith('.js')) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isFile()) {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;

            // Fix z-100 and z-110
            content = content.replace(/z-\[100\]/g, 'z-100');
            content = content.replace(/z-\[110\]/g, 'z-110');

            // Fix grow
            content = content.replace(/\bflex-grow\b/g, 'grow');

            // Fix sticky relative conflict in update_fullscreen_nav.cjs caused by fuzzy match
            if (file === 'update_fullscreen_nav.cjs') {
                content = content.replace(/sticky top-0 bg-red\/95 backdrop-blur-sm z-110 relative/g, 'sticky top-0 bg-red/95 backdrop-blur-sm z-110');
            }

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Fixed lints in', file);
            }
        }
    }
});
console.log('All file lints resolved.');
