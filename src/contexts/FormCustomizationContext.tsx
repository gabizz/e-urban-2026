import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import stemaRoDefault from '../assets/stema_ro.webp';
import { fetchUATBySiruta, checkSirutaLogoExists, type UAT } from '../services/uat';

interface FormCustomizationContextType {
  siruta: string | null;
  uatDetails: UAT | null;
  stemaUrl: string;
  customStemaUrl: string | null;
  setCustomStemaUrl: (url: string | null) => void;
  openStemaDialog: () => void;
  loading: boolean;
}

const FormCustomizationContext = createContext<FormCustomizationContextType>({
  siruta: null,
  uatDetails: null,
  stemaUrl: stemaRoDefault,
  customStemaUrl: null,
  setCustomStemaUrl: () => {},
  openStemaDialog: () => {},
  loading: false,
});

export const useFormCustomization = () => useContext(FormCustomizationContext);

export const FormCustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const siruta = searchParams.get('siruta');

  const [uatDetails, setUatDetails] = useState<UAT | null>(null);
  const [stemaUrl, setStemaUrl] = useState<string>(stemaRoDefault);
  const [customStemaUrl, setCustomStemaUrlState] = useState<string | null>(() => {
    try {
      return localStorage.getItem('e-urban:customStemaUrl');
    } catch {
      return null;
    }
  });

  const setCustomStemaUrl = (url: string | null) => {
    setCustomStemaUrlState(url);
    try {
      if (url) {
        localStorage.setItem('e-urban:customStemaUrl', url);
      } else {
        localStorage.removeItem('e-urban:customStemaUrl');
      }
    } catch {
      // Ignore storage errors (e.g. private mode)
    }
  };
  const [stemaDialogOpen, setStemaDialogOpen] = useState(false);
  const [stemaInput, setStemaInput] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const openStemaDialog = () => {
    setStemaInput(customStemaUrl || '');
    setStemaDialogOpen(true);
  };

  const handleSaveStema = () => {
    setCustomStemaUrl(stemaInput.trim() || null);
    setStemaDialogOpen(false);
  };

  useEffect(() => {
    let isCancelled = false;

    if (!siruta) {
      setUatDetails(null);
      setStemaUrl(stemaRoDefault);
      return;
    }

    setLoading(true);

    Promise.all([
      fetchUATBySiruta(siruta),
      checkSirutaLogoExists(siruta),
    ])
      .then(([uat, customLogoUrl]) => {
        if (isCancelled) return;
        if (uat) {
          setUatDetails(uat);
        }
        if (customLogoUrl) {
          setStemaUrl(customLogoUrl);
        } else {
          setStemaUrl(stemaRoDefault);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [siruta]);

  return (
    <FormCustomizationContext.Provider value={{ siruta, uatDetails, stemaUrl: customStemaUrl || stemaUrl, customStemaUrl, setCustomStemaUrl, openStemaDialog, loading }}>
      {children}
      <Dialog open={stemaDialogOpen} onClose={() => setStemaDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Adaugă URL stemă localitate</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="URL stemă localitate"
            placeholder="https://exemplu.ro/stema.png"
            type="url"
            fullWidth
            variant="outlined"
            value={stemaInput}
            onChange={(e) => setStemaInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSaveStema();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          {customStemaUrl && (
            <Button
              color="inherit"
              onClick={() => {
                setCustomStemaUrl(null);
                setStemaDialogOpen(false);
              }}
              sx={{ mr: 'auto' }}
            >
              Resetează la implicit
            </Button>
          )}
          <Button onClick={() => setStemaDialogOpen(false)}>Anulează</Button>
          <Button variant="contained" onClick={handleSaveStema}>Salvează</Button>
        </DialogActions>
      </Dialog>
    </FormCustomizationContext.Provider>
  );
};
