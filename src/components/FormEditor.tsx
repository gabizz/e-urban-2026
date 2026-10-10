import { Box, TextField, MenuItem, Typography, Paper } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { Judet, Localitate } from '../services/api';

export default function FormEditor({ control, errors, judete, localitati, selectedJudet, tipFormular }: any) {
  const errs: any = errors;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>1. Detalii Cerere</Typography>
        <Box sx={{ mt: 2 }}>
          <Controller
            name="tip_formular"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} select label="Tip Formular" fullWidth>
                <MenuItem value="CERTIFICAT_URBANISM">Certificat de Urbanism</MenuItem>
                <MenuItem value="AUTORIZATIE_CONSTRUIRE">Autorizatie de Construire</MenuItem>
                <MenuItem value="AUTORIZATIE_REGULARIZARE">Autorizatie de Regularizare</MenuItem>
                <MenuItem value="NOTIFICARE_PROCEDURA_SIMPLIFICATA">Notificare (Procedura Simplificata)</MenuItem>
              </TextField>
            )}
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>2. Date Solicitant</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
          <Controller
            name="solicitant.tip_persoana"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Tip Persoana" fullWidth>
                <MenuItem value="FIZICA">Fizica</MenuItem>
                <MenuItem value="JURIDICA">Juridica</MenuItem>
              </TextField>
            )}
          />
          <Controller
            name="solicitant.nume_denumire"
            control={control}
            rules={{ required: true, minLength: 2 }}
            render={({ field }) => (
              <TextField {...field} label="Nume / Denumire" fullWidth error={!!errs.solicitant?.nume_denumire} />
            )}
          />
          <Controller
            name="solicitant.cnp_cui"
            control={control}
            rules={{ required: true, pattern: /^(RO)?([0-9]{2,10}|[1-9][0-9]{12})$/ }}
            render={({ field }) => (
              <TextField {...field} label="CNP / CUI" fullWidth error={!!errs.solicitant?.cnp_cui} />
            )}
          />
          <Controller
            name="solicitant.telefon"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label="Telefon" fullWidth error={!!errs.solicitant?.telefon} />
            )}
          />
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Controller
              name="solicitant.adresa_domiciliu_sediu"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Adresa Domiciliu / Sediu" fullWidth error={!!errs.solicitant?.adresa_domiciliu_sediu} />
              )}
            />
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>3. Date Imobil</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
          <Controller
            name="imobil.judet"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} select label="Judet" fullWidth>
                {judete.map((j: Judet) => (
                  <MenuItem key={j.id} value={j.id}>{j.nume}</MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="imobil.localitate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} select label="Localitate" fullWidth disabled={!selectedJudet}>
                {localitati.map((l: Localitate) => (
                  <MenuItem key={l.id} value={l.id}>{l.nume}</MenuItem>
                ))}
              </TextField>
            )}
          />
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Controller
              name="imobil.adresa"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Adresa Imobil" fullWidth error={!!errs.imobil?.adresa} />
              )}
            />
          </Box>
          <Controller
            name="imobil.nr_cadastral"
            control={control}
            rules={{ required: true, pattern: /^[0-9]+$/ }}
            render={({ field }) => (
              <TextField {...field} label="Numar Cadastral" fullWidth error={!!errs.imobil?.nr_cadastral} />
            )}
          />
          <Controller
            name="imobil.nr_carte_funciara"
            control={control}
            rules={{ required: true, pattern: /^[0-9]+$/ }}
            render={({ field }) => (
              <TextField {...field} label="Numar Carte Funciara (CF)" fullWidth error={!!errs.imobil?.nr_carte_funciara} />
            )}
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>4. Detalii Solicitare</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2, mt: 2 }}>
          <Controller
            name="detalii_solicitare.scopul_solicitarii"
            control={control}
            rules={{ required: true, minLength: 10 }}
            render={({ field }) => (
              <TextField {...field} label="Scopul Solicitarii (Lucrari)" fullWidth multiline rows={4} error={!!errs.detalii_solicitare?.scopul_solicitarii} />
            )}
          />
          {tipFormular === 'AUTORIZATIE_REGULARIZARE' && (
            <Controller
              name="detalii_solicitare.perioada_edificarii_fara_autorizatie"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Perioada edificarii fara autorizatie" fullWidth />
              )}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
}
