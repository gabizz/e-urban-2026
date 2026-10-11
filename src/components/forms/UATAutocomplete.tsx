import { useState, useEffect, useMemo } from 'react';
import { CustomAutocomplete as Autocomplete, CustomTextField as TextField } from '../inputs';
import { useFormContext, Controller } from 'react-hook-form';

interface UAT {
  ID_judet: string;
  Judet: string;
  SIRUTA: string;
  Localitate: string;
  Website: string;
  'E-mail general': string;
  'E-mail registratura': string;
  Telefon: string;
  Adresa: string;
  cui: string;
}

const JUDETE = [
  "ALBA", "ARAD", "ARGES", "BACAU", "BIHOR", "BISTRITA-NASAUD", "BOTOSANI",
  "BRAILA", "BRASOV", "BUCURESTI", "BUZAU", "CALARASI", "CARAS-SEVERIN",
  "CLUJ", "CONSTANTA", "COVASNA", "DAMBOVITA", "DOLJ", "GALATI", "GIURGIU",
  "GORJ", "HARGHITA", "HUNEDOARA", "IALOMITA", "IASI", "ILFOV", "MARAMURES",
  "MEHEDINTI", "MURES", "NEAMT", "OLT", "PRAHOVA", "SALAJ", "SATU MARE",
  "SIBIU", "SUCEAVA", "TELEORMAN", "TIMIS", "TULCEA", "VALCEA", "VASLUI", "VRANCEA"
];

// Cache by judet to avoid redundant fetches
const uatCacheByJudet: Record<string, UAT[]> = {};
const fetchingPromises: Record<string, Promise<UAT[]> | undefined> = {};

export function fetchUATsForJudet(judet: string): Promise<UAT[]> {
  if (!judet) return Promise.resolve([]);
  if (uatCacheByJudet[judet]) return Promise.resolve(uatCacheByJudet[judet]);
  if (fetchingPromises[judet]) return fetchingPromises[judet];
  
  const encodedJudet = encodeURIComponent(judet);
  // Uses Vite proxy in development and Cloudflare Worker proxy in production
  const baseUrl = '';
  
  fetchingPromises[judet] = fetch(`${baseUrl}/api/uat?judet=${encodedJudet}`)
    .then(res => {
      if (!res.ok) throw new Error('API Error');
      return res.json();
    })
    .then(data => {
      uatCacheByJudet[judet] = data;
      return data;
    })
    .catch(err => {
      console.error(`Failed to fetch UATs for ${judet}`, err);
      return [];
    });
    
  return fetchingPromises[judet];
}

interface UATAutocompleteProps {
  style?: React.CSSProperties;
  label: string;
  name: string;
  type: 'judet' | 'localitate';
  linkedJudetName?: string; 
  onSelectUAT?: (uat: UAT) => void;
  freeSolo?: boolean;
}

export default function UATAutocomplete({ label, name, type, linkedJudetName, onSelectUAT, style, freeSolo }: UATAutocompleteProps) {
  const { control, watch } = useFormContext();
  const [data, setData] = useState<UAT[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedJudet = linkedJudetName ? watch(linkedJudetName) : null;

  useEffect(() => {
    if (type === 'localitate' && selectedJudet) {
      if (uatCacheByJudet[selectedJudet]) {
        setData(uatCacheByJudet[selectedJudet]);
      } else {
        setLoading(true);
        fetchUATsForJudet(selectedJudet).then(d => {
          setData(d);
          setLoading(false);
        });
      }
    } else {
      setData([]);
    }
  }, [type, selectedJudet]);

  const options = useMemo(() => {
    if (type === 'judet') {
      return JUDETE;
    } else {
      return Array.from(new Set(data.map(d => d.Localitate))).filter(Boolean).sort();
    }
  }, [data, type]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Autocomplete style={style}
          {...field}
          freeSolo={freeSolo}
          options={options}
          loading={loading}
          value={field.value || null}
          onInputChange={(_, newInputValue) => {
            if (freeSolo) {
              field.onChange(newInputValue);
            }
          }}
          onChange={(_, newValue) => {
            field.onChange(newValue || '');
            if (type === 'localitate' && onSelectUAT && newValue) {
              const uat = data.find(d => d.Localitate === newValue && d.Judet === selectedJudet);
              if (uat) {
                // As requested, query the API again to get full details using the locality's SIRUTA
                const baseUrl = '';
                fetch(`${baseUrl}/api/uat?siruta=${uat.SIRUTA}`)
                  .then(res => res.json())
                  .then(details => {
                    if (details && details.length > 0) {
                      onSelectUAT(details[0]);
                    } else {
                      onSelectUAT(uat); // fallback
                    }
                  })
                  .catch(() => onSelectUAT(uat));
              }
            } else if (type === 'judet') {
              // Optionally handle judet change side-effects here
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              size="small"
              fullWidth
              hiddenLabel={!label}
              label={label}
              margin="dense"
              style={{ marginTop: '8px' }}
            />
          )}
        />
      )}
    />
  );
}
