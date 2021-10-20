const func = require("./index.js");
//funcion mdlinks que resuelve promesas
const mdlinks = (pathDir, { validate }) =>
  new Promise((resolve) => {
    func
      .getMdFiles(pathDir)
      .then((res) => {
        const arrayLinksMd = res.map((file) => {
          return func
            .getLinks(file)
            .then((links) => {
              if (validate) {
                return func.validateLinks(links);
              }
              return links;
            })
            .then((resStatus) => resStatus)
            .catch((err) => err);
        });
        Promise.all(arrayLinksMd).then((objectArr) => resolve(objectArr));

        return arrayLinksMd;
      })
      .catch((err) => console.log(err));
  });

module.exports = { mdlinks };
