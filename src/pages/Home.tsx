import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { getForms, deleteForm } from '../services/storage';
import type { FormSubmission } from '../services/storage';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { PrintButton } from '../components/PrintablePhysicalForm';
import { DocumentSelectDialog } from '../components/DocumentSelectMenu';
import { getDocumentById } from '../data/documentTypes';
import eUrbanImg from '../assets/e-urban.jpg';

// Helper to format any unmapped camelCase / snake_case / uppercase spaceless identifiers
function formatFallbackDocName(rawId: string): string {
  if (!rawId) return 'Formular Urbanism';
  // Insert spaces before capitals if it's all uppercase words or camelCase
  return rawId
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .trim();
}

export default function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [forms, setForms] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);
  const [selectDocOpen, setSelectDocOpen] = useState(false);

  const loadForms = async () => {
    try {
      const items = await getForms();
      setForms(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error('Failed to load forms from storage:', err);
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDoc = (docId: string) => {
    setSelectDocOpen(false);
    const search = searchParams.toString();
    navigate(`/form/${docId}${search ? `?${search}` : ''}`);
  };

  useEffect(() => {
    loadForms();
    document.title = 'e-urban.ro | Asistent Formulare Urbanism & Construcții (Legea 169/2026)';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Platformă digitală pentru asistență procedurală, completare și descărcare a formularelor oficiale de urbanism și autorizații de construire conform noului Cod al Urbanismului (Legea nr. 169/2026 - CATUC).'
      );
    }
  }, []);

  const handleDeleteClick = (id: string) => {
    setFormToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (formToDelete) {
      await deleteForm(formToDelete);
      setFormToDelete(null);
      loadForms();
    }
  };

  const handleCancelDelete = () => {
    setFormToDelete(null);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 'calc(100vh - 70px)',
        width: '100%',
        py: 4,
        pb: { xs: 16, sm: 24, md: 32 },
      }}
    >
      {/* Fixed bottom center background bounded to container width */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '1126px', // bounded strictly to container width
          height: { xs: '30vh', sm: '38vh', md: '44vh' },
          maxHeight: '415px',
          backgroundImage: `url(${eUrbanImg})`,
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            mb: { xs: 2.5, sm: 4 },
            gap: 2,
            textAlign: 'left',
          }}
        >
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              Cererile mele (Legea 169/2026)
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 0.5, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Platformă digitală pentru generare și gestiune formulare oficiale de urbanism
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => setSelectDocOpen(true)}
            size="large"
            sx={{
              width: { xs: '100%', sm: 'auto' },
              py: { xs: 1.25, sm: 1 },
              fontWeight: 700,
            }}
          >
            Cerere Nouă
          </Button>
        </Box>

        {loading ? (
          <Paper
            elevation={1}
            sx={{
              p: { xs: 4, sm: 8 },
              textAlign: 'center',
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.82)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(226, 232, 240, 0.85)',
              boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <CircularProgress size={36} thickness={4} />
            <Typography variant="body2" color="textSecondary">
              Se încarcă cererile salvate...
            </Typography>
          </Paper>
        ) : forms.length === 0 ? (
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, sm: 6 },
              textAlign: 'center',
              borderRadius: 3,
              border: '1px dashed #cbd5e1',
              backgroundColor: 'rgba(255, 255, 255, 0.82)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.08)',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              Nu aveți cereri salvate
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Apăsați pe „Cerere Nouă” pentru a alege și completa un formular de urbanism conform Legii 169/2026.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setSelectDocOpen(true)}
              size="medium"
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Cerere Nouă
            </Button>
          </Paper>
        ) : (
          <>
            {/* MOBILE XS CARD VIEW */}
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', gap: 2 }}>
              {forms.map(form => {
                const tip = form?.data?.tip_formular || '';
                const docInfo = tip ? getDocumentById(tip) : undefined;
                const displayTitle = docInfo?.title || formatFallbackDocName(tip);
                const stage = docInfo?.categoryTitle || 'Formular Urbanism';

                return (
                  <Paper
                    key={form.id}
                    elevation={1}
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      border: '1px solid rgba(226, 232, 240, 0.85)',
                      backgroundColor: 'rgba(255, 255, 255, 0.82)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>
                        {displayTitle}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip
                          label={stage}
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            backgroundColor: '#e0f2fe',
                            color: '#0369a1',
                            border: '1px solid #bae6fd',
                          }}
                        />
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                          {new Date(form.createdAt).toLocaleDateString('ro-RO', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, pt: 0.5, borderTop: '1px solid #f1f5f9' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        component={Link}
                        to={`/form/${form.id}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}
                        startIcon={<EditRoundedIcon fontSize="small" />}
                        sx={{
                          flex: 1,
                          height: 36,
                          textTransform: 'none',
                          fontWeight: 600,
                          borderRadius: 1.5,
                        }}
                      >
                        Editează
                      </Button>
                      <PrintButton
                        data={form.data}
                        size="small"
                        sx={{
                          flex: 1,
                          height: 36,
                          textTransform: 'none',
                          fontWeight: 600,
                          borderRadius: 1.5,
                        }}
                      />
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(form.id)}
                        aria-label="Șterge"
                        sx={{
                          height: 36,
                          width: 36,
                          borderRadius: 1.5,
                          border: '1px solid #fee2e2',
                          backgroundColor: '#fef2f2',
                        }}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                );
              })}
            </Box>

            {/* DESKTOP & TABLET TABLE VIEW (sm and up) */}
            <TableContainer
              component={Paper}
              elevation={2}
              sx={{
                display: { xs: 'none', sm: 'block' },
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid rgba(226, 232, 240, 0.85)',
                backgroundColor: 'rgba(255, 255, 255, 0.82)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="tabel cereri urbanism">
                <TableHead sx={{ backgroundColor: 'rgba(248, 250, 252, 0.82)', borderBottom: '2px solid rgba(226, 232, 240, 0.85)' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#334155', py: 2 }}>Tip Formular</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#334155', py: 2, width: 180 }}>Data</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: '#334155', py: 2, width: 260 }}>Acțiuni</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {forms.map(form => {
                    const tip = form?.data?.tip_formular || '';
                    const docInfo = tip ? getDocumentById(tip) : undefined;
                    const displayTitle = docInfo?.title || formatFallbackDocName(tip);
                    const stage = docInfo?.categoryTitle || 'Formular Urbanism';

                    return (
                      <TableRow
                        key={form.id}
                        hover
                        sx={{
                          transition: 'background-color 0.15s ease',
                          '&:hover': { backgroundColor: 'rgba(241, 245, 249, 0.7)' },
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ verticalAlign: 'middle', py: 2 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, alignItems: 'flex-start' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem', lineHeight: 1.3 }}>
                              {displayTitle}
                            </Typography>
                            <Chip
                              label={stage}
                              size="small"
                              sx={{
                                height: 22,
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                backgroundColor: '#e0f2fe',
                                color: '#0369a1',
                                border: '1px solid #bae6fd',
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'middle', py: 2, whiteSpace: 'nowrap' }}>
                          <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500 }}>
                            {new Date(form.createdAt).toLocaleDateString('ro-RO', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                            {new Date(form.createdAt).toLocaleTimeString('ro-RO', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ verticalAlign: 'middle', py: 2 }}>
                          <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Tooltip title="Editează cererea">
                              <Button
                                size="small"
                                variant="outlined"
                                component={Link}
                                to={`/form/${form.id}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}
                                startIcon={<EditRoundedIcon fontSize="small" />}
                                sx={{
                                  height: 34,
                                  textTransform: 'none',
                                  fontWeight: 600,
                                  borderRadius: 1.5,
                                  px: 1.5,
                                }}
                              >
                                Editează
                              </Button>
                            </Tooltip>
                            <PrintButton
                              data={form.data}
                              size="small"
                              sx={{
                                height: 34,
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 1.5,
                                px: 1.5,
                              }}
                            />
                            <Tooltip title="Șterge cererea">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteClick(form.id)}
                                aria-label="Șterge"
                                sx={{
                                  height: 34,
                                  width: 34,
                                  borderRadius: 1.5,
                                  border: '1px solid #fee2e2',
                                  backgroundColor: '#fef2f2',
                                  '&:hover': { backgroundColor: '#fee2e2' },
                                }}
                              >
                                <DeleteOutlineRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        <Dialog
          open={Boolean(formToDelete)}
          onClose={handleCancelDelete}
        >
          <DialogTitle>Confirmare ștergere</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sunteți sigur că doriți să ștergeți acest document? Această acțiune este ireversibilă.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Anulează</Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              Șterge
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal for selecting form type when creating a new request */}
        <DocumentSelectDialog
          open={selectDocOpen}
          onClose={() => setSelectDocOpen(false)}
          onSelect={handleSelectDoc}
        />
      </Container>
    </Box>
  );
}
