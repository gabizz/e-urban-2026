
import { useFormContext } from 'react-hook-form';
import parse, { Element, domToReact, attributesToProps } from 'html-react-parser';
import type { HTMLReactParserOptions } from 'html-react-parser';
import '../../../assets/form.css';
import { CustomTextField as TextField, CustomDatePicker as DatePicker } from '../../inputs';
import { rawHtml } from './SOLICITAREUATRECEPTIEHtml';
import stemaRo from '../../../assets/stema_ro.webp';
import UATAutocomplete from '../UATAutocomplete';

// Helper to generate a safe name for react-hook-form
function generateFieldName(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').substring(0, 30);
}

export default function SOLICITAREUATRECEPTIE() {
  const { register, setValue } = useFormContext();

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

        let hasImage = false;
        const checkImage = (node: any) => {
          if (node.tagName === 'img') hasImage = true;
          if (node.children) node.children.forEach(checkImage);
        };
        checkImage(domNode);

        if (hasImage) {
          return (
            <td {...attributesToProps(domNode.attribs)}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', minWidth: '135px' }}>
                <img src={stemaRo} alt="Stema Romaniei" style={{ height: '165px', width: 'auto' }} />
              </div>
            </td>
          );
        }

        // Ignore completely empty cells
        if (!trimmed) {
          return (
            <td {...attributesToProps(domNode.attribs)}>
              <div className="td-flex-wrapper">
                <TextField variant="filled" size="small" fullWidth hiddenLabel margin="dense" {...register('field_' + Math.random().toString(36).substr(2, 5))} style={{ marginTop: 'auto' }} />
              </div>
            </td>
          );
        }

        // Ignore section headers like "1. CATRE" or cells with only images
        if (/^[0-9]+\.\s/.test(trimmed)) {
          return undefined;
        }

        // If cell contains checkboxes
        let hasCheckbox = false;
        const checkCheckbox = (node: any) => {
          if (node.tagName === 'input' && node.attribs?.type === 'checkbox') hasCheckbox = true;
          if (node.children) node.children.forEach(checkCheckbox);
        };
        checkCheckbox(domNode);

        if (hasCheckbox) {
          return (
            <td {...attributesToProps(domNode.attribs)}>
              {domToReact(domNode.children as any, options)}
            </td>
          );
        }

        // Inject input after the label
        // We render the original children, then append the input
        const fieldName = generateFieldName(trimmed) || 'field_' + Math.random().toString(36).substr(2, 5);

        // Only add input if the text is short enough to be a label (not a massive paragraph)
        if (trimmed.length < 100) {
          if (fieldName === 'jude_ul') {
            return (
              <td {...attributesToProps(domNode.attribs)}>
                <div className="td-flex-wrapper">
                  <div>{domToReact(domNode.children as any, options)}</div>
                  <UATAutocomplete name={fieldName} label="" type="judet" style={{ marginTop: 'auto' }} />
                </div>
              </td>
            );
          }
          if (fieldName === 'localitatea_uat' || fieldName === 'municipiul_ora_ul_comuna') {
            return (
              <td {...attributesToProps(domNode.attribs)}>
                <div className="td-flex-wrapper">
                  <div>{domToReact(domNode.children as any, options)}</div>
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
                        setValue('adresa_oficial', email ? `${address}\nEmail: ${email}` : address, { shouldValidate: true, shouldDirty: true });

                        const loc = (uat.Localitate || '').toUpperCase();
                        const cap = (s: string) => {
                          let res = s.toLowerCase();
                          res = res.replace(/(^|[\s-])\S/g, l => l.toUpperCase());
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
                        setValue('institu_ia', institutionName, { shouldValidate: true, shouldDirty: true });
                        setValue('institu_ia_entitatea_de_la_car', institutionName, { shouldValidate: true, shouldDirty: true });
                      }
                    }}
                    style={{ marginTop: 'auto' }} />
                </div>
              </td>
            );
          }
          const isDateField = /(^|_)data(_|$)/i.test(fieldName) || fieldName === 'la_data' || fieldName === 'valabil_pana_la';
          if (isDateField) {
            return (
              <td {...attributesToProps(domNode.attribs)}>
                <div className="td-flex-wrapper">
                  <div>{domToReact(domNode.children as any, options)}</div>
                  <DatePicker
                    variant="filled"
                    size="small"
                    fullWidth
                    hiddenLabel
                    margin="dense"
                    {...register(fieldName)}
                    style={{ marginTop: 'auto' }}
                  />
                </div>
              </td>
            );
          }
          return (
            <td {...attributesToProps(domNode.attribs)}>
              <div className="td-flex-wrapper">
                <div>{domToReact(domNode.children as any, options)}</div>
                <TextField
                  variant="filled"
                  size="small"
                  fullWidth
                  hiddenLabel
                  margin="dense"
                  multiline={fieldName === 'adresa_oficial'}
                  minRows={fieldName === 'adresa_oficial' ? 3 : 1}
                  {...register(fieldName)}
                  style={{ marginTop: 'auto' }}
                />
              </div>
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
