const parse = require('html-react-parser');
function generateFieldName(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').substring(0, 30);
}
console.log(generateFieldName("1. CĂTRE"));
console.log(generateFieldName("CĂTRE"));
