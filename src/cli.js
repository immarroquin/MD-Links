#!/usr/bin/env node
const { program } = require("commander");
const mdLinks = require("./mdlinks.js");
const sv = require("./stats.js");
const pathDir = process.argv[2];
let isValidate = true;

//archivo CLI donde de condicionan los comandos

console.log(` 
                     
                 👩🏻‍💻          WELCOME TO MD-LINKS LIBRARY            👩🏻‍💻
                 
                 
                          💜  DESARROLLADO POR LORENA MARROQUIN  💜           
                                                                                  `);

program
  .version("0.1.0")
  .option("-v, --validate")
  .option("-s, --stats")
  .option("-v -s, --validate --stats")
  .option("-h, --help");

program.parse(process.argv);

const options = program.opts();

if (!options.validate && !options.stats) {
  mdLinks
    .mdlinks(pathDir, { validate: false })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

if (options.validate && !options.stats) {
  mdLinks
    .mdlinks(pathDir, { validate: true })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

if (!options.validate && options.stats) {
  mdLinks
    .mdlinks(pathDir, { validate: false })
    .then((res) => {
      const statUnique = sv.statsValidate(res);
      console.log(statUnique);
    })
    .catch((err) => console.error(err));
}

if (!!options.validate && !!options.stats) {
  mdLinks
    .mdlinks(pathDir, { validate: true })
    .then((res) => {
      console.log(sv.statsValidate(res, isValidate));
    })
    .catch((err) => console.error(err));
}

if (!options.validate && !options.stats && options.help) {
  console.log(`


      -----------------------------------------HELP----------------------------------------
      |  --validate         |  Lista de objetos con href, text, path, status OK/FAIL     |	
      |                     |                                                            |
      |  -- stats           |  Objeto con estadísticas de total links y unique links     |
      |                     |  							         |
      | --validate -- stats |  Objeto con estadística de broken links	                 |
      -------------------------------------------------------------------------------------
            `);
}
