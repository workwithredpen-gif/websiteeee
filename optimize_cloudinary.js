import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function optimizeCloudinaryUrls(dir) {
    const files = fs.readdirSync(dir);
    let updatedCount = 0;

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        // Process HTML files, skipping node_modules and hidden folders
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            updatedCount += optimizeCloudinaryUrls(fullPath);
        } else if (file.endsWith('.html') || file.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Regex to find cloudinary upload URLs that don't already have f_auto,q_auto
            // It matches: /upload/v123456... and changes to /upload/f_auto,q_auto/v123456...
            const regex = /(https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/)(v\d+\/)/g;
            
            if (regex.test(content)) {
                // Replace the URL with the optimized version
                const newContent = content.replace(regex, '$1f_auto,q_auto/$2');
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`✅ Updated Cloudinary URLs in: ${path.relative(__dirname, fullPath)}`);
                updatedCount++;
            }
        }
    }
    return updatedCount;
}

console.log('Starting Cloudinary URL optimization...');
const total = optimizeCloudinaryUrls(__dirname);
console.log(`\n🎉 Done! Added auto-optimization flags to ${total} files.`);
