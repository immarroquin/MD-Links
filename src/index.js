const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const axios = require("axios");

//de ruta relativa a absoluta
const absolutePath = (filePath) =>
  path.isAbsolute(filePath) ? filePath : path.resolve(filePath);

// falida es estado retornado true o false en caso de ser archivo con fsp que crea una nueva promesa
const isFile = (filePath) => fsp.stat(filePath).then((stats) => stats.isFile());

// valida que la extencion sea .md
const isMd = (filePath) => path.extname(filePath) === ".md";

// obtener archivos md de forma recursiva
const getMdFiles = (filePath) => {
  let filesArray = [];
  const pathAbsolute = absolutePath(filePath); //la ruta ya resuelta
  return new Promise((resolve) => {
    isFile(pathAbsolute).then((stats) => {
      //validar si la ruta es archivo
      if (stats) {
        if (isMd(pathAbsolute)) {
          //valida que sea .md
          filesArray.push(pathAbsolute); //empuja los archivos al arreglo
          resolve(filesArray);
        } else {
          resolve(filesArray);
        }
      } else {
        //si no es archivo valida que sea directorio
        const arrayPromises = fs.readdirSync(pathAbsolute).map((files) => {
          return getMdFiles(path.join(pathAbsolute, files));
          //llama la funcion uniendo la ruta resulta  con los nuevos archivos que encontro
        });
        Promise.all(arrayPromises).then((responses) => {
          //resulve arreglo
          responses.forEach((response) => {
            if (response.length > 0) {
              filesArray = filesArray.concat(response); //concatena archivos encontrados en directorios al arrray
            }
          });
          resolve(filesArray);
        });
      }
    });
  });
};

// obtener links
const getLinks = (filePath) => {
  return new Promise((resolve, reject) => {
    let arrLinks = [];
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      const links = data.matchAll(/\((http.*?)\)/gm); //links que empiezan por http
      const texts = data.matchAll(/\[(.*?)\]/gm); //primer texto
      //metodo next devuelve un objeto (done) que es booleano (value es undefine si el iterador es true done:true)
      let getLink = links.next();
      let getText = texts.next();
      while (!getLink.done) {
        arrLinks.push({
          href: getLink.value[1],
          text: getText.value[1],
          path: filePath,
        });
        getLink = links.next();
        getText = texts.next();
        resolve(arrLinks);
      }
    });
  });
};
//validar los links
const validateLinks = (validLink) => {
  return new Promise((resolve) => {
    validLink.map((link) => {
      axios
        .get(link.href)
        .then((res) => {
          link.status = "OK";
          link.statusCode = res.status;
        })
        .catch((err) => {
          if (err.response) {
            link.status = "FAIL";
            link.statusCode = err.response.status;
          }
        })
        .then(() => resolve(link));
    });
  });
};

module.exports = { getMdFiles, getLinks, validateLinks };
