import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

const formsDir = 'examples/formulare';
const outDir = 'src/components/forms/generated';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const files = fs.readdirSync(formsDir).filter(f => f.endsWith('.docx'));

async function processAll() {
  const exportsList = [];
  
  for (const file of files) {
    const filePath = path.join(formsDir, file);
    const baseName = path.basename(file, '.docx').replace(/[^a-zA-Z0-9]/g, '');
    
    console.log("Processing " + file + " -> " + baseName + "...");
    
    try {
      const result = await mammoth.convertToHtml({path: filePath});
      let html = result.value;
      
      // Fix check boxes that might come as specific unicode chars
      html = html.replace(/☐/g, '[]').replace(/☒/g, '[x]');
      
      const htmlFileName = baseName + 'Html';
      fs.writeFileSync(path.join(outDir, htmlFileName + '.ts'), "export const rawHtml = " + JSON.stringify(html) + ";\n");
      
      const componentTemplate = `
import { useFormContext } from 'react-hook-form';
import parse, { Element, domToReact } from 'html-react-parser';
import type { HTMLReactParserOptions } from 'html-react-parser';
import '../../../assets/form.css';
import { TextField } from '@mui/material';
import { rawHtml } from './${htmlFileName}';

// Helper to generate a safe name for react-hook-form
function generateFieldName(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').substring(0, 30);
}

export default function ${baseName}() {
  const { register } = useFormContext();

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.tagName === 'td') {
         // Get raw text content of the TD
         let textContent = '';
         const extractText = (node: any) => {
           if (node.type === 'text') textContent += node.data;
           if (node.children) node.children.forEach(extractText);
         };
         extractText(domNode);
         
         const trimmed = textContent.trim();
         
         // Ignore completely empty cells
         if (!trimmed) {
           return (
             <td {...domNode.attribs}>
               <TextField variant="filled" size="small" fullWidth hiddenLabel margin="dense" {...register('field_' + Math.random().toString(36).substr(2, 5))} />
             </td>
           );
         }

         // Ignore section headers like "1. CATRE" or cells with only images
         if (/^[0-9]+\\.\\s/.test(trimmed)) {
           return undefined;
         }

         // If cell contains checkboxes "[]" or "[x]"
         if (trimmed.includes('[]') || trimmed.includes('[x]')) {
           // We can replace the brackets with real checkboxes
           // For MVP, let's just let it fall through or parse them specially
         }

         // Inject input after the label
         // We render the original children, then append the input
         const fieldName = generateFieldName(trimmed) || 'field_' + Math.random().toString(36).substr(2, 5);
         
         // Only add input if the text is short enough to be a label (not a massive paragraph)
         if (trimmed.length < 100) {
           return (
             <td {...domNode.attribs}>
               {domToReact(domNode.children as any, options)}
               <TextField variant="filled" size="small" fullWidth hiddenLabel margin="dense" {...register(fieldName)} style={{marginTop: '8px'}} />
             </td>
           );
         }
      }
      return undefined;
    }
  };

  return (
    <div className="physical-form-container">
      {parse(rawHtml, options)}
    </div>
  );
}
`;

      fs.writeFileSync(path.join(outDir, baseName + '.tsx'), componentTemplate);
      exportsList.push("export { default as " + baseName + " } from './" + baseName + "';");
    } catch (e) {
      console.error("Failed to process " + file + ": ", e);
    }
  }
  
  fs.writeFileSync(path.join(outDir, 'index.ts'), exportsList.join('\n'));
  console.log('All forms processed successfully!');
}

processAll();
