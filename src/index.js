const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
//const fse = require("fs-extra");
const axios = require("axios");

//de ruta relativa a absoluta
const absolutePath = (filePath) =>
  path.isAbsolute(filePath) ? filePath : path.resolve(filePath);

const isFile = (filePath) => fsp.stat(filePath).then((stats) => stats.isFile());
// // /isFile('../BOG003-md-links').then((el) => console.log(el, 'estado de isfile'));
// // isFile('README.md').then((el) => console.log(el, 'arcivo isfile'));

const isMd = (filePath) => path.extname(filePath) === ".md";

// obtener archivos md
const getMdFiles = (filePath) => {
  // console.log(filePath);
  let filesArray = [];
  const pathAbsolute = absolutePath(filePath);
  return new Promise((resolve) => {
    isFile(pathAbsolute).then((stats) => {
      // console.log("soy un archivo " + stats);
      if (stats) {
        if (isMd(pathAbsolute)) {
          // console.log(pathAbsolute + " SOY MD");
          filesArray.push(pathAbsolute);

          resolve(filesArray);
        } else {
          resolve(filesArray);
        }
      } else {
        const arrayPromises = fs.readdirSync(pathAbsolute).map((files) => {
          return getMdFiles(path.join(pathAbsolute, files));
        });
        //console.log(arrayPromises);
        Promise.all(arrayPromises)
        .then((responses) => {
          //console.log(responses);
          responses.forEach((response) => {
            if (response.length > 0) {
              filesArray = filesArray.concat(response);
              // console.log(filesArray);
            }
          });
          //console.log(filesArray, 'soy el array final');
          resolve(filesArray);
        });
      }
    });
  });
};

const getLinks = (filePath) => {
  return new Promise((resolve, reject) => {
    let arrLinks = [];
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      const links = data.matchAll(/\((http.*?)\)/gm); //links que empiezan por http.
      const texts = data.matchAll(/\[(.*?)\]/gm); //primer texto
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
        //console.log(arrLinks);
        resolve(arrLinks);
      }
    });
  });
};

const validateLinks = (validLink) => {
 return new Promise((resolve) => {
    validLink.map((link) => {
      axios
        .get(link.href)
        .then((res) => {
          link.status = "OK";
          link.statusCode = res.status;
          //console.log(res, "soy estatus");
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
