function generateFieldName(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').substring(0, 30);
}
console.log(generateFieldName("Instituțiaprimăria municipiului / orașului / comunei · primăria de sector · consiliul județean"));
