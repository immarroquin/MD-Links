const { mdlinks } = require('../src/mdlinks.js');


  describe('mdlinks', () => {

    it('deberia ser una función', () => {
      expect(typeof mdlinks).toBe('function');
    });

    it('deberia retornar array con href, text y path', () => {
      expect(mdlinks('src/mdprueba', { validate : false})).resolves.toEqual([
        [
          {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            path: 'D:\\Documents\\LABORATORIA\\Proyectos\\BOG003-md-links\\src\\mdprueba\\pruebas.md'
          }
        ],
        [
          {
            href: 'https://es.wikipedia.org/wiki/Markdownxxxxx',
            text: 'Markdown',
            path: 'D:\\Documents\\LABORATORIA\\Proyectos\\BOG003-md-links\\src\\mdprueba\\tmp\\ejemplos.md'
          }
        ],
        [
          {
            href: 'https://medium.com/laboratoria-developers/',
            text: 'Recursión o Recursividad - Laboratoria Developers en Medium',
            path: 'D:\\Documents\\LABORATORIA\\Proyectos\\BOG003-md-links\\src\\mdprueba\\tmp\\morefilesmd\\ultimo.md'
          }
        ]
      ]);
    });

    it('deberia retornar array con href, text y path, status y statusCode', async () => {
      expect( await mdlinks('src/mdprueba', { validate : true})).toEqual([
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    path: 'D:\\Documents\\LABORATORIA\\Proyectos\\BOG003-md-links\\src\\mdprueba\\pruebas.md',
    status: 'OK',
    statusCode: 200
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdownxxxxx',
    text: 'Markdown',
    path: 'D:\\Documents\\LABORATORIA\\Proyectos\\BOG003-md-links\\src\\mdprueba\\tmp\\ejemplos.md',
    status: 'FAIL',
    statusCode: 404
  },
  {
    href: 'https://medium.com/laboratoria-developers/',
    text: 'Recursión o Recursividad - Laboratoria Developers en Medium',
    path: 'D:\\Documents\\LABORATORIA\\Proyectos\\BOG003-md-links\\src\\mdprueba\\tmp\\morefilesmd\\ultimo.md',
    status: 'OK',
    statusCode: 200
  }
]);
    });
   


});
