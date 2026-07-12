const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    let count = 0;
    let urlCount = 0;
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            const result = processDir(fullPath);
            count += result.count;
            urlCount += result.urlCount;
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Regex to find Cloudinary URLs and inject w_1200 parameter
            // It replaces /image/upload/v... or /image/upload/f_auto... with /image/upload/w_1200,f_auto,q_auto/...
            // First we normalize everything by removing existing w_, f_, q_ params
            const regex = /(https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/)(?:[a-zA-Z0-9_,:]+\/)?(v\d+\/[^"'\s\)]+)/g;
            
            let changed = false;
            let newContent = content.replace(regex, (match, p1, p2) => {
                urlCount++;
                return p1 + 'w_1200,f_auto,q_auto/' + p2;
            });

            if (newContent !== content) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                count++;
                console.log(`✅ Updated ${file}`);
            }
        }
    }
    return { count, urlCount };
}

console.log('🚀 Starting pixelation fix...');
const result = processDir(process.cwd());
console.log(`\n🎉 Done! Fixed ${result.urlCount} images across ${result.count} HTML files.`);
