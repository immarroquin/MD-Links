//funcion stats para valida total, unique y broken  de los links
const statsValidate = (array, isValidate) => {
  const totalLinks = array.length; //longitud del array 
  const linksU = [...new Set(array.map((link) => link.href))]; //new set para almacenar valores unicos 
  const statsLinks = ` 
    Total: ${totalLinks}
    Unique: ${linksU.length}`;

  const linksB = array.filter((link) => !link.ok); //filtrar del array todos los que son diferentes a OK osea FILE
  if (isValidate) {
    return `${statsLinks}\n    Broken: ${linksB.length}`; //retornara total, unique y broken
  }

  return statsLinks;
};

module.exports = { statsValidate };
