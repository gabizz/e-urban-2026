import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 12 },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  title: { fontSize: 18, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  header: { fontSize: 14, marginBottom: 10, textDecoration: 'underline' },
  row: { flexDirection: 'row', marginBottom: 5 },
  label: { width: 150, fontWeight: 'bold' },
  value: { flex: 1 }
});

export const FormPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Formular: {data.tip_formular}</Text>
      
      <View style={styles.section}>
        <Text style={styles.header}>Date Solicitant</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nume/Denumire:</Text>
          <Text style={styles.value}>{data.solicitant?.nume_denumire}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>CNP/CUI:</Text>
          <Text style={styles.value}>{data.solicitant?.cnp_cui}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Adresa:</Text>
          <Text style={styles.value}>{data.solicitant?.adresa_domiciliu_sediu}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Date Imobil</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Judet / Localitate:</Text>
          <Text style={styles.value}>{data.imobil?.judet} / {data.imobil?.localitate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Adresa:</Text>
          <Text style={styles.value}>{data.imobil?.adresa}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Nr. Cadastral/CF:</Text>
          <Text style={styles.value}>{data.imobil?.nr_cadastral} / {data.imobil?.nr_carte_funciara}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Detalii Solicitare</Text>
        <Text>{data.detalii_solicitare?.scopul_solicitarii}</Text>
        {data.tip_formular === 'AUTORIZATIE_REGULARIZARE' && (
          <View style={styles.row}>
            <Text style={styles.label}>Perioada edificarii:</Text>
            <Text style={styles.value}>{data.detalii_solicitare?.perioada_edificarii_fara_autorizatie}</Text>
          </View>
        )}
      </View>
    </Page>
  </Document>
);
