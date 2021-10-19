const fs = require("fs");
const fsp = require("fs").promises;
const func = require("./index.js");


const mdlinks = (pathDir, { validate }) => new Promise((resolve) =>{
 func.getMdFiles(pathDir)
  .then((res) => {
  // console.log(res);
  const arrayLinksMd = res.map((file) => {
     return func.getLinks(file)
        .then((links) => {
         if (validate) {
          return  func.validateLinks(links);
          } 
          return links;
        }).then((resStatus) => resStatus)
        .catch((err) => err);
    })
   Promise.all(arrayLinksMd)
   .then((objectArr)=> resolve(objectArr));
  
   return arrayLinksMd; 
  })
  .catch((err) => console.log(err))
  
});

module.exports = {mdlinks}
