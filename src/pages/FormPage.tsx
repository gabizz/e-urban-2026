import { useEffect, useState, useRef } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getForm, saveForm } from '../services/storage';

import { useForm, FormProvider } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { Printer, Save } from 'lucide-react';

import * as Forms from '../components/forms/generated';
import DocumentSelectMenu from '../components/DocumentSelectMenu';
import { getDocumentById } from '../data/documentTypes';
import { useFormCustomization } from '../contexts/FormCustomizationContext';
import { buildInstitutionName } from '../services/uat';

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
        if (form) {
          setInitialData(form.data);
        } else if (getDocumentById(id)) {
          // If the URL matches an official document ID or alias, initialize directly with that form type
          setInitialData({ tip_formular: id });
        } else {
          setInitialData({});
        }
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
      tip_formular: initialData?.tip_formular || '',
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
  const { uatDetails } = useFormCustomization();

  useEffect(() => {
    if (uatDetails) {
      if (uatDetails.Judet) {
        setValue('jude_ul', uatDetails.Judet, { shouldValidate: true, shouldDirty: true });
      }
      if (uatDetails.Localitate) {
        setValue('localitatea_uat', uatDetails.Localitate, { shouldValidate: true, shouldDirty: true });
        setValue('municipiul_ora_ul_comuna', uatDetails.Localitate, { shouldValidate: true, shouldDirty: true });
      }
      if (uatDetails.cui) {
        setValue('cod_de_identificare_fiscal_cif', uatDetails.cui, { shouldValidate: true, shouldDirty: true });
      }

      const email = uatDetails['E-mail general'] || uatDetails['E-mail registratura'] || '';
      const address = uatDetails.Adresa || '';
      const fullAddress = email ? `${address}\nEmail: ${email}` : address;
      if (fullAddress) {
        setValue('adresa_oficial', fullAddress, { shouldValidate: true, shouldDirty: true });
      }

      if (uatDetails.Localitate) {
        const institutionName = buildInstitutionName(uatDetails.Localitate);
        setValue('institu_iaprim_ria_municipiulu', institutionName, { shouldValidate: true, shouldDirty: true });
        setValue('institu_ia', institutionName, { shouldValidate: true, shouldDirty: true });
        setValue('institu_ia_entitatea_de_la_car', institutionName, { shouldValidate: true, shouldDirty: true });
      }
    }
  }, [uatDetails, setValue]);

  useEffect(() => {
    const doc = tipFormular ? getDocumentById(tipFormular) : undefined;
    if (doc) {
      document.title = `${doc.title} (${doc.legalBase}) | e-urban.ro`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `${doc.title} - ${doc.purpose} Conform ${doc.legalBase}.`);
      }
    } else {
      document.title = 'Completare Formular Urbanism | e-urban.ro';
    }
  }, [tipFormular]);

  const onSubmit = async (formData: any) => {
    formData.id = initialData.id || Date.now().toString();
    await saveForm(formData);
    navigate('/');
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const ActiveFormComponent = tipFormular ? (formMap[tipFormular] || null) : null;

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3, md: 4 }, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 1.5,
          mb: { xs: 2, sm: 3 },
        }}
      >
        <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }, fontWeight: 700 }}>
          Completare formular
        </Typography>

        {/* Hidden input to keep tip_formular bound to react-hook-form */}
        <input type="hidden" {...register('tip_formular')} />

        {/* Button that anchors the category cards menu */}
        <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <DocumentSelectMenu
            selectedId={tipFormular}
            defaultOpen={!initialData?.tip_formular}
            onSelect={(docId) => {
              setValue('tip_formular', docId, { shouldDirty: true, shouldValidate: true });
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', sm: 'auto' } }}>
          <Button
            variant="outlined"
            startIcon={<Printer size={18} />}
            onClick={() => handlePrint()}
            sx={{ flex: { xs: 1, sm: 'initial' }, height: { xs: 40, sm: 'auto' } }}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<Save size={18} />}
            onClick={handleSubmit(onSubmit)}
            sx={{ flex: { xs: 1, sm: 'initial' }, height: { xs: 40, sm: 'auto' }, fontWeight: 700 }}
          >
            Salvează
          </Button>
        </Box>
      </Box>

      <FormProvider {...methods}>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'auto',
            display: 'flex',
            justifyContent: 'center',
            pb: 4,
            WebkitOverflowScrolling: 'touch',
          }}
        >

          {/* Main Panel: Physical Form Replication */}
          <Box
            sx={{
              maxWidth: '850px',
              width: '100%',
              minWidth: { xs: '100%', sm: '650px' },
              border: { xs: 'none', sm: '1px solid #ccc' },
              borderRadius: { xs: 1, sm: 2 },
              boxShadow: { xs: 0, sm: 3 },
              mb: 4,
              backgroundColor: '#ffffff',
              '@media print': {
                border: 'none !important',
                boxShadow: 'none !important',
                maxWidth: '100% !important',
                width: '100% !important',
                minWidth: '0 !important',
                mb: '0 !important',
                p: '0 !important',
              }
            }}
            ref={printRef}
          >
            <form id="urbanism-form" onSubmit={handleSubmit(onSubmit)}>
              {ActiveFormComponent ? (
                <ActiveFormComponent />
              ) : (
                <Box sx={{ p: { xs: 4, sm: 8 }, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#334155', mb: 1 }}>
                    Niciun formular selectat
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                    Vă rugăm să alegeți tipul de formular dorit din meniul de mai sus pentru a începe completarea.
                  </Typography>
                </Box>
              )}
            </form>
          </Box>

        </Box>
      </FormProvider>
    </Box>
  );
}
