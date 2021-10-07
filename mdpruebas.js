//console.log('hola mundo');

const fs = require('fs')
const fsp = require('fs').promises;

const {validFile} = require('./src/cli.js')


fs.readFile('README-prueba.md', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
});

const files = fs.readdir('../BOG003-MD-LINKS', (err, files) => {
    if (err) {
        console.error(err)
        return
      }
      console.log(files)

});

const path = require('path')

let file = path.extname('README-prueba.md')
console.log(file);
console.log(path.resolve('test'));

/*let fileExists = fs.existsSync('README-prueba.md');
if (fileExists) {

  console.log("hello.txt exists:", fileExists);
} else{
  console.log("hello.txt exists:", fileExists);
}*/


validFile('README-prueba.mdx')
.then(() => console.log('true'))
.catch(() => console.error('false'));

/*const pathDir = process.argv[2]
let relativeAbsolutePath = path.isAbsolute(pathDir);
console.log(relativeAbsolutePath);
if (relativeAbsolutePath) {
  console.log('esta en una ruta absoluta:', relativeAbsolutePath)
} else {
  console.log('ruta relativa a absoluta:', path.resolve(pathDir));
}*/
