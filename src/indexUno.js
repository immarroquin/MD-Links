const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");

const absolutePath = (filePath) =>
  path.isAbsolute(filePath) ? filePath : path.resolve(filePath);

const isFile = (filePath) => fsp.stat(filePath).then((stats) => stats.isFile());

const isMd = (filePath) => path.extname(filePath) === ".md";

const readDir = (dirPath) =>
  new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject("El directorio no pudo ser leido");
      } else {
        resolve(files);
      }
    });
  });

const readFile = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject("El archivo no pudo ser leido");
      } else {
        resolve(data);
      }
    });
  });

  
const getMdFiles = (pathF) => {
  return isFile(pathF)
    .then((stats) => {
      if (stats) {
        return [pathF];
      } else {
        return readDir(pathF);
      }
    })
     .then((files) => files.filter(isMd))
     .then((filesMd) => Promise.all(filesMd.map(readFile)))
    // .then((contentsMd) => {});
};

module.exports = { getMdFiles, absolutePath};