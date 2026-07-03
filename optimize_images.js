import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'public', 'assets');
const MAX_WIDTH = 1920; // Resize to max width for web, no need for images larger than this on typical screens

async function optimizeImages() {
  console.log('Starting image optimization...');
  const files = fs.readdirSync(assetsDir);
  let totalSaved = 0;

  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    const ext = path.extname(file).toLowerCase();
    
    // Only process jpg and png files
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const stats = fs.statSync(filePath);
      const originalSize = stats.size;
      const tempPath = filePath + '.tmp';

      try {
        // Resize large images to a max width of 1920px (without enlarging smaller images)
        let image = sharp(filePath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

        // Apply compression based on format
        if (ext === '.jpg' || ext === '.jpeg') {
          image = image.jpeg({ quality: 80, progressive: true });
        } else if (ext === '.png') {
          image = image.png({ quality: 80, compressionLevel: 9 });
        }

        await image.toFile(tempPath);
        
        const newStats = fs.statSync(tempPath);
        
        // If the new file is smaller, replace the old one
        if (newStats.size < originalSize) {
          fs.renameSync(tempPath, filePath);
          const saved = originalSize - newStats.size;
          totalSaved += saved;
          console.log(`✅ Optimized ${file}: ${(originalSize/1024/1024).toFixed(2)}MB -> ${(newStats.size/1024/1024).toFixed(2)}MB (Saved ${(saved/1024/1024).toFixed(2)}MB)`);
        } else {
          // If for some reason the new file is larger, keep original
          fs.unlinkSync(tempPath);
          console.log(`➖ Skipped ${file} (original is smaller or same)`);
        }
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }

  console.log(`\n🎉 Optimization complete! Total space saved: ${(totalSaved/1024/1024).toFixed(2)}MB`);
}

optimizeImages();
