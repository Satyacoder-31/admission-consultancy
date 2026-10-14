const fs = require('fs');
const content = fs.readFileSync('src/data/courses.ts', 'utf8');
const lines = content.split('\n');
const ids = [];
for (const line of lines) {
  const match = line.match(/id:\s*'([^']+)'/);
  if (match) {
    ids.push(match[1]);
  }
}
console.log('Total course IDs found:', ids.length);
console.log(ids.join(', '));
