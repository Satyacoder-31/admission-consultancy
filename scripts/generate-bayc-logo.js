const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create high-res SVG for BAYC Institute (width: 900, height: 400)
// Matching the authentic typography of Bihar Acupressure Yoga College (BAYC Institute)
const baycSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" width="900" height="400">
  <defs>
    <style>
      .bayc-brand {
        font-family: 'Arial Black', 'Helvetica Neue', Arial, sans-serif;
        font-weight: 900;
        font-size: 200px;
        fill: #FFFFFF;
        text-anchor: middle;
        dominant-baseline: central;
      }
      .inst-brand {
        font-family: 'Arial Black', 'Helvetica Neue', Arial, sans-serif;
        font-weight: 900;
        font-size: 88px;
        fill: #000000;
        text-anchor: middle;
        dominant-baseline: central;
      }
    </style>
  </defs>

  <!-- Blue outer background box -->
  <rect x="0" y="0" width="900" height="400" fill="#2E3192" />

  <!-- Top Blue Section Text: BAYC -->
  <text x="450" y="132" class="bayc-brand">BAYC</text>

  <!-- Bottom White Container: Left 6px, Right 6px, Bottom 6px to give thin blue perimeter border -->
  <rect x="8" y="260" width="884" height="132" fill="#FFFFFF" />

  <!-- Bottom Stretched Text: Institute -->
  <g transform="translate(450, 326) scale(1.35, 0.95)">
    <text x="0" y="0" class="inst-brand" letter-spacing="-1px">Institute</text>
  </g>
</svg>`;

async function run() {
  const targetDir = path.join(__dirname, '../public/images/brand');
  fs.writeFileSync(path.join(targetDir, 'bayc-logo.svg'), baycSvg);

  // Render to high-res crystal clear PNG (1800x800)
  await sharp(Buffer.from(baycSvg))
    .resize(1800, 800)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(targetDir, 'bayc-logo.png'));

  console.log('BAYC Logo generated successfully!');
}

run().catch(console.error);
