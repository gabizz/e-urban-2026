export interface UAT {
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

export function buildInstitutionName(locality: string): string {
  const loc = (locality || '').toUpperCase();
  const cap = (s: string) => {
    let res = s.toLowerCase();
    res = res.replace(/(^|[\s-])\S/g, l => l.toUpperCase());
    return res;
  };

  if (loc.startsWith('MUNICIPIUL ')) {
    return 'Primăria Municipiului ' + cap(loc.substring(11));
  } else if (loc.startsWith('ORAS ')) {
    return 'Primăria Orașului ' + cap(loc.substring(5));
  } else if (loc.startsWith('SECTORUL ')) {
    return 'Primăria Sectorului ' + cap(loc.substring(9));
  }
  return 'Primăria Comunei ' + cap(loc);
}

export async function fetchUATBySiruta(siruta: string): Promise<UAT | null> {
  if (!siruta) return null;
  try {
    const res = await fetch(`/api/uat?siruta=${encodeURIComponent(siruta)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0] as UAT;
    }
  } catch (err) {
    console.error('Failed to fetch UAT by siruta:', err);
  }
  return null;
}

export async function checkSirutaLogoExists(siruta: string): Promise<string | null> {
  if (!siruta) return null;
  const logoUrl = `/${encodeURIComponent(siruta)}.jpg`;
  try {
    const res = await fetch(logoUrl, { method: 'HEAD' });
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      // Verify it's actually an image, not the SPA index.html fallback
      if (contentType.toLowerCase().includes('image') || !contentType.toLowerCase().includes('text/html')) {
        return logoUrl;
      }
    }
  } catch (err) {
    console.warn('Failed to probe siruta logo:', err);
  }
  return null;
}
