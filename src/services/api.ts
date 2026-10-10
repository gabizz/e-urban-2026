export interface Judet {
  id: string;
  nume: string;
}

export interface Localitate {
  id: string;
  nume: string;
  judetId: string;
}

const API_BASE = 'https://primarii.registro.ro/api';

export const fetchJudete = async (): Promise<Judet[]> => {
  try {
    const res = await fetch(`${API_BASE}/judete`);
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch judete:', error);
    return [
      { id: 'AR', nume: 'Arad' },
      { id: 'B', nume: 'Bucuresti' },
      { id: 'CJ', nume: 'Cluj' }
    ];
  }
};

export const fetchLocalitati = async (judetId: string): Promise<Localitate[]> => {
  try {
    const res = await fetch(`${API_BASE}/judete/${judetId}/localitati`);
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch localitati for ${judetId}:`, error);
    return [
      { id: '1', nume: 'Siria', judetId: 'AR' },
      { id: '2', nume: 'Arad', judetId: 'AR' }
    ];
  }
};
