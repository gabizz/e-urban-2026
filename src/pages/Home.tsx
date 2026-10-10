import { useEffect, useState } from 'react';
import { Button, Container, Typography, Card, CardContent, CardActions, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { getForms, deleteForm } from '../services/storage';
import type { FormSubmission } from '../services/storage';
import { Link } from 'react-router-dom';
import { PrintButton } from '../components/PrintablePhysicalForm';

export default function Home() {
  const [forms, setForms] = useState<FormSubmission[]>([]);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  const loadForms = () => getForms().then(setForms);

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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Cererile Mele (Legea 169/2026)</Typography>
        <Button variant="contained" component={Link} to="/form/new">Cerere Noua</Button>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {forms.map(form => (
          <Box key={form.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{form.data.tip_formular}</Typography>
                <Typography color="textSecondary">
                  {new Date(form.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Imobil: {form.data.imobil?.adresa || 'N/A'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/form/${form.id}`}>Editeaza</Button>
                <PrintButton data={form.data} />
                <Button size="small" color="error" onClick={() => handleDeleteClick(form.id)}>Șterge</Button>
              </CardActions>
            </Card>
          </Box>
        ))}
        {forms.length === 0 && (
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Typography>Nu aveti cereri salvate. Apasati "Cerere Noua" pentru a incepe.</Typography>
          </Box>
        )}
      </Box>

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
    </Container>
  );
}
