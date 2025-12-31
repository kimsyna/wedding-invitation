const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const files = fs.readdirSync(imagesDir);

async function optimizeImages() {
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      const inputPath = path.join(imagesDir, file);
      const name = path.parse(file).name;

      // Full size webp
      const webpPath = path.join(imagesDir, `${name}.webp`);
      if (!fs.existsSync(webpPath)) {
        console.log(`Converting ${file} to WebP...`);
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(webpPath);
      }

      // Thumbnail webp
      const thumbPath = path.join(imagesDir, `${name}_thumb.webp`);
      if (!fs.existsSync(thumbPath)) {
         console.log(`Creating thumbnail for ${file}...`);
         await sharp(inputPath)
           .resize(400) // Resize width to 400px
           .webp({ quality: 70 })
           .toFile(thumbPath);
      }
    }
  }
}

optimizeImages().then(() => console.log('Done!'));
