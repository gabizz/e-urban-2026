import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Card,
  CardContent,
  Divider,
  Button,
  Link as MuiLink,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ShieldCheckRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Link, useNavigate } from 'react-router-dom';
import { DOCUMENT_CATEGORIES } from '../data/documentTypes';

export default function About() {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 2, sm: 4 }, backgroundColor: '#f8fafc' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header navigation & title */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 2, sm: 3 }, flexWrap: 'wrap', gap: 1 }}>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackRoundedIcon />}
            variant="outlined"
            size="small"
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Înapoi la Panoul Principal
          </Button>
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            e-urban.ro &bull; Conformitate Legea 169/2026
          </Typography>
        </Box>

        <Paper elevation={1} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, mb: { xs: 2.5, sm: 4 }, backgroundColor: '#ffffff' }}>
          <Box sx={{ display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 1 }}>
            <Box
              sx={{
                width: { xs: 36, sm: 44 },
                height: { xs: 36, sm: 44 },
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.25rem' },
                flexShrink: 0,
              }}
            >
              ?
            </Box>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#0f172a', fontSize: { xs: '1.35rem', sm: '2.125rem' } }}>
                Despre Aplicație & Informații Legale
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                Ghid de utilizare, baza legală conform Codului Urbanismului și angajamentul de confidențialitate
              </Typography>
            </Box>
          </Box>

          <Tabs
            value={tabIndex}
            onChange={(_, val) => setTabIndex(val)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              mt: 2,
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' }, minHeight: 44 },
            }}
          >
            <Tab icon={<MenuBookRoundedIcon fontSize="small" />} iconPosition="start" label="Manual de Utilizare" />
            <Tab icon={<GavelRoundedIcon fontSize="small" />} iconPosition="start" label="Informații Legale & GDPR" />
          </Tabs>
        </Paper>

        {/* SECTION 1: MANUAL DE UTILIZARE */}
        {tabIndex === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Introducere & flux */}
            <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', mb: 2, fontSize: { xs: '1.15rem', sm: '1.5rem' } }}>
                1. Prezentare Generală & Mod de Funcționare
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569', mb: 2, lineHeight: 1.7 }}>
                Aplicația <strong>e-urban.ro</strong> a fost proiectată ca un asistent complet și intuitiv pentru cetățeni, proiectanți, arhitecți și dezvoltatori imobiliari, facilitând completarea corectă a documentațiilor și formularelor oficiale de urbanism și autorizare conform <strong>Legii nr. 169/2026</strong> (Noul Cod al Amenajării Teritoriului, Urbanismului și Construcțiilor - CATUC).
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2, mt: 2 }}>
                <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'primary.main' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Pasul 1</Typography>
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Selectarea Formularului
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Apăsați butonul „Cerere Nouă” din pagina principală. Fereastra modală vă permite să filtrați și să alegeți procedura dorită în funcție de etapa administrativă (Etapa 1, Etapa 2, Notificare Simplificată sau Recepție).
                    </Typography>
                  </CardContent>
                </Card>

                <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'primary.main' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Pasul 2</Typography>
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Completare Ghidată
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Formularul inteligent vă asistă la completarea datelor solicitantului, amplasamentului imobilului și parametrilor tehnici ai construcției, având integrată căutarea automată a UAT-urilor din România.
                    </Typography>
                  </CardContent>
                </Card>

                <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'primary.main' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Pasul 3</Typography>
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Generare PDF & Tipărire
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Salvați cererea pentru a o relua oricând sau generați direct documentul oficial gata de tipărire sau export în format PDF conform machetelor standardizate din Legea 169/2026.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Paper>

            {/* Catalog complet formulare pe etape */}
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                2. Catalogul Formularelor Disponibile & Baza Legală
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Mai jos găsiți toate cele 13 formulare oficiale grupate pe etape procedurale, cu trimiterile legale exacte din Legea nr. 169/2026 și destinația fiecărui act.
              </Typography>

              {DOCUMENT_CATEGORIES.map(category => (
                <Box key={category.id} sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.5,
                      px: 2,
                      backgroundColor: category.headerBg,
                      borderLeft: `4px solid ${category.accentColor}`,
                      borderRadius: '8px 8px 0 0',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: category.badgeColor, fontWeight: 700, letterSpacing: 0.5 }}>
                        {category.stageName} &bull; {category.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#475569', display: 'block' }}>
                        {category.subtitle}
                      </Typography>
                    </Box>
                    <Chip
                      label={category.legalRange}
                      size="small"
                      sx={{
                        backgroundColor: category.badgeBg,
                        color: category.badgeColor,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>

                  <Box sx={{ border: '1px solid #e2e8f0', borderTop: 'none', borderRadius: '0 0 8px 8px', p: 1.5 }}>
                    {category.documents.map((doc, idx) => (
                      <Accordion
                        key={doc.id}
                        elevation={0}
                        disableGutters
                        sx={{
                          border: '1px solid #f1f5f9',
                          borderRadius: '6px !important',
                          mb: idx !== category.documents.length - 1 ? 1 : 0,
                          '&:before': { display: 'none' },
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                              {doc.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: category.badgeColor, fontWeight: 600 }}>
                              {doc.legalBase}
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pt: 0, pb: 2 }}>
                          <Divider sx={{ mb: 1.5 }} />
                          <Typography variant="body2" sx={{ color: '#334155', mb: 1.5 }}>
                            <strong>Destinație & Scop:</strong> {doc.purpose}
                          </Typography>
                          {doc.legalQuote && (
                            <Box
                              sx={{
                                p: 1.5,
                                backgroundColor: '#f8fafc',
                                borderLeft: '3px solid #cbd5e1',
                                fontStyle: 'italic',
                                color: '#475569',
                                fontSize: '0.82rem',
                                borderRadius: '0 4px 4px 0',
                              }}
                            >
                              {doc.legalQuote}
                            </Box>
                          )}
                          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => navigate(`/form/${doc.id}`)}
                              sx={{ textTransform: 'none', borderRadius: 1.5 }}
                            >
                              Completează acest formular
                            </Button>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                </Box>
              ))}
            </Paper>
          </Box>
        )}

        {/* SECTION 2: INFORMAȚII LEGALE & GDPR */}
        {tabIndex === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Date Autor / Companie */}
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <BusinessRoundedIcon color="primary" sx={{ fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  Date despre Autor & Dezvoltator
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>
                Platforma <strong>e-urban.ro</strong> este dezvoltată și administrată de <strong>S.C. SIGN PORTAL S.R.L. ARAD</strong>, companie specializată în soluții software digitale și servicii web inovatoare.
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <Box sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                    Denumire Firmă
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    S.C. SIGN PORTAL S.R.L. ARAD
                  </Typography>
                </Box>

                <Box sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 0.5 }}>
                    Identificare Juridică & Fiscală
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e293b' }}>
                    <strong>Nr. Reg. Com.:</strong> J2004000672027
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e293b' }}>
                    <strong>CIF:</strong> RO 16344256
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1e293b' }}>
                    <strong>EUID:</strong> ROONRC.J2004000672027
                  </Typography>
                </Box>

                <Box sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, backgroundColor: '#f8fafc', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationOnRoundedIcon fontSize="small" color="primary" />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                      Sediul Social
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#475569' }}>
                    Arad, spl. G-ral. Gh. Magheru, bl. 304B, ap. 26<br />
                    Cod poștal 310329, jud. Arad, România
                  </Typography>
                </Box>

                <Box sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, backgroundColor: '#f8fafc', height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                    Contact & Web
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <EmailRoundedIcon fontSize="small" sx={{ color: '#64748b' }} />
                    <MuiLink href="mailto:office@signportal.ro" underline="hover" sx={{ fontSize: '0.875rem' }}>
                      office@signportal.ro
                    </MuiLink>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <PhoneRoundedIcon fontSize="small" sx={{ color: '#64748b' }} />
                    <Typography variant="body2" sx={{ color: '#334155' }}>
                      +40 744 845 974 / +40 732 165 039
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LanguageRoundedIcon fontSize="small" sx={{ color: '#64748b' }} />
                    <MuiLink href="https://www.signportal.ro" target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontSize: '0.875rem' }}>
                      https://www.signportal.ro
                    </MuiLink>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Secțiune Obligatorie GDPR: Zero Personal Data Collection */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: '2px solid #bbf7d0',
                backgroundColor: '#f0fdf4',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <ShieldCheckRoundedIcon sx={{ fontSize: 32, color: '#16a34a' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#14532d' }}>
                    Protecția Datelor cu Caracter Personal (GDPR)
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#166534', fontWeight: 600 }}>
                    POLITICĂ DE CONFIDENȚIALITATE: ZERO COLECTARE DE DATE PE SERVER
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ color: '#166534', mb: 2, lineHeight: 1.7, fontWeight: 500 }}>
                Respectarea dreptului la viață privată este un principiu fundamental al platformei <strong>e-urban.ro</strong>. În conformitate cu Regulamentul General privind Protecția Datelor (GDPR - Regulamentul UE 2016/679), vă informăm în mod expres următoarele:
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <Box sx={{ p: 2.5, backgroundColor: '#ffffff', borderRadius: 2, border: '1px solid #bbf7d0', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#15803d' }}>
                    <StorageRoundedIcon />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      Stocare Exclusiv Locală (Client-Side)
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>
                    Toate datele introduse în formularele de urbanism (nume, CNP, serie buletin, adrese, numere cadastrale, date de contact) sunt stocate <strong>exclusiv în navigatorul dumneavoastră web</strong> (utilizând tehnologia locală <code>IndexedDB / LocalStorage</code>).
                  </Typography>
                </Box>

                <Box sx={{ p: 2.5, backgroundColor: '#ffffff', borderRadius: 2, border: '1px solid #bbf7d0', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#15803d' }}>
                    <SecurityRoundedIcon />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      Fără Transmitere către Server Extern
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>
                    Platforma <strong>nu colectează, nu transmite, nu prelucrează și nu stochează</strong> date cu caracter personal pe niciun server de baze de date extern. Nu există telemetrie intruzivă sau profilare a utilizatorilor.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3, p: 2, backgroundColor: '#ffffff', borderRadius: 2, border: '1px dashed #86efac' }}>
                <Typography variant="body2" sx={{ color: '#166534', lineHeight: 1.6 }}>
                  &bull; <strong>Controlul Total al Utilizatorului:</strong> Puteți șterge în orice moment cererile salvate din tabelul principal. Ștergerea unei cereri elimină ireversibil toate datele asociate din memoria dispozitivului dumneavoastră.<br />
                  &bull; <strong>Securitate & Export:</strong> Generarea formatului de tipărire și PDF se realizează direct în memoria navigatorului, fără intermediari terți.
                </Typography>
              </Box>
            </Paper>

            {/* Notă Juridică & Declinare */}
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                Declinare a Responsabilității & Bază Legală
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                Machetele și formularele generate sunt conforme cu prevederile <strong>Legii nr. 169/2026</strong> privind Codul Amenajării Teritoriului, Urbanismului și Construcțiilor. Aplicația are caracter de instrument tehnic și asistență procedurală. Utilizatorii sunt responsabili de corectitudinea datelor declarate în fața autorităților administrației publice locale competente (primării, consilii județene, inspectorate teritoriale).
              </Typography>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}
