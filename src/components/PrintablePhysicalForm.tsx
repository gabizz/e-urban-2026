import { useRef } from 'react';
import { Box, Button } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { useForm, FormProvider } from 'react-hook-form';
import { Printer } from 'lucide-react';
import * as Forms from './forms/generated';

const formMap: Record<string, React.FC> = {
  'AUTORIZATIE_CONSTRUIRE': Forms.CEREREAUTORIZATIEDECONSTRUIRE,
  'AUTORIZATIE_MODIFICARE': Forms.CEREREAUTORIZATIEDEMODIFICARE,
  'AUTORIZATIE_REGULARIZARE': Forms.CEREREAUTORIZATIEDEREGULARIZARE,
  'CERTIFICAT_URBANISM': Forms.CERERECERTIFICATDEURBANISMCONSTRUIREDESFIINTARE,
  'PRELUNGIRE': Forms.CEREREPRELUNGIREAUTORIZATIEDECONSTRUIRE,
  'NOTIFICARE_PROCEDURA_SIMPLIFICATA': Forms.NOTIFICAREPROCEDURASIMPLIFICATA,
  'AVIZ_AMPLASARE': Forms.CEREREAVIZDEAMPLASARE,
  'ANEXAAUTORIZATIEDECONSTRUIRE': Forms.ANEXAAUTORIZATIEDECONSTRUIRE,
  'CEREREAUTORIZATIEDECONSTRUIRE': Forms.CEREREAUTORIZATIEDECONSTRUIRE,
  'CEREREAUTORIZATIEDEMODIFICARE': Forms.CEREREAUTORIZATIEDEMODIFICARE,
  'CEREREAUTORIZATIEDEREGULARIZARE': Forms.CEREREAUTORIZATIEDEREGULARIZARE,
  'CEREREAVIZDEAMPLASARE': Forms.CEREREAVIZDEAMPLASARE,
  'CERERECERTIFICATDEURBANISMCONSTRUIREDESFIINTARE': Forms.CERERECERTIFICATDEURBANISMCONSTRUIREDESFIINTARE,
  'CERERECERTIFICATDEURBANISMDEINFORMARE': Forms.CERERECERTIFICATDEURBANISMDEINFORMARE,
  'CERERECERTIFICATDEURBANISMPENTRUOPERATIUNICADASTRALE': Forms.CERERECERTIFICATDEURBANISMPENTRUOPERATIUNICADASTRALE,
  'CEREREPRELUNGIREAUTORIZATIEDECONSTRUIRE': Forms.CEREREPRELUNGIREAUTORIZATIEDECONSTRUIRE,
  'CEREREPRELUNGIRECERTIFICATDEURBANISM': Forms.CEREREPRELUNGIRECERTIFICATDEURBANISM,
  'DECLARATIAPEPROPRIARASPUNDERE': Forms.DECLARATIAPEPROPRIARASPUNDERE,
  'INSTIINTAREINCEPEREEXECUTIELUCRARI': Forms.INSTIINTAREINCEPEREEXECUTIELUCRARI,
  'INSTIINTAREPRIVINDINCHEIEREAEXECUTIEILUCRARILOR': Forms.INSTIINTAREPRIVINDINCHEIEREAEXECUTIEILUCRARILOR,
  'SOLICITAREUATRECEPTIE': Forms.SOLICITAREUATRECEPTIE
};

export function PrintButton({
  data,
  size = "small",
  sx
}: {
  data: any;
  size?: "small" | "medium" | "large";
  sx?: any;
}) {
  const printRef = useRef(null);
  
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const methods = useForm({
    defaultValues: data
  });

  const tipFormular = data?.tip_formular || 'CEREREAUTORIZATIEDECONSTRUIRE';
  const ActiveFormComponent = formMap[tipFormular] || Forms.CEREREAUTORIZATIEDECONSTRUIRE;

  return (
    <>
      <Button
        size={size}
        variant="outlined"
        startIcon={<Printer size={16} />}
        onClick={() => handlePrint()}
        sx={{ whiteSpace: 'nowrap', ...sx }}
      >
        Print
      </Button>
      
      <Box sx={{ display: 'none' }}>
        <Box 
          ref={printRef}
          sx={{ 
            width: '100%', 
            '@media print': {
              border: 'none !important',
              boxShadow: 'none !important',
              maxWidth: '100% !important',
              width: '100% !important',
              mb: '0 !important',
              p: '0 !important',
            }
          }} 
        >
          <FormProvider {...methods}>
            <form id="urbanism-form">
              <ActiveFormComponent />
            </form>
          </FormProvider>
        </Box>
      </Box>
    </>
  );
}
