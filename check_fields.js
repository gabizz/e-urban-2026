import fs from 'fs';
import parse from 'html-react-parser';
const html = fs.readFileSync('src/components/forms/generated/CEREREAUTORIZATIEDECONSTRUIREHtml.ts', 'utf8');

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
         const trimmed = textContent.trim();
         if (!trimmed) return;
         if (/^[0-9]+\.\s/.test(trimmed)) return;
         console.log(generateFieldName(trimmed));
      }
    }
}
parse(html.replace('export const rawHtml = "', '').replace('";', ''), options);
