export interface DocumentInfo {
  id: string;
  title: string;
  shortTitle: string;
  categoryId: 'etapa1' | 'etapa2' | 'simplificata' | 'etapa3';
  categoryTitle: string;
  legalBase: string;
  purpose: string;
  legalQuote: string;
  tags?: string[];
}

export interface DocumentCategory {
  id: 'etapa1' | 'etapa2' | 'simplificata' | 'etapa3';
  title: string;
  stageName: string;
  subtitle: string;
  legalRange: string;
  accentColor: string;
  headerBg: string;
  badgeBg: string;
  badgeColor: string;
  documents: DocumentInfo[];
}

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  {
    id: 'etapa1',
    stageName: 'ETAPA 1',
    title: 'CERTIFICAT DE URBANISM',
    subtitle: 'Faza preliminară de informare și stabilire a reglementărilor urbanistice',
    legalRange: 'Art. 254 – 257 din Legea nr. 169/2026',
    accentColor: '#0284c7', // Sky-600
    headerBg: '#f0f9ff',
    badgeBg: '#e0f2fe',
    badgeColor: '#0369a1',
    documents: [
      {
        id: 'CERERECERTIFICATDEURBANISMCONSTRUIREDESFIINTARE',
        title: 'Certificat de Urbanism Construire / Desființare',
        shortTitle: 'CU Construire / Desființare',
        categoryId: 'etapa1',
        categoryTitle: 'Etapa 1: Certificat de Urbanism',
        legalBase: 'Art. 254 alin. (1) și Art. 255 din Legea nr. 169/2026',
        purpose: 'Se folosește pentru stabilirea cerințelor urbanistice, regimului juridic, economic și tehnic al imobilului, precum și a listei complete de avize, acorduri și studii obligatorii pentru proiectul tehnic (D.T.A.C./D.T.A.D.).',
        legalQuote: '„Actul de informare prin care autoritatea face cunoscute solicitantului condițiile de realizare a investițiilor și cerințele urbanistice necesare elaborării documentației tehnice.”',
        tags: ['construire', 'desfiintare', 'demolare', 'avize', 'puz', 'pud']
      },
      {
        id: 'CERERECERTIFICATDEURBANISMDEINFORMARE',
        title: 'Certificat de Urbanism de Informare',
        shortTitle: 'CU Informare',
        categoryId: 'etapa1',
        categoryTitle: 'Etapa 1: Certificat de Urbanism',
        legalBase: 'Art. 254 alin. (2) din Legea nr. 169/2026',
        purpose: 'Se folosește exclusiv în scop informativ (vânzare-cumpărare, evaluare bancară, tranzacții sau prospectare imobiliară). Nu dă dreptul la autorizarea lucrărilor și nu ține loc de CU pentru construire.',
        legalQuote: '„Se eliberează la cererea oricărei persoane fizice sau juridice interesate, în scopul cunoașterii regimului urbanistic aplicabil imobilului la data emiterii.”',
        tags: ['informare', 'vanzare', 'cumparare', 'banca', 'evaluare']
      },
      {
        id: 'CERERECERTIFICATDEURBANISMPENTRUOPERATIUNICADASTRALE',
        title: 'Certificat de Urbanism pentru Operațiuni Cadastrale',
        shortTitle: 'CU Operațiuni Cadastrale',
        categoryId: 'etapa1',
        categoryTitle: 'Etapa 1: Certificat de Urbanism',
        legalBase: 'Art. 254 alin. (3) și Art. 256 din Legea nr. 169/2026',
        purpose: 'Se folosește pentru efectuarea operațiunilor juridice și cadastrale de comasare (alipire) ori parcelare/dezmembrare (dezlipire) a terenurilor, precum și pentru constituirea de servituți de trecere.',
        legalQuote: '„Necesar pentru operațiuni notariale de alipire sau dezlipire a imobilelor, asigurând conformarea parcelelor rezultate cu reglementările documentațiilor de urbanism.”',
        tags: ['dezmembrare', 'alipire', 'comasare', 'cadastru', 'notar', 'servitute']
      },
      {
        id: 'CEREREPRELUNGIRECERTIFICATDEURBANISM',
        title: 'Prelungire Certificat de Urbanism',
        shortTitle: 'Prelungire CU',
        categoryId: 'etapa1',
        categoryTitle: 'Etapa 1: Certificat de Urbanism',
        legalBase: 'Art. 257 alin. (17) din Legea nr. 169/2026',
        purpose: 'Se folosește pentru prelungirea valabilității certificatului de urbanism inițial cu încă maximum 12 luni. Cererea trebuie înregistrată cu cel puțin 15 zile calendaristice înainte de expirarea termenului inițial.',
        legalQuote: '„Valabilitatea certificatului de urbanism se poate prelungi o singură dată, pentru o perioadă de cel mult 12 luni, la cererea titularului depusă în termenul legal.”',
        tags: ['prelungire', 'termen', 'valabilitate', 'expirare']
      }
    ]
  },
  {
    id: 'etapa2',
    stageName: 'ETAPA 2',
    title: 'AUTORIZARE CONSTRUIRE / DESFIINȚARE',
    subtitle: 'Faza de emitere a actului administrativ de autoritate pentru execuția lucrărilor',
    legalRange: 'Art. 248, 260 – 293, 300, 301, 309 din Legea nr. 169/2026',
    accentColor: '#2563eb', // Blue-600
    headerBg: '#eff6ff',
    badgeBg: '#dbeafe',
    badgeColor: '#1d4ed8',
    documents: [
      {
        id: 'CEREREAUTORIZATIEDECONSTRUIRE',
        title: 'Cerere Autorizație de Construire / Desființare',
        shortTitle: 'Cerere Autorizație de Construire',
        categoryId: 'etapa2',
        categoryTitle: 'Etapa 2: Autorizare Construire / Desființare',
        legalBase: 'Art. 248 și Art. 262 din Legea nr. 169/2026',
        purpose: 'Se folosește pentru solicitarea emiterii autorizației de construire sau desființare pe baza documentației tehnice autorizate (D.T.A.C./D.T.A.D.), avizelor obținute și a dovezii titlului asupra imobilului.',
        legalQuote: '„Actul administrativ de autoritate pe baza căruia se pot executa lucrări de construcții, asigurând aplicarea prevederilor legale referitoare la amplasarea, proiectarea și executarea acestora.”',
        tags: ['autorizatie', 'dtac', 'dtad', 'proiect', 'construire']
      },
      {
        id: 'ANEXAAUTORIZATIEDECONSTRUIRE',
        title: 'Anexa Tehnică la Autorizația de Construire',
        shortTitle: 'Anexa Tehnică la AC',
        categoryId: 'etapa2',
        categoryTitle: 'Etapa 2: Autorizare Construire / Desființare',
        legalBase: 'Art. 262 alin. (1) lit. d) din Legea nr. 169/2026',
        purpose: 'Se completează de proiectantul documentației și sintetizează datele tehnice ale investiției: categorii lucrări, POT/CUT, fișa clădirii, suprafețe, volum, utilități și siguranță la incendiu.',
        legalQuote: '„Anexa tehnică sintetică elaborată de proiectantul autorizat ce detaliază parametrii tehnici, funcționali și structurali ai obiectivului de investiții.”',
        tags: ['anexa', 'tehnica', 'proiectant', 'pot', 'cut', 'suprafete', 'fisa cladirii']
      },
      {
        id: 'CEREREPRELUNGIREAUTORIZATIEDECONSTRUIRE',
        title: 'Prelungire Autorizație de Construire',
        shortTitle: 'Prelungire AC',
        categoryId: 'etapa2',
        categoryTitle: 'Etapa 2: Autorizare Construire / Desființare',
        legalBase: 'Art. 309 – 310 din Legea nr. 169/2026',
        purpose: 'Se folosește pentru prelungirea valabilității autorizației (dacă lucrările nu au debutat) sau prelungirea duratei de execuție autorizate (cu cel mult 12 sau 24 de luni), depusă cu minimum 15 zile înainte de expirare.',
        legalQuote: '„Prelungirea valabilității sau a duratei de execuție se poate acorda o singură dată, la cererea titularului formulată cu cel puțin 15 zile înainte de expirarea termenului.”',
        tags: ['prelungire', 'durata executie', 'valabilitate ac']
      },
      {
        id: 'CEREREAUTORIZATIEDEMODIFICARE',
        title: 'Cerere Autorizație de Modificare a Temei',
        shortTitle: 'Autorizație de Modificare',
        categoryId: 'etapa2',
        categoryTitle: 'Etapa 2: Autorizare Construire / Desființare',
        legalBase: 'Art. 293 din Legea nr. 169/2026',
        purpose: 'Se folosește pe parcursul execuției lucrărilor când apar modificări de temă, soluții tehnice sau fațade față de proiectul inițial autorizat, fără schimbarea reglementărilor urbanistice aprobate.',
        legalQuote: '„Orice modificare a temei autorizației de construire pe parcursul execuției lucrărilor necesită emiterea unei noi autorizații corespunzătoare modificărilor solicitate.”',
        tags: ['modificare', 'tema', 'santier', 'proiect nou']
      },
      {
        id: 'CEREREAUTORIZATIEDEREGULARIZARE',
        title: 'Cerere Autorizație de Regularizare',
        shortTitle: 'Autorizație de Regularizare',
        categoryId: 'etapa2',
        categoryTitle: 'Etapa 2: Autorizare Construire / Desființare',
        legalBase: 'Art. 301 din Legea nr. 169/2026',
        purpose: 'Se folosește pentru intrarea în legalitate a lucrărilor de construcții executate fără autorizație sau cu nerespectarea acesteia, după achitarea amenzii contravenționale și expertiză tehnică.',
        legalQuote: '„Emiterea autorizației pentru lucrări executate fără autorizație de construire sau cu nerespectarea prevederilor acesteia, în baza expertizei tehnice de calitate și a documentației de urbanism.”',
        tags: ['regularizare', 'intrare in legalitate', 'fara autorizatie', 'amenda']
      },
      {
        id: 'CEREREAVIZDEAMPLASARE',
        title: 'Cerere Aviz de Amplasare',
        shortTitle: 'Aviz de Amplasare',
        categoryId: 'etapa2',
        categoryTitle: 'Etapa 2: Autorizare Construire / Desființare',
        legalBase: 'Art. 300 din Legea nr. 169/2026',
        purpose: 'Se folosește pentru amplasarea echipamentelor stradale ușoare: rastele biciclete/trotinete, stații de reîncărcare vehicule electrice, senzori de calitate a aerului sau mobilier urban fără fundații.',
        legalQuote: '„Se emite pentru amplasarea pe domeniul public sau privat a echipamentelor ușoare, stațiilor de reîncărcare și elementelor de monitorizare ce nu necesită fundații permanente.”',
        tags: ['rastele', 'statii electrice', 'trotinete', 'mobilier urban']
      },
      {
        id: 'DECLARATIAPEPROPRIARASPUNDERE',
        title: 'Declarație pe Propria Răspundere (Acord Tacit)',
        shortTitle: 'Declarație Acord Tacit',
        categoryId: 'etapa2',
        categoryTitle: 'Etapa 2: Autorizare Construire / Desființare',
        legalBase: 'Art. 93 alin. (4), Art. 262 alin. (1) lit. m), Art. 269 alin. (16)',
        purpose: 'Se anexează la dosarul autorizației de construire atunci când se invocă aprobarea tacită a avizelor sau acordurilor care nu au fost emise de către avizatori în termenul legal.',
        legalQuote: '„Atestă pe proprie răspundere, sub sancțiunea legii penale, depășirea termenului legal de emitere a avizului fără comunicarea de refuz sau cereri de completare.”',
        tags: ['acord tacit', 'declaratie', 'aviz', 'termen depasit']
      }
    ]
  },
  {
    id: 'simplificata',
    stageName: 'PROCEDURĂ SIMPLIFICATĂ',
    title: 'NOTIFICARE PREALABILĂ',
    subtitle: 'Executare lucrări scutite de autorizație completă pe baza notificării autorității locale',
    legalRange: 'Art. 294 – 298 din Legea nr. 169/2026',
    accentColor: '#059669', // Emerald-600
    headerBg: '#ecfdf5',
    badgeBg: '#d1fae5',
    badgeColor: '#047857',
    documents: [
      {
        id: 'NOTIFICAREPROCEDURASIMPLIFICATA',
        title: 'Notificare Prealabilă (Procedură Simplificată)',
        shortTitle: 'Notificare Lucrări',
        categoryId: 'simplificata',
        categoryTitle: 'Procedură Simplificată (Notificare)',
        legalBase: 'Art. 294 – Art. 298 din Legea nr. 169/2026',
        purpose: 'Se folosește pentru lucrări scutite de autorizație clasică: locuințe parter în rural intravilan sub 150 mp, anexe gospodărești sub 50 mp, împrejmuiri ușoare, reabilitare fațade (fără monumente).',
        legalQuote: '„Lucrările de construire care pot fi realizate în baza notificării prealabile transmise autorității administrației publice locale, fără a mai fi necesară obținerea unei autorizații de construire.”',
        tags: ['notificare', 'rural', 'anexe', 'imprejmuiri', 'simplificat', 'scutit de ac']
      }
    ]
  },
  {
    id: 'etapa3',
    stageName: 'ETAPA 3',
    title: 'EXECUȚIE LUCRĂRI & RECEPȚIE',
    subtitle: 'Faza de deschidere a șantierului, finalizare a construcției și recepție oficială',
    legalRange: 'Art. 298, 312, 315 din Legea nr. 169/2026',
    accentColor: '#d97706', // Amber-600
    headerBg: '#fffbeb',
    badgeBg: '#fef3c7',
    badgeColor: '#b45309',
    documents: [
      {
        id: 'INSTIINTAREINCEPEREEXECUTIELUCRARI',
        title: 'Înștiințare Începere Execuție Lucrări',
        shortTitle: 'Înștiințare Începere Lucrări',
        categoryId: 'etapa3',
        categoryTitle: 'Etapa 3: Execuție Lucrări & Recepție',
        legalBase: 'Art. 312 din Legea nr. 169/2026',
        purpose: 'Se depune obligatoriu către primărie (autoritatea emitentă) și Inspectoratul de Stat în Construcții (ISC) cu cel puțin 10 zile calendaristice înainte de deschiderea efectivă a șantierului.',
        legalQuote: '„Titularul autorizației are obligația de a înștiința autoritatea emitentă și inspectoratul teritorial în construcții privind data începerii execuției lucrărilor autorizate.”',
        tags: ['incepere', 'santier', 'isc', 'termen 10 zile']
      },
      {
        id: 'INSTIINTAREPRIVINDINCHEIEREAEXECUTIEILUCRARILOR',
        title: 'Înștiințare Încheiere Execuție Lucrări',
        shortTitle: 'Înștiințare Încheiere Lucrări',
        categoryId: 'etapa3',
        categoryTitle: 'Etapa 3: Execuție Lucrări & Recepție',
        legalBase: 'Art. 315 din Legea nr. 169/2026',
        purpose: 'Se transmite la finalizarea completă a lucrărilor autorizate pentru convocarea comisiei de recepție, regularizarea taxelor de autorizare și eliberarea certificatului de edificare a construcției.',
        legalQuote: '„La finalizarea lucrărilor de construcții autorizate, investitorul are obligația de a notifica autoritatea administrației publice locale pentru regularizarea taxelor și participarea la recepție.”',
        tags: ['incheiere', 'finalizare', 'receptie', 'regularizare taxa']
      },
      {
        id: 'SOLICITAREUATRECEPTIE',
        title: 'Solicitare Participare Reprezentant UAT la Recepție',
        shortTitle: 'Solicitare UAT Recepție',
        categoryId: 'etapa3',
        categoryTitle: 'Etapa 3: Execuție Lucrări & Recepție',
        legalBase: 'Art. 298 din Legea nr. 169/2026',
        purpose: 'Se folosește în cazul lucrărilor executate pe bază de Notificare (procedură simplificată) pentru desemnarea delegatului primăriei în comisia de recepție la terminarea lucrărilor.',
        legalQuote: '„Participarea reprezentantului administrației publice locale la recepția la terminarea lucrărilor notificate și întocmirea procesului-verbal de recepție.”',
        tags: ['reprezentant primarie', 'comisie receptie', 'lucrari notificate']
      }
    ]
  }
];

// Helper dictionary for direct key lookup
export const ALL_DOCUMENTS: Record<string, DocumentInfo> = DOCUMENT_CATEGORIES.flatMap(cat => cat.documents).reduce(
  (acc, doc) => {
    acc[doc.id] = doc;
    return acc;
  },
  {} as Record<string, DocumentInfo>
);

const ALIASES: Record<string, string> = {
  'AUTORIZATIE_CONSTRUIRE': 'CEREREAUTORIZATIEDECONSTRUIRE',
  'AUTORIZATIE_MODIFICARE': 'CEREREAUTORIZATIEDEMODIFICARE',
  'AUTORIZATIE_REGULARIZARE': 'CEREREAUTORIZATIEDEREGULARIZARE',
  'CERTIFICAT_URBANISM': 'CERERECERTIFICATDEURBANISMCONSTRUIREDESFIINTARE',
  'PRELUNGIRE': 'CEREREPRELUNGIREAUTORIZATIEDECONSTRUIRE',
  'NOTIFICARE_PROCEDURA_SIMPLIFICATA': 'NOTIFICAREPROCEDURASIMPLIFICATA',
  'AVIZ_AMPLASARE': 'CEREREAVIZDEAMPLASARE',
};

export function getDocumentById(id: string): DocumentInfo | undefined {
  const resolvedId = ALIASES[id] || id;
  return ALL_DOCUMENTS[resolvedId];
}

