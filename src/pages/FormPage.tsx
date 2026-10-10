import { useEffect, useState, useRef } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getForm, saveForm } from '../services/storage';

import { useForm, FormProvider } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { Printer, Save } from 'lucide-react';

import * as Forms from '../components/forms/generated';
import DocumentSelectMenu from '../components/DocumentSelectMenu';

export const formMap: Record<string, React.FC> = {
  // Backwards compatibility
  'AUTORIZATIE_CONSTRUIRE': Forms.CEREREAUTORIZATIEDECONSTRUIRE,
  'AUTORIZATIE_MODIFICARE': Forms.CEREREAUTORIZATIEDEMODIFICARE,
  'AUTORIZATIE_REGULARIZARE': Forms.CEREREAUTORIZATIEDEREGULARIZARE,
  'CERTIFICAT_URBANISM': Forms.CERERECERTIFICATDEURBANISMCONSTRUIREDESFIINTARE,
  'PRELUNGIRE': Forms.CEREREPRELUNGIREAUTORIZATIEDECONSTRUIRE,
  'NOTIFICARE_PROCEDURA_SIMPLIFICATA': Forms.NOTIFICAREPROCEDURASIMPLIFICATA,
  'AVIZ_AMPLASARE': Forms.CEREREAVIZDEAMPLASARE,

  // Exact names
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
  'NOTIFICAREPROCEDURASIMPLIFICATA': Forms.NOTIFICAREPROCEDURASIMPLIFICATA,
  'SOLICITAREUATRECEPTIE': Forms.SOLICITAREUATRECEPTIE
};

export default function FormPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && id !== 'new') {
      getForm(id).then(form => {
        if (form) setInitialData(form.data);
        setLoading(false);
      });
    } else {
      setInitialData({});
      setLoading(false);
    }
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;

  return <FormContainer initialData={initialData} />;
}

function FormContainer({ initialData }: any) {
  const navigate = useNavigate();
  const printRef = useRef(null);

  const methods = useForm({
    defaultValues: {
      tip_formular: 'CEREREAUTORIZATIEDECONSTRUIRE',
      solicitant: {
        tip_persoana: 'FIZICA',
        nume_denumire: '',
        cnp_cui: '',
        adresa_domiciliu_sediu: '',
        telefon: '',
        email: ''
      },
      ...initialData
    }
  });

  const { handleSubmit, watch, register, setValue } = methods;
  const tipFormular = watch('tip_formular');

  const onSubmit = async (formData: any) => {
    formData.id = initialData.id || Date.now().toString();
    await saveForm(formData);
    navigate('/');
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const ActiveFormComponent = formMap[tipFormular] || Forms.CEREREAUTORIZATIEDECONSTRUIRE;

  return (
    <Box sx={{ p: 4, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Completare formular</Typography>

        {/* Hidden input to keep tip_formular bound to react-hook-form */}
        <input type="hidden" {...register('tip_formular')} />

        {/* Button that anchors the category cards menu */}
        <DocumentSelectMenu
          selectedId={tipFormular}
          onSelect={(docId) => {
            setValue('tip_formular', docId, { shouldDirty: true, shouldValidate: true });
          }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Printer size={20} />} onClick={() => handlePrint()}>
            Print
          </Button>
          <Button variant="contained" startIcon={<Save size={20} />} onClick={handleSubmit(onSubmit)}>
            Salveaza
          </Button>
        </Box>
      </Box>

      <FormProvider {...methods}>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>

          {/* Main Panel: Physical Form Replication */}
          <Box
            sx={{
              maxWidth: '800px',
              width: '100%',
              border: '1px solid #ccc',
              boxShadow: 3,
              mb: 4,
              '@media print': {
                border: 'none !important',
                boxShadow: 'none !important',
                maxWidth: '100% !important',
                width: '100% !important',
                mb: '0 !important',
                p: '0 !important',
              }
            }}
            ref={printRef}
          >
            <form id="urbanism-form" onSubmit={handleSubmit(onSubmit)}>
              <ActiveFormComponent />
            </form>
          </Box>

        </Box>
      </FormProvider>
    </Box>
  );
}
