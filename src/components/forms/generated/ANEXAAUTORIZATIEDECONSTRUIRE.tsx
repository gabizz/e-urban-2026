import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import parse, { Element, domToReact, attributesToProps } from 'html-react-parser';
import type { HTMLReactParserOptions } from 'html-react-parser';
import '../../../assets/form.css';
import { CustomTextField as TextField, CustomDatePicker as DatePicker } from '../../inputs';
import { rawHtml } from './ANEXAAUTORIZATIEDECONSTRUIREHtml'; 
import UATAutocomplete from '../UATAutocomplete';

// Helper to generate a safe name for react-hook-form
function generateFieldName(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').substring(0, 30);
}

export default function ANEXAAUTORIZATIEDECONSTRUIRE() {
  const { register } = useFormContext();

  // Pseudo-CRUD state for multiple properties (Imobil 2, Imobil 3, etc.)
  const [imobile, setImobile] = useState<number[]>([2]);

  const addImobil = () => {
    setImobile(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev) + 1 : 2;
      return [...prev, nextId];
    });
  };

  const removeImobil = (idToRemove: number) => {
    setImobile(prev => prev.filter(id => id !== idToRemove));
  };

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
             <td {...attributesToProps(domNode.attribs)}>
               <div className="td-flex-wrapper">
                 <TextField 
                   variant="filled" 
                   size="small" 
                   fullWidth 
                   hiddenLabel 
                   margin="dense" 
                   {...register('field_' + Math.random().toString(36).substr(2, 5))}  
                   style={{marginTop: 'auto'}} 
                 />
               </div>
             </td>
           );
         }

         // Ignore section headers like "1. CATEGORIILE...", "2. DATELE..."
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

         const fieldName = generateFieldName(trimmed) || 'field_' + Math.random().toString(36).substr(2, 5);
         
         // Only add input if the text is short enough to be a label (not a massive paragraph)
         if (trimmed.length < 100) {
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
                     style={{marginTop: 'auto'}} 
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
                   style={{marginTop: 'auto'}} 
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
      {/* ========================================================================= */}
      {/* PAGE 1: ANEXA IMOBILE (Dynamic Pseudo-CRUD Array)                         */}
      {/* ========================================================================= */}
      <div className="anexa-imobile-section" style={{ marginBottom: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 6px 0', textAlign: 'center' }}>
            ANEXA IMOBILE
          </h1>
          <p style={{ margin: '0 0 4px 0', fontSize: '13px', textAlign: 'center' }}>
            la cererea pentru emiterea autorizației de construire / desființare
          </p>
          <p style={{ margin: 0, fontSize: '12px', fontStyle: 'italic', textAlign: 'center' }}>
            se completează numai atunci când cererea se referă la mai multe imobile
          </p>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', marginBottom: '12px' }}>
          <thead>
            <tr>
              <th
                colSpan={7}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid black',
                  padding: '8px',
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: 'bold',
                }}
              >
                I1. IMOBILELE LA CARE SE REFERĂ CEREREA
              </th>
            </tr>
          </thead>
          <tbody>
            {imobile.map((id) => (
              <React.Fragment key={id}>
                {/* Header row for each Imobil with (x) delete button */}
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      backgroundColor: '#f3f4f6',
                      border: '1px solid black',
                      padding: '6px 10px',
                      fontWeight: 'bold',
                      fontSize: '13px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Imobil {id}</span>
                      {imobile.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImobil(id)}
                          className="no-print"
                          style={{
                            backgroundColor: '#fee2e2',
                            border: '1px solid #f87171',
                            color: '#b91c1c',
                            borderRadius: '4px',
                            padding: '2px 8px',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                          title={`Șterge Imobil ${id}`}
                        >
                          (x) Șterge
                        </button>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Row 1: Tip imobil | Număr cadastral | Carte funciară nr. */}
                <tr>
                  <td style={{ width: '26%', border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Tip imobil</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                          <label className="checkbox-item" style={{ margin: 0 }}>
                            <input 
                              type="checkbox" 
                              className="form-checkbox" 
                              {...register(`imobil_${id}_tip_teren`)} 
                            />
                            teren
                          </label>
                          <label className="checkbox-item" style={{ margin: 0 }}>
                            <input 
                              type="checkbox" 
                              className="form-checkbox" 
                              {...register(`imobil_${id}_tip_constructii`)} 
                            />
                            construcții
                          </label>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td colSpan={4} style={{ width: '44%', border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Număr cadastral</p>
                      </div>
                      <TextField
                        variant="filled"
                        size="small"
                        fullWidth
                        hiddenLabel
                        margin="dense"
                        {...register(`imobil_${id}_numar_cadastral`)}
                        style={{ marginTop: 'auto' }}
                      />
                    </div>
                  </td>
                  <td colSpan={2} style={{ width: '30%', border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Carte funciară nr.</p>
                      </div>
                      <TextField
                        variant="filled"
                        size="small"
                        fullWidth
                        hiddenLabel
                        margin="dense"
                        {...register(`imobil_${id}_carte_funciara`)}
                        style={{ marginTop: 'auto' }}
                      />
                    </div>
                  </td>
                </tr>

                {/* Row 2: Județul | Municipiul / orașul / comuna | Satul / sectorul */}
                <tr>
                  <td colSpan={2} style={{ border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Județul</p>
                      </div>
                      <UATAutocomplete
                        name={`imobil_${id}_judet`}
                        label=""
                        type="judet"
                        style={{ marginTop: 'auto' }}
                      />
                    </div>
                  </td>
                  <td colSpan={3} style={{ border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Municipiul / orașul / comuna</p>
                      </div>
                      <UATAutocomplete
                        name={`imobil_${id}_localitate`}
                        label=""
                        type="localitate"
                        linkedJudetName={`imobil_${id}_judet`}
                        style={{ marginTop: 'auto' }}
                      />
                    </div>
                  </td>
                  <td colSpan={2} style={{ border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Satul / sectorul</p>
                      </div>
                      <TextField
                        variant="filled"
                        size="small"
                        fullWidth
                        hiddenLabel
                        margin="dense"
                        {...register(`imobil_${id}_sat_sector`)}
                        style={{ marginTop: 'auto' }}
                      />
                    </div>
                  </td>
                </tr>

                {/* Row 3: Strada | Nr. | Sc. | Et. | Ap. | Cod poștal | Țara */}
                <tr>
                  <td style={{ width: '26%', border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Strada</p>
                      </div>
                      <TextField
                        variant="filled"
                        size="small"
                        fullWidth
                        hiddenLabel
                        margin="dense"
                        {...register(`imobil_${id}_strada`)}
                        style={{ marginTop: 'auto' }}
                      />
                    </div>
                  </td>
                  <td style={{ width: '10%', border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Nr.</p>
                      </div>
                      <TextField
                        variant="filled"
                        size="small"
                        fullWidth
                        hiddenLabel
                        margin="dense"
                        {...register(`imobil_${id}_nr`)}
                        style={{ marginTop: 'auto' }}
                      />
                    </div>
                  </td>
                  <td style={{ width: '10%', border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Sc.</p>
                      </div>
                      <TextField
                        variant="filled"
                        size="small"
                        fullWidth
                        hiddenLabel
                        margin="dense"
                        {...register(`imobil_${id}_sc`)}
                        style={{ marginTop: 'auto' }}
                      />
                    </div>
                  </td>
                  <td style={{ width: '10%', border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Et.</p>
                      </div>
                      <TextField
                        variant="filled"
                        size="small"
                        fullWidth
                        hiddenLabel
                        margin="dense"
                        {...register(`imobil_${id}_et`)}
                        style={{ marginTop: 'auto' }}
                      />
                    </div>
                  </td>
                  <td style={{ width: '10%', border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Ap.</p>
                      </div>
                      <TextField
                        variant="filled"
                        size="small"
                        fullWidth
                        hiddenLabel
                        margin="dense"
                        {...register(`imobil_${id}_ap`)}
                        style={{ marginTop: 'auto' }}
                      />
                    </div>
                  </td>
                  <td style={{ width: '17%', border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Cod poștal</p>
                      </div>
                      <TextField
                        variant="filled"
                        size="small"
                        fullWidth
                        hiddenLabel
                        margin="dense"
                        {...register(`imobil_${id}_cod_postal`)}
                        style={{ marginTop: 'auto' }}
                      />
                    </div>
                  </td>
                  <td style={{ width: '17%', border: '1px solid black', padding: '6px' }}>
                    <div className="td-flex-wrapper">
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>Țara</p>
                      </div>
                      <TextField
                        variant="filled"
                        size="small"
                        fullWidth
                        hiddenLabel
                        margin="dense"
                        defaultValue="România"
                        {...register(`imobil_${id}_tara`)}
                        style={{ marginTop: 'auto' }}
                      />
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Pseudo-CRUD (+) Add button */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
          <button
            type="button"
            onClick={addImobil}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              backgroundColor: '#1976d2',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            }}
          >
            (+) Adaugă imobil
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGES 2-5: ANEXA TEHNICĂ (Sections 1 through 13)                         */}
      {/* ========================================================================= */}
      <div className="anexa-tehnica-section" style={{ pageBreakBefore: 'always', marginTop: '32px' }}>
        {parse(rawHtml, options)}
      </div>
    </div>
  );
}
