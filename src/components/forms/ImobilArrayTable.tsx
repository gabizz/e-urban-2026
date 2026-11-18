import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface ImobilArrayTableProps {
  tableAttribs?: Record<string, any>;
  headerRows: React.ReactNode;
  renderItemRows: (fieldPrefix: string, index: number) => React.ReactNode;
}

export default function ImobilArrayTable({
  tableAttribs,
  headerRows,
  renderItemRows,
}: ImobilArrayTableProps) {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'imobile',
  });

  const headerJudet = watch('jude_ul') || '';
  const headerLocalitate = watch('autoritatea_administra_iei_pub') || watch('localitatea_uat') || '';

  useEffect(() => {
    if (fields.length === 0) {
      append({
        jude_: headerJudet,
        municipiu_ora_comun: headerLocalitate,
      });
    }
  }, [fields.length, append, headerJudet, headerLocalitate]);

  const items = fields.length > 0 ? fields : [{ id: 'default-0' }];

  return (
    <Box sx={{ my: 1 }}>
      <table {...tableAttribs}>
        <tbody>
          {headerRows}
          {items.map((field, index) => (
            <React.Fragment key={field.id}>
              {renderItemRows(`imobile.${index}.`, index)}
              {items.length > 1 && (
                <tr className="no-print">
                  <td colSpan={20} style={{ textAlign: 'right', padding: '4px 8px', background: '#f8fafc' }}>
                    <Button
                      size="small"
                      color="error"
                      variant="text"
                      startIcon={<DeleteIcon fontSize="small" />}
                      onClick={() => remove(index)}
                      sx={{ textTransform: 'none', fontSize: '0.75rem', py: 0 }}
                    >
                      Șterge imobil #{index + 1}
                    </Button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <Box className="no-print" sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon fontSize="small" />}
          onClick={() =>
            append({
              jude_: headerJudet,
              municipiu_ora_comun: headerLocalitate,
            })
          }
          sx={{ textTransform: 'none', fontSize: '0.8rem' }}
        >
          Adaugă imobil
        </Button>
      </Box>
    </Box>
  );
}
