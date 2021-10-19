
const statsValidate = ((array, isValidate) => { 
    const totalLinks = array.length
    const linksU = [...new Set(array.map((link) => link.href))];
    //console.log(linksU);
    const statsLinks = `
    Total: ${totalLinks}
    Unique: ${linksU.length}`;
   
    const linksB = array.filter((link) => !link.ok);
    if (isValidate) {
        return `${statsLinks}\n    Broken: ${linksB.length}`;
      }
    
    return statsLinks;

});


module.exports = {statsValidate}
