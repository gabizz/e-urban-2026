
import { useFormContext } from 'react-hook-form';
import parse, { Element, domToReact, attributesToProps } from 'html-react-parser';
import type { HTMLReactParserOptions } from 'html-react-parser';
import '../../../assets/form.css';
import { CustomTextField as TextField, CustomDatePicker as DatePicker } from '../../inputs';
import { rawHtml } from './INSTIINTAREINCEPEREEXECUTIELUCRARIHtml';
import stemaRo from '../../../assets/stema_ro.webp';
import { useFormCustomization } from '../../../contexts/FormCustomizationContext';
import UATAutocomplete from '../UATAutocomplete';
import ImobilArrayTable from '../ImobilArrayTable';

// Helper to generate a safe name for react-hook-form
function generateFieldName(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').substring(0, 30);
}

function getTableText(node: any): string {
  let p = node.parent;
  while (p && p.tagName !== 'table') {
    p = p.parent;
  }
  if (!p) return '';
  let txt = '';
  const walk = (n: any) => {
    if (n.type === 'text') txt += n.data;
    if (n.children) n.children.forEach(walk);
  };
  walk(p);
  return txt;
}

export default function INSTIINTAREINCEPEREEXECUTIELUCRARI() {
  const { register, setValue } = useFormContext();
  const { stemaUrl, openStemaDialog } = useFormCustomization();

  const createOptions = (fieldPrefix = '', imobilIndex = 0): HTMLReactParserOptions => ({
    replace: (domNode) => {
      if (domNode.type === 'text' && /(\.{3,}|…)/.test((domNode as any).data || '')) {
        const text = (domNode as any).data as string;
        const parts = text.split(/(\.{3,}|…)/g);
        return (
          <>
            {parts.map((part, i) => {
              if (/^(\.{3,}|…)$/.test(part)) {
                const prev = parts[i - 1] || '';
                const isDate = /din\s*$/i.test(prev);
                const inlineName = `${fieldPrefix}inline_${generateFieldName(prev.slice(-24)) || i}_${i}`;
                return (
                  <input
                    key={i}
                    type="text"
                    className="inline-input"
                    placeholder={isDate ? 'zz.ll.aaaa' : ''}
                    style={{
                      width: isDate ? '105px' : '75px',
                      border: 'none',
                      borderBottom: '1px solid #64748b',
                      background: 'rgba(241, 245, 249, 0.7)',
                      padding: '1px 4px',
                      margin: '0 3px',
                      fontSize: 'inherit',
                      fontFamily: 'inherit',
                      borderRadius: '2px',
                    }}
                    {...register(inlineName)}
                  />
                );
              }
              return part;
            })}
          </>
        );
      }
      if (fieldPrefix.startsWith('imobile.') && domNode.type === 'text' && /Imobil\s+1/i.test((domNode as any).data || '')) {
        return <>{((domNode as any).data as string).replace(/Imobil\s+1/gi, `Imobil ${imobilIndex + 1}`)}</>;
      }
      if (!fieldPrefix && domNode instanceof Element && domNode.name === 'table') {
        const firstRow = domNode.children?.find((c: any) => c.name === 'tr' || c.name === 'tbody');
        const rowText = firstRow ? getTableText(firstRow).trim() : '';
        if (/^(\d+\.\s*)?IMOBIL(UL|E|ELE)?\b/i.test(rowText)) {
          const directChildren = (domNode.children || []) as any[];
          const tbody = directChildren.find((c) => c.name === 'tbody');
          const allRows = (tbody ? tbody.children : directChildren).filter((c: any) => c.name === 'tr');
          const getRowText = (n: any): string => n?.data || (n?.children ? n.children.map(getRowText).join(' ') : '');
          const imobil1Idx = allRows.findIndex((r: any) => /Imobil\s+1/i.test(getRowText(r)));
          const noteIdx = allRows.findIndex((r: any) => /Pentru fiecare imobil/i.test(getRowText(r)));
          const splitIdx = imobil1Idx >= 0 ? imobil1Idx : (noteIdx >= 0 ? noteIdx + 1 : 1);
          const headerRows = allRows.slice(0, splitIdx);
          const itemRows = allRows.slice(splitIdx);
          return (
            <ImobilArrayTable
              tableAttribs={attributesToProps(domNode.attribs)}
              headerRows={domToReact(headerRows as any, createOptions('imobile_header_'))}
              renderItemRows={(prefix, idx) => domToReact(itemRows as any, createOptions(prefix, idx))}
            />
          );
        }
      }
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

        if (hasImage || (domNode.attribs?.rowspan === '4' && !trimmed)) {
          return (
            <td {...attributesToProps(domNode.attribs)}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px', minWidth: '135px' }}>
                <img src={stemaUrl || stemaRo} alt="Stemă" style={{ height: '165px', width: 'auto', maxHeight: '165px', objectFit: 'contain' }} />
                <button
                  type="button"
                  className="no-print"
                  onClick={openStemaDialog}
                  style={{
                    marginTop: '8px',
                    fontSize: '11px',
                    padding: '3px 8px',
                    cursor: 'pointer',
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    color: '#334155',
                  }}
                >
                  Adaugă URL stemă localitate
                </button>
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
              {domToReact(domNode.children as any, createOptions(fieldPrefix, imobilIndex))}
            </td>
          );
        }

        // Inject input after the label
        // We render the original children, then append the input
        const baseFieldName = generateFieldName(trimmed) || 'field_' + Math.random().toString(36).substr(2, 5);
        const tableText = getTableText(domNode);
        const isSolicitant = /SOLICITANT/i.test(tableText);
        const rawFieldName = (isSolicitant && (baseFieldName === 'jude_ul' || baseFieldName === 'municipiul_ora_ul_comuna'))
          ? (baseFieldName === 'jude_ul' ? 'solicitant_jude_ul' : 'solicitant_localitate')
          : baseFieldName;
        const fieldName = fieldPrefix ? `${fieldPrefix}${rawFieldName}` : rawFieldName;

        // Only add input if the text is short enough to be a label (not a massive paragraph)
        if (trimmed.length < 100) {
          if (baseFieldName === 'jude_ul' || baseFieldName === 'jude_') {
            return (
              <td {...attributesToProps(domNode.attribs)}>
                <div className="td-flex-wrapper">
                  <div>{domToReact(domNode.children as any, createOptions(fieldPrefix, imobilIndex))}</div>
                  <UATAutocomplete
                    name={fieldName}
                    label=""
                    type="judet"
                    freeSolo={isSolicitant}
                    style={{ marginTop: 'auto' }}
                  />
                </div>
              </td>
            );
          }
          if (baseFieldName === 'localitatea_uat' || baseFieldName === 'municipiul_ora_ul_comuna' || baseFieldName === 'municipiu_ora_comun' || baseFieldName === 'autoritatea_administra_iei_pub') {
            return (
              <td {...attributesToProps(domNode.attribs)}>
                <div className="td-flex-wrapper">
                  <div>{domToReact(domNode.children as any, createOptions(fieldPrefix, imobilIndex))}</div>
                  <UATAutocomplete
                    name={fieldName}
                    label=""
                    type="localitate"
                    freeSolo={isSolicitant}
                    linkedJudetName={fieldPrefix ? `${fieldPrefix}jude_` : (isSolicitant ? 'solicitant_jude_ul' : (baseFieldName === 'municipiu_ora_comun' ? 'jude_' : 'jude_ul'))}
                    onSelectUAT={(uat: any) => {
                      if (fieldName === 'localitatea_uat' || fieldName === 'autoritatea_administra_iei_pub') {
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
                        setValue('c_tre_primarul', institutionName.replace(/^Primăria /, ''), { shouldValidate: true, shouldDirty: true });
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
                  <div>{domToReact(domNode.children as any, createOptions(fieldPrefix, imobilIndex))}</div>
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
                <div>{domToReact(domNode.children as any, createOptions(fieldPrefix, imobilIndex))}</div>
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
  });
  const options = createOptions();

  return (
    <div className="physical-form-container">
      {parse(rawHtml, options)}
    </div>
  );
}
