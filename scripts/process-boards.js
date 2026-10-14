const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadedDir = 'C:/Users/krish/.gemini/antigravity-ide/brain/9e7259c2-78fe-461e-bbb5-85efceefd4ec/.user_uploaded';
const targetDir = path.join(__dirname, '../public/images/boards');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function processBoards() {
  console.log('Generating high-definition clean board logos...');

  // 1. BOSSE: Board of Open Schooling and Skill Education (Sikkim)
  // Dimensions 927x1024. Main circle centered at x=463, y=470, radius ~ 445.
  // Bottom ribbon extends to y ~ 1000.
  // Let's create an alpha mask: inside circle (or ribbon at bottom), keep. Outside or lens icon (x < 160, y > 820), make transparent.
  {
    const { data, info } = await sharp(path.join(uploadedDir, 'media_1791975927590.jpg'))
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const cx = 463;
    const cy = 475;
    const rCircle = 445;

    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const i = (y * info.width + x) * 4;
        // Distance to main circle
        const dist = Math.hypot(x - cx, y - cy);
        
        // Lens icon removal
        if (x < 160 && y > 820) {
          data[i + 3] = 0;
          continue;
        }

        // Outside main circle and not part of the bottom ribbon
        // Bottom ribbon is between x ~ 270 and x ~ 655, y between 700 and 1005
        const inRibbon = x >= 270 && x <= 655 && y >= 700 && y <= 1005;
        if (dist > rCircle && !inRibbon) {
          data[i + 3] = 0; // transparent
        } else if (dist > rCircle + 4 && inRibbon) {
          // If in ribbon area, check if pixel is blue/white or checkerboard
          const r = data[i], g = data[i+1], b = data[i+2];
          // Checkerboard is greyish (239, 239, 239) or white (255, 255, 255)
          const isRibbonBlue = b > 100 && b > r * 1.2;
          const isRibbonWhite = r > 240 && g > 240 && b > 240 && y < 980;
          if (!isRibbonBlue && !isRibbonWhite && y > 920) {
            data[i + 3] = 0;
          }
        }
      }
    }

    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim()
      .resize(500, 500, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(targetDir, 'bosse.png'));
    console.log('✓ BOSSE processed successfully');
  }

  // 2. Jamia Urdu Aligarh
  // Already crisp 225x225. Let's make it 500x500 clean PNG with transparent background.
  {
    const { data, info } = await sharp(path.join(uploadedDir, 'media_1791975930107.jpg'))
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Center is (116, 107), radius ~ 80
    const cx = 116;
    const cy = 107;
    const r = 78;

    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const i = (y * info.width + x) * 4;
        const dist = Math.hypot(x - cx, y - cy);
        if (dist > r + 3) {
          data[i + 3] = 0; // transparent outside circle
        }
      }
    }

    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim()
      .resize(500, 500, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(targetDir, 'jamia-urdu.png'));
    console.log('✓ Jamia Urdu Aligarh processed successfully');
  }

  // 3. TNSOS: Tamil Nadu Open Board
  // Center ~ (496, 504), radius ~ 452
  {
    const { data, info } = await sharp(path.join(uploadedDir, 'media_1791975935929.jpg'))
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const cx = 496;
    const cy = 504;
    const r = 452;

    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const i = (y * info.width + x) * 4;
        const dist = Math.hypot(x - cx, y - cy);
        if (dist > r) {
          data[i + 3] = 0; // transparent outside circular badge (removes lens icon and border)
        }
      }
    }

    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim()
      .resize(500, 500, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(targetDir, 'tnsos.png'));
    console.log('✓ TNSOS processed successfully');
  }

  // 4. BBOSE: Bihar Board of Open Schooling & Examination
  // Pink bounds: minX: 33, maxX: 1005, minY: 30, maxY: 992
  // Center ~ (519, 511), radius ~ 482
  {
    const { data, info } = await sharp(path.join(uploadedDir, 'media_1791975938031.jpg'))
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const cx = 519;
    const cy = 511;
    const r = 482;

    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const i = (y * info.width + x) * 4;
        const dist = Math.hypot(x - cx, y - cy);
        if (dist > r) {
          data[i + 3] = 0; // transparent outside sticker circle
        }
      }
    }

    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim()
      .resize(500, 500, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(targetDir, 'bbose.png'));
    console.log('✓ BBOSE processed successfully');
  }

  console.log('All 4 board logos are saved and ready in public/images/boards/');
}

processBoards().catch(console.error);
