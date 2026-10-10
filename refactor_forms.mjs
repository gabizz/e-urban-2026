import fs from 'fs';
import path from 'path';

const formsDir = 'src/components/forms/generated';
const files = fs.readdirSync(formsDir).filter(f => f.endsWith('.tsx') && !f.endsWith('Html.tsx') && f !== 'index.ts');

for (const file of files) {
  const filePath = path.join(formsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix 1: Use CustomTextField
  if (content.includes("import { TextField } from '@mui/material';")) {
    content = content.replace(
      "import { TextField } from '@mui/material';",
      "import { CustomTextField as TextField } from '../../inputs';"
    );
  }

  // Fix 2: Update the setValue block in UATAutocomplete
  const oldInstitutionSet = "setValue('institu_iaprim_ria_municipiulu', institutionName, { shouldValidate: true, shouldDirty: true });";
  if (content.includes(oldInstitutionSet)) {
    const newInstitutionSet = `
                       setValue('institu_iaprim_ria_municipiulu', institutionName, { shouldValidate: true, shouldDirty: true });
                       setValue('institu_ia', institutionName, { shouldValidate: true, shouldDirty: true });
                       setValue('institu_ia_entitatea_de_la_car', institutionName, { shouldValidate: true, shouldDirty: true });
    `.trim();
    content = content.replace(oldInstitutionSet, newInstitutionSet);
  }

  fs.writeFileSync(filePath, content);
  console.log(`Refactored ${file}`);
}
