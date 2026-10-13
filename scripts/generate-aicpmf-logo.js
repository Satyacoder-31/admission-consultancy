const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateAicpmfLogo() {
  const targetDir = path.join(__dirname, '../public/images/brand');
  const sourceImage = path.join(__dirname, '../aicpmf_trimmed.png');

  // 1. Process the inner symbols from source image: caduceus, cross, heart
  const extracted = await sharp(sourceImage)
    .extract({ left: 70, top: 96, width: 220, height: 168 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = extracted.info.width;
  const height = extracted.info.height;
  const cleanData = Buffer.alloc(extracted.data.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const r = extracted.data[idx];
      const g = extracted.data[idx + 1];
      const b = extracted.data[idx + 2];

      // Check if pixel is in one of the 4 outer corners touching the circular border
      const isTopLeftCorner = x < 12 && y < 6;
      const isTopRightCorner = x > width - 14 && y < 6;
      const isBottomLeftCorner = x < 8 && y > height - 12;
      const isBottomRightCorner = x > width - 12 && y > height - 14;

      if (isTopLeftCorner || isTopRightCorner || isBottomLeftCorner || isBottomRightCorner) {
        cleanData[idx] = 255;
        cleanData[idx + 1] = 255;
        cleanData[idx + 2] = 255;
      } else if (r > 215 && g > 215 && b > 215) {
        // Clean white background noise
        cleanData[idx] = 255;
        cleanData[idx + 1] = 255;
        cleanData[idx + 2] = 255;
      } else {
        cleanData[idx] = r;
        cleanData[idx + 1] = g;
        cleanData[idx + 2] = b;
      }
    }
  }

  // Resize cleaned symbols to 690x527 with high-definition Lanczos filter
  const centerSymbolsBuffer = await sharp(cleanData, {
    raw: { width, height, channels: 3 }
  })
    .resize(690, 527, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.6, m1: 1.4, m2: 2.2 })
    .png()
    .toBuffer();

  const symbolsBase64 = centerSymbolsBuffer.toString('base64');

  // 2. Build circular text:
  // "ALL INDIA COUNCIL OF PARAMEDICAL FACULTY"
  const phrase = 'ALL INDIA COUNCIL OF PARAMEDICAL FACULTY';
  const R = 502; // radius of text in green band
  const centerIndex = (phrase.length - 1) / 2; // 19.5
  // Span across 260 degrees over the top arc
  const stepDeg = 6.65;

  let textSvgTags = '';
  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
    if (char === ' ') continue;
    // 12 o'clock is -90 deg.
    const deg = -90 + (i - centerIndex) * stepDeg;
    const rad = (deg * Math.PI) / 180;
    const x = (600 + R * Math.cos(rad)).toFixed(2);
    const y = (600 + R * Math.sin(rad)).toFixed(2);
    const rot = (deg + 90).toFixed(2);
    textSvgTags += `
      <text x="${x}" y="${y}" transform="rotate(${rot}, ${x}, ${y})"
            font-family="'Arial Black', 'Impact', 'Trebuchet MS', sans-serif"
            font-size="62" font-weight="900" fill="#FFFFFF"
            text-anchor="middle" dominant-baseline="central"
            filter="url(#textDropShadow)">${char}</text>`;
  }

  // 3. Assemble self-contained vector SVG
  const completeSvg = `<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <filter id="textDropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" flood-color="#041708" flood-opacity="0.95"/>
    </filter>

    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9C4" />
      <stop offset="35%" stop-color="#FDD835" />
      <stop offset="70%" stop-color="#FBC02D" />
      <stop offset="100%" stop-color="#F57F17" />
    </linearGradient>

    <!-- Clip path to guarantee inner disc is mathematically circular and never bleeds -->
    <clipPath id="innerDiscClip">
      <circle cx="600" cy="600" r="416" />
    </clipPath>
  </defs>

  <!-- Outer dark border -->
  <circle cx="600" cy="600" r="590" fill="#0A2610" />

  <!-- Forest Green Council Band -->
  <circle cx="600" cy="600" r="580" fill="#185E2A" />

  <!-- Inner Pure White Circular Disc -->
  <circle cx="600" cy="600" r="424" fill="#0A2610" />
  <circle cx="600" cy="600" r="416" fill="#FFFFFF" />

  <!-- Embedded High-Definition Medical Symbols (Clipped to Inner Disc) -->
  <g clip-path="url(#innerDiscClip)">
    <image x="${Math.round(600 - 690 / 2)}" y="${Math.round(595 - 527 / 2)}" width="690" height="527" xlink:href="data:image/png;base64,${symbolsBase64}" />
  </g>

  <!-- Inner Dark Ring Separation Border (Drawn on top for crisp edge) -->
  <circle cx="600" cy="600" r="418" fill="none" stroke="#0A2610" stroke-width="8" />

  <!-- Perfectly Symmetrical Arced White Text -->
  ${textSvgTags}

  <!-- 3 Golden Stars at bottom arc -->
  <!-- Center Star (600, 1102) -->
  <g transform="translate(600, 1102) scale(1.35)">
    <polygon points="0,-38 11,-12 38,-12 16,6 23,32 0,17 -23,32 -16,6 -38,-12 -11,-12" fill="url(#starGrad)" stroke="#0A2610" stroke-width="2.5" stroke-linejoin="round" />
  </g>
  <!-- Left Star (-24 deg along curve) -->
  <g transform="translate(445, 1076) rotate(-24) scale(1.2)">
    <polygon points="0,-38 11,-12 38,-12 16,6 23,32 0,17 -23,32 -16,6 -38,-12 -11,-12" fill="url(#starGrad)" stroke="#0A2610" stroke-width="2.5" stroke-linejoin="round" />
  </g>
  <!-- Right Star (+24 deg along curve) -->
  <g transform="translate(755, 1076) rotate(24) scale(1.2)">
    <polygon points="0,-38 11,-12 38,-12 16,6 23,32 0,17 -23,32 -16,6 -38,-12 -11,-12" fill="url(#starGrad)" stroke="#0A2610" stroke-width="2.5" stroke-linejoin="round" />
  </g>
</svg>`;

  // Save the SVG
  fs.writeFileSync(path.join(targetDir, 'aicpmf-logo.svg'), completeSvg);

  // Render to 1200x1200 crystal clear PNG
  const finalPng = await sharp(Buffer.from(completeSvg))
    .resize(1200, 1200)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(targetDir, 'aicpmf-logo.png'));

  console.log('AICPMF Logo generated successfully!', finalPng);
}

generateAicpmfLogo().catch(console.error);
