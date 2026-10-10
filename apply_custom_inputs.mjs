import fs from 'fs';
import path from 'path';

const formsDir = 'src/components/forms/generated';
const files = fs.readdirSync(formsDir).filter(f => f.endsWith('.tsx') && !f.endsWith('Html.tsx') && f !== 'index.ts' && f !== 'CEREREAUTORIZATIEDECONSTRUIRE.tsx');

const customBlock = `         if (trimmed.length < 100) {
           if (fieldName === 'jude_ul') {
             return (
               <td {...attributesToProps(domNode.attribs)}>
                 {domToReact(domNode.children as any, options)}
                 <UATAutocomplete name={fieldName} label="" type="judet" />
               </td>
             );
           }
           if (fieldName === 'localitatea_uat' || fieldName === 'municipiul_ora_ul_comuna') {
             return (
               <td {...attributesToProps(domNode.attribs)}>
                 {domToReact(domNode.children as any, options)}
                 <UATAutocomplete 
                   name={fieldName} 
                   label="" 
                   type="localitate" 
                   linkedJudetName="jude_ul" 
                   onSelectUAT={(uat: any) => {
                     if (fieldName === 'localitatea_uat') {
                       setValue('cod_de_identificare_fiscal_cif', uat.cui || '', { shouldValidate: true, shouldDirty: true });
                       const email = uat['E-mail general'] || uat['E-mail registratura'] || '';
                       const address = uat.Adresa || '';
                       setValue('adresa_oficial', email ? \`\${address}\\nEmail: \${email}\` : address, { shouldValidate: true, shouldDirty: true });
                       
                       const loc = (uat.Localitate || '').toUpperCase();
                       const cap = (s: string) => {
                         let res = s.toLowerCase();
                         res = res.replace(/(^|[\\s-])\\S/g, l => l.toUpperCase());
                         return res;
                       };
                       let institutionName = 'Primăria Comunei ' + cap(loc);
                       if (loc.startsWith('MUNICIPIUL ')) {
                         institutionName = 'Primăria Municipiului ' + cap(loc.substring(11));
                       } else if (loc.startsWith('ORAS ')) {
                         institutionName = 'Primăria Orașului ' + cap(loc.substring(5));
                       } else if (loc.startsWith('SECTORUL ')) {
                         institutionName = 'Primăria Sectorului ' + cap(loc.substring(9));
                       }
                       setValue('institu_iaprim_ria_municipiulu', institutionName, { shouldValidate: true, shouldDirty: true });
                     }
                   }}
                 />
               </td>
             );
           }
           return (
             <td {...attributesToProps(domNode.attribs)}>
               {domToReact(domNode.children as any, options)}
               <TextField 
                 variant="filled" 
                 size="small" 
                 fullWidth 
                 hiddenLabel 
                 margin="dense" 
                 multiline={fieldName === 'adresa_oficial'}
                 minRows={fieldName === 'adresa_oficial' ? 3 : 1}
                 {...register(fieldName)} 
                 style={{marginTop: '8px'}} 
               />
             </td>
           );
         }`;

for (const file of files) {
  const filePath = path.join(formsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add UATAutocomplete import if missing
  if (!content.includes('UATAutocomplete')) {
    content = content.replace(
      "import stemaRo from '../../../assets/stema_ro.webp';",
      "import stemaRo from '../../../assets/stema_ro.webp';\nimport UATAutocomplete from '../UATAutocomplete';"
    );
  }

  // Add setValue to useFormContext if missing
  if (content.includes('const { register } = useFormContext();')) {
    content = content.replace(
      'const { register } = useFormContext();',
      'const { register, setValue } = useFormContext();'
    );
  }

  // Find the block to replace
  const blockStart = "         if (trimmed.length < 100) {";
  const startIdx = content.indexOf(blockStart);
  if (startIdx === -1) {
    console.log(`Could not find block in ${file}`);
    continue;
  }

  // Find the end of the block. We know it ends with `         }` followed by `      }` or `return undefined;`
  // We can just use regex or find the exact string it used to be.
  const oldBlockRegex = /         if \(trimmed\.length < 100\) \{[\s\S]*?<\/[tT]d>\s*\);\s*}/;

  if (oldBlockRegex.test(content)) {
    content = content.replace(oldBlockRegex, customBlock);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`Could not match old block regex in ${file}`);
  }
}
