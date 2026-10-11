import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import stemaRoDefault from '../assets/stema_ro.webp';
import { fetchUATBySiruta, checkSirutaLogoExists, type UAT } from '../services/uat';

interface FormCustomizationContextType {
  siruta: string | null;
  uatDetails: UAT | null;
  stemaUrl: string;
  loading: boolean;
}

const FormCustomizationContext = createContext<FormCustomizationContextType>({
  siruta: null,
  uatDetails: null,
  stemaUrl: stemaRoDefault,
  loading: false,
});

export const useFormCustomization = () => useContext(FormCustomizationContext);

export const FormCustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const siruta = searchParams.get('siruta');

  const [uatDetails, setUatDetails] = useState<UAT | null>(null);
  const [stemaUrl, setStemaUrl] = useState<string>(stemaRoDefault);
  const [loading, setLoading] = useState<boolean>(false);

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
    <FormCustomizationContext.Provider value={{ siruta, uatDetails, stemaUrl, loading }}>
      {children}
    </FormCustomizationContext.Provider>
  );
};
