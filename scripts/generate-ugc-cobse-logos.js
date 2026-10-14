const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brandDir = path.join(__dirname, '..', 'public', 'images', 'brand');

const ugcSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <radialGradient id="ugcBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f0f7ff"/>
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Circular background -->
  <circle cx="400" cy="400" r="390" fill="url(#ugcBg)" stroke="#0c2340" stroke-width="14"/>
  <circle cx="400" cy="400" r="365" fill="none" stroke="#d4af37" stroke-width="5"/>
  <circle cx="400" cy="400" r="285" fill="#0c2340"/>
  <circle cx="400" cy="400" r="275" fill="none" stroke="#d4af37" stroke-width="4"/>

  <!-- Curved text paths -->
  <path id="topArc" d="M 120 400 A 280 280 0 1 1 680 400" fill="none"/>
  <path id="bottomArc" d="M 680 400 A 280 280 0 1 1 120 400" fill="none"/>

  <text font-family="'Helvetica Neue', Arial, sans-serif" font-size="28" font-weight="900" fill="#0c2340" letter-spacing="3.5">
    <textPath href="#topArc" startOffset="50%" text-anchor="middle">
      UNIVERSITY GRANTS COMMISSION
    </textPath>
  </text>

  <text font-family="'Helvetica Neue', Arial, sans-serif" font-size="27" font-weight="bold" fill="#0c2340" letter-spacing="4">
    <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">
      विश्वविद्यालय अनुदान आयोग
    </textPath>
  </text>

  <!-- Decorative stars -->
  <polygon points="400,140 405,152 418,152 407,160 411,172 400,164 389,172 393,160 382,152 395,152" fill="#d4af37" transform="translate(-250, 240) scale(0.9)"/>
  <polygon points="400,140 405,152 418,152 407,160 411,172 400,164 389,172 393,160 382,152 395,152" fill="#d4af37" transform="translate(250, 240) scale(0.9)"/>

  <!-- Center: Torch of Knowledge, Open Book & UGC -->
  <g transform="translate(400, 310)">
    <!-- Torch Flame -->
    <path d="M 0 -70 C 15 -45, 25 -25, 0 5 C -25 -25, -15 -45, 0 -70 Z" fill="#ff9933"/>
    <path d="M 0 -50 C 8 -35, 12 -20, 0 0 C -12 -20, -8 -35, 0 -50 Z" fill="#ffe066"/>
    <!-- Torch Handle -->
    <path d="M -10 5 L 10 5 L 6 35 L -6 35 Z" fill="#d4af37"/>
    <rect x="-14" y="0" width="28" height="6" rx="2" fill="#d4af37"/>

    <!-- Open Book -->
    <path d="M -70 55 C -35 48, -10 50, 0 65 C 10 50, 35 48, 70 55 L 70 85 C 35 78, 10 80, 0 95 C -10 80, -35 78, -70 85 Z" fill="#ffffff" stroke="#d4af37" stroke-width="3"/>
    <line x1="0" y1="65" x2="0" y2="95" stroke="#d4af37" stroke-width="2"/>
    <line x1="-55" y1="65" x2="-15" y2="63" stroke="#0c2340" stroke-width="2"/>
    <line x1="-55" y1="73" x2="-15" y2="71" stroke="#0c2340" stroke-width="2"/>
    <line x1="15" y1="63" x2="55" y2="65" stroke="#0c2340" stroke-width="2"/>
    <line x1="15" y1="71" x2="55" y2="73" stroke="#0c2340" stroke-width="2"/>
  </g>

  <!-- Big Bold UGC Letters -->
  <text x="400" y="475" font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif" font-size="78" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="8" filter="url(#shadow)">
    UGC
  </text>

  <!-- Motto ribbon at bottom of center -->
  <g transform="translate(400, 515)">
    <rect x="-140" y="0" width="280" height="28" rx="14" fill="#d4af37"/>
    <text x="0" y="19" font-family="'Helvetica Neue', Arial, sans-serif" font-size="15" font-weight="bold" fill="#0c2340" text-anchor="middle" letter-spacing="1.5">
      ज्ञान-विज्ञान विमुक्तये
    </text>
  </g>
</svg>`;

const cobseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <radialGradient id="cobseBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fffcf0"/>
    </radialGradient>
    <filter id="cShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Circular background -->
  <circle cx="400" cy="400" r="390" fill="url(#cobseBg)" stroke="#0e3a64" stroke-width="14"/>
  <circle cx="400" cy="400" r="365" fill="none" stroke="#e6b437" stroke-width="5"/>
  <circle cx="400" cy="400" r="285" fill="#0e3a64"/>
  <circle cx="400" cy="400" r="275" fill="none" stroke="#e6b437" stroke-width="4"/>

  <!-- Curved text paths -->
  <path id="cobseTopArc" d="M 120 400 A 280 280 0 1 1 680 400" fill="none"/>
  <path id="cobseBottomArc" d="M 680 400 A 280 280 0 1 1 120 400" fill="none"/>

  <text font-family="'Helvetica Neue', Arial, sans-serif" font-size="25" font-weight="900" fill="#0e3a64" letter-spacing="2.8">
    <textPath href="#cobseTopArc" startOffset="50%" text-anchor="middle">
      COUNCIL OF BOARDS OF SCHOOL EDUCATION
    </textPath>
  </text>

  <text font-family="'Helvetica Neue', Arial, sans-serif" font-size="26" font-weight="bold" fill="#0e3a64" letter-spacing="5">
    <textPath href="#cobseBottomArc" startOffset="50%" text-anchor="middle">
      NEW DELHI • INDIA
    </textPath>
  </text>

  <!-- Center Elements -->
  <g transform="translate(400, 310)">
    <!-- Ashok Chakra / Radiance Motif -->
    <circle cx="0" cy="0" r="45" fill="#e6b437"/>
    <circle cx="0" cy="0" r="38" fill="#0e3a64"/>
    <circle cx="0" cy="0" r="12" fill="#e6b437"/>

    <!-- Lamp of Wisdom -->
    <path d="M -30 20 C -25 35, 25 35, 30 20 L 20 15 L -20 15 Z" fill="#e6b437"/>
    <path d="M 0 -10 C 10 5, -10 5, 0 -10 Z" fill="#ff7700"/>

    <!-- Open Book Symbol of Education -->
    <path d="M -80 45 C -40 38, -12 40, 0 55 C 12 40, 40 38, 80 45 L 80 75 C 40 68, 12 70, 0 85 C -12 70, -40 68, -80 75 Z" fill="#ffffff" stroke="#e6b437" stroke-width="3"/>
    <line x1="0" y1="55" x2="0" y2="85" stroke="#e6b437" stroke-width="2"/>
  </g>

  <!-- Big Bold COBSE Letters -->
  <text x="400" y="475" font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif" font-size="70" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="6" filter="url(#cShadow)">
    COBSE
  </text>

  <!-- Subtitle Tag -->
  <g transform="translate(400, 515)">
    <rect x="-150" y="0" width="300" height="28" rx="14" fill="#e6b437"/>
    <text x="0" y="19" font-family="'Helvetica Neue', Arial, sans-serif" font-size="14" font-weight="900" fill="#0e3a64" text-anchor="middle" letter-spacing="1.5">
      ESTABLISHED 1979 • APEX COUNCIL
    </text>
  </g>
</svg>`;

async function main() {
  fs.writeFileSync(path.join(brandDir, 'ugc-logo.svg'), ugcSvg);
  fs.writeFileSync(path.join(brandDir, 'cobse-logo.svg'), cobseSvg);

  await sharp(Buffer.from(ugcSvg))
    .resize(500, 500)
    .png()
    .toFile(path.join(brandDir, 'ugc-logo.png'));

  await sharp(Buffer.from(cobseSvg))
    .resize(500, 500)
    .png()
    .toFile(path.join(brandDir, 'cobse-logo.png'));

  console.log('Successfully created UGC and COBSE logo assets (SVG & PNG).');
}

main().catch(console.error);
