const fs = require('fs');
 const fsp = require('fs').promises;
 const path = require("path");
const func = require("./indexDos.js");
const pathDir = process.argv[2];

const mdlinks = (pathDir) => new Promise((resolve, reject) => {
const absolute = func.absolutePath(pathDir);
 func.getMdFiles(absolute)
  
     if (response != null) {
     // console.log(response);
      resolve(response);
    } else {
      //console.log("no se encontraron archivos md");
      reject("no se encontraron archivos md");
     }
  });

    mdlinks(pathDir).then((res) => {
    console.log(res)
    }).catch((err) => {
       //console.log('error promesa', err);
   })
 