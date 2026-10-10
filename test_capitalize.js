function getInstitutionName(localitate) {
  const loc = localitate.toUpperCase();
  const capitalize = (s) => s.split(/[ -]/).map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ').replace(/ /g, (match, offset, str) => str[offset-1] === '-' ? '-' : ' '); // basic try but easier to just map and replace

  const cap = (s) => {
      let res = s.toLowerCase();
      res = res.replace(/(^|[\s-])\S/g, l => l.toUpperCase());
      return res;
  }

  if (loc.startsWith('MUNICIPIUL ')) {
    return 'Primăria Municipiului ' + cap(loc.substring(11));
  } else if (loc.startsWith('ORAS ')) {
    return 'Primăria Orașului ' + cap(loc.substring(5));
  } else if (loc.startsWith('SECTORUL ')) {
    return 'Primăria Sectorului ' + cap(loc.substring(9));
  } else {
    return 'Primăria Comunei ' + cap(loc);
  }
}
console.log(getInstitutionName("MUNICIPIUL ARAD"));
console.log(getInstitutionName("ORAS CHISINEU-CRIS"));
console.log(getInstitutionName("SECTORUL 1"));
console.log(getInstitutionName("SIRIA"));
