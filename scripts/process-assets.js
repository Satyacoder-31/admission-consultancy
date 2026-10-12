const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadedDir = 'C:/Users/krish/.gemini/antigravity-ide/brain/a517afcb-024f-44a3-ac49-df82b1b90adf/.user_uploaded';
const targetDir = path.join(__dirname, '../public/images/brand');
const logosDir = path.join(__dirname, '../public/images/universities');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// 1. Copy original images
fs.copyFileSync(path.join(uploadedDir, 'media_1791806800576.jpg'), path.join(targetDir, 'logo.jpg'));
fs.copyFileSync(path.join(uploadedDir, 'media_1791806804034.jpg'), path.join(targetDir, 'universities_poster.jpg'));
fs.copyFileSync(path.join(uploadedDir, 'media_1791806805659.jpg'), path.join(targetDir, 'admission_poster.jpg'));
fs.copyFileSync(path.join(uploadedDir, 'media_1791806807605.jpg'), path.join(targetDir, 'courses_poster.jpg'));

console.log('Brand files copied successfully!');

async function processUniversityPoster() {
  const posterPath = path.join(uploadedDir, 'media_1791806804034.jpg');
  const metadata = await sharp(posterPath).metadata();
  console.log(`Universities poster dimensions: ${metadata.width}x${metadata.height}`);

  // The poster has 3 rows and 5 columns of universities inside white rounded cards!
  // Top header "LEADING UNIVERSITIES AVAILABLE:" takes some height.
  // Let's calculate the bounding boxes or slice them.
  // 15 institutions:
  // Row 1:
  // 1. North East Frontier Technical University (NEFTU)
  // 2. North East Christian University
  // 3. Himalayan Garhwal University (HGU)
  // 4. ISBM University
  // 5. Calorx Teacher's University
  // Row 2:
  // 6. Arni University
  // 7. Sikkim Global Technical University (SGTU)
  // 8. Sikkim Alpine University (SAU)
  // 9. Sikkim Skill University (SSU)
  // 10. Saveetha Amaravati University
  // Row 3:
  // 11. Mansarovar Global University (MGU)
  // 12. Dr. A.P.J. Abdul Kalam University
  // 13. Sardar Patel University (SPU)
  // 14. OPJS University
  // 15. SRK University

  const universities = [
    { slug: 'neftu', name: 'North East Frontier Technical University', row: 0, col: 0 },
    { slug: 'necu', name: 'North East Christian University', row: 0, col: 1 },
    { slug: 'hgu', name: 'Himalayan Garhwal University', row: 0, col: 2 },
    { slug: 'isbm', name: 'ISBM University', row: 0, col: 3 },
    { slug: 'calorx', name: "Calorx Teacher's University", row: 0, col: 4 },
    { slug: 'arni', name: 'Arni University', row: 1, col: 0 },
    { slug: 'sgtu', name: 'Sikkim Global Technical University', row: 1, col: 1 },
    { slug: 'sau', name: 'Sikkim Alpine University', row: 1, col: 2 },
    { slug: 'ssu', name: 'Sikkim Skill University', row: 1, col: 3 },
    { slug: 'saveetha', name: 'Saveetha Amaravati University', row: 1, col: 4 },
    { slug: 'mgu', name: 'Mansarovar Global University', row: 2, col: 0 },
    { slug: 'apj-abdul-kalam', name: 'Dr. A.P.J. Abdul Kalam University', row: 2, col: 1 },
    { slug: 'spu', name: 'Sardar Patel University', row: 2, col: 2 },
    { slug: 'opjs', name: 'OPJS University', row: 2, col: 3 },
    { slug: 'srk', name: 'SRK University', row: 2, col: 4 }
  ];

  // Poster dimensions: width is typically around 1030 or similar, height around 530.
  // Grid region:
  // Total width: metadata.width
  // Total height: metadata.height
  // Let's calibrate exact grid bounds:
  // Header is roughly top ~17-18% of image.
  // Grid width starts around 2.5% to 97.5%
  // 5 cols, 3 rows
  const gridTop = Math.round(metadata.height * 0.175);
  const gridBottom = Math.round(metadata.height * 0.975);
  const gridHeight = gridBottom - gridTop;
  const rowHeight = gridHeight / 3;

  const gridLeft = Math.round(metadata.width * 0.024);
  const gridRight = Math.round(metadata.width * 0.976);
  const gridWidth = gridRight - gridLeft;
  const colWidth = gridWidth / 5;

  for (const uni of universities) {
    const left = Math.round(gridLeft + uni.col * colWidth);
    const top = Math.round(gridTop + uni.row * rowHeight);
    const width = Math.round(colWidth);
    const height = Math.round(rowHeight);

    // Crop each university tile
    await sharp(posterPath)
      .extract({ left, top, width, height })
      .toFile(path.join(logosDir, `${uni.slug}.png`));
    
    console.log(`Cropped ${uni.slug}: ${uni.name}`);
  }
}

processUniversityPoster().catch(console.error);
