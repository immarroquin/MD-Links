const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const func = require("./index.js");


const mdlinks = (pathDir) => {
  func.getMdFiles(pathDir).then((res) => {
   // console.log(res);
    const arrayLinksMd = res.map((file) => {
     return func.getLinks(file)
        .then((links) => links)   
        .catch(console.error);
    });
   // console.log(arrayLinksMd);
    Promise.all(arrayLinksMd).then((arrPromise)=> console.log(arrPromise))
  });

};

module.exports = {mdlinks}
