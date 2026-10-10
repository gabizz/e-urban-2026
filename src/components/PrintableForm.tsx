export default function PrintableForm({ data }: { data: any }) {
  return (
    <div style={{ padding: '40px', fontFamily: 'Times New Roman, serif', color: '#000', fontSize: '14px', lineHeight: '1.5' }}>
      <h2 style={{ textAlign: 'center', textTransform: 'uppercase', marginBottom: '40px' }}>
        CERERE PENTRU {data.tip_formular?.replace('_', ' ')}
      </h2>

      <p style={{ textIndent: '40px', textAlign: 'justify' }}>
        Subsemnatul/a <strong>{data.solicitant?.nume_denumire || '................................'}</strong>,
        având CNP/CUI <strong>{data.solicitant?.cnp_cui || '................................'}</strong>,
        cu domiciliul/sediul în <strong>{data.solicitant?.adresa_domiciliu_sediu || '........................................................................'}</strong>,
        telefon <strong>{data.solicitant?.telefon || '................................'}</strong>, 
        e-mail <strong>{data.solicitant?.email || '................................'}</strong>.
      </p>

      <p style={{ textIndent: '40px', textAlign: 'justify' }}>
        În conformitate cu prevederile <strong>Legii 169/2026</strong> (Codul amenajării teritoriului, urbanismului și construcțiilor),
        solicit emiterea actului administrativ pentru imobilul situat în:
      </p>
      
      <ul style={{ listStyle: 'none' }}>
        <li>Județul: <strong>{data.imobil?.judet || '....................'}</strong></li>
        <li>Localitatea: <strong>{data.imobil?.localitate || '....................'}</strong></li>
        <li>Adresa: <strong>{data.imobil?.adresa || '........................................................'}</strong></li>
        <li>Nr. Cadastral: <strong>{data.imobil?.nr_cadastral || '....................'}</strong></li>
        <li>Nr. Carte Funciară: <strong>{data.imobil?.nr_carte_funciara || '....................'}</strong></li>
      </ul>

      <p style={{ marginTop: '20px' }}><strong>Scopul solicitării (Lucrări propuse):</strong></p>
      <div style={{ border: '1px solid #000', padding: '10px', minHeight: '100px' }}>
        {data.detalii_solicitare?.scopul_solicitarii || '................................................................................................................'}
      </div>

      {data.tip_formular === 'AUTORIZATIE_REGULARIZARE' && (
        <p style={{ marginTop: '20px' }}>
          <strong>Perioada edificării fără autorizație:</strong> {data.detalii_solicitare?.perioada_edificarii_fara_autorizatie || '....................'}
        </p>
      )}

      <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          Data:<br/>
          <strong>{new Date().toLocaleDateString()}</strong>
        </div>
        <div style={{ textAlign: 'center' }}>
          Semnătura solicitantului,<br/>
          <br/>
          ........................................
        </div>
      </div>
    </div>
  );
}
