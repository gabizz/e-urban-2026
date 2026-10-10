const parse = require("html-react-parser").default; //('html-react-parser');
const html = `<tr><td><p><strong>Cod de identificare fiscală (CIF)</strong></p><p><strong></strong></p></td><td colspan="2"><p><strong>Adresa oficială</strong></p><p><em></em></p><p><em></em></p><p><em></em></p><p><em></em></p></td></tr>`;
function generateFieldName(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').substring(0, 30);
}
let options = {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'td') {
         let textContent = '';
         const extractText = (node) => {
           if (node.type === 'text') textContent += node.data;
           if (node.children) node.children.forEach(extractText);
         };
         extractText(domNode);
         console.log(generateFieldName(textContent.trim()));
      }
    }
}
parse(html, options);
