const fs = require('fs');
const path = require('path');
const dir = 'src/components/forms/generated';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && !f.endsWith('Html.tsx') && f !== 'index.ts');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Need to import Controller
  if (!content.includes('Controller')) {
    content = content.replace("import { useFormContext } from 'react-hook-form';", "import { useFormContext, Controller } from 'react-hook-form';");
  }

  // Import DatePicker (maybe we import CustomDatePicker instead of material one directly?)
  if (!content.includes('CustomDatePicker')) {
    content = content.replace("import { CustomTextField as TextField } from '../../inputs';", "import { CustomTextField as TextField, CustomDatePicker } from '../../inputs';");
  }

  // We need to change the logic:
  // if (trimmed.length < 100) { ... }
  // To handle date
  
  const targetLogic = `if (trimmed.length < 100) {
           return (
             <td {...attributesToProps(domNode.attribs)}>
               {domToReact(domNode.children as any, options)}
               <TextField variant="filled" size="small" fullWidth hiddenLabel margin="dense" {...register(fieldName)} style={{marginTop: '8px'}} />
             </td>
           );
         }`;
         
  const replacementLogic = `if (trimmed.length < 100) {
           const isDate = /^(data|data_\\w+|data\\s+\\w+)$/i.test(fieldName) || /^(data|data:)$/i.test(trimmed.trim());
           if (isDate) {
             return (
               <td {...attributesToProps(domNode.attribs)}>
                 {domToReact(domNode.children as any, options)}
                 <CustomDatePicker name={fieldName} style={{marginTop: '8px'}} />
               </td>
             );
           }
           return (
             <td {...attributesToProps(domNode.attribs)}>
               {domToReact(domNode.children as any, options)}
               <TextField variant="filled" size="small" fullWidth hiddenLabel margin="dense" {...register(fieldName)} style={{marginTop: '8px'}} />
             </td>
           );
         }`;
  
  if (content.includes('if (trimmed.length < 100) {')) {
    // We should use regex to replace it properly because attributesToProps might be domNode.attribs in some files
  }
}
