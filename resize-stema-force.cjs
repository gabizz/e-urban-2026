const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/forms/generated');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes("maxHeight: '300px'")) {
    content = content.replace(/maxHeight: '300px'/g, "height: '250px'"); // Let's force it to 250px height
    fs.writeFileSync(filePath, content, 'utf8');
  }
}
console.log('Forced height to 250px');
