const {
  esRutaAbsoluta,
  transformarRutaRelativa,
  existeRuta,
  buscarArchivosMd,
  esArchivosMd,
  esDirectorio,
  buscarLinksEnArchivo,
  validarLinks,
  truncarTexto,
} = require("../src/funciones");
const mdLinks = require("../src/md-links.js");
//const = md_links_cli= require("../src/md-links-cli");
const { estadisticas, linksRotos } = require("../src/stats");

const links = [
  {
    href: "http://google.com/",
    statusText: "ok",
  },
  {
    href: "http://algo.com/2/3/",
    status: 200,
    statusText: "ok",
  },
  {
    href: "http://algo.com/2/3/",
    status: 200,
    statusText: "ok",
  },
  {
    href: "http://www.midominio.es/doc-nuevo.html",
    status: 404,
    statusText: "fail",
  },
  {
    href: "https://otra-cosa.net/algun-doc.html",
    status: 404,
    statusText: "fail",
  },
];

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

describe("esRutaAbsoluta", () => {
  it("Es una funcion", () => {
    expect(typeof esRutaAbsoluta).toBe("function");
  });
  it("si es absoluta", () => {
    expect(
      esRutaAbsoluta(
        "C://Users//elizabeth//Documents//GitHub//LIM015-md-links//prueba"
      )
    ).toEqual(
      "C://Users//elizabeth//Documents//GitHub//LIM015-md-links//prueba"
    );
  });
});

describe("transformarRutaRelativa", () => {
  it("Es una funcion", () => {
    expect(typeof transformarRutaRelativa).toBe("function");
  });
  it("si no es absoluta", () => {
    expect(transformarRutaRelativa("prueba")).toEqual(
      "C:\\Users\\elizabeth\\Documents\\GitHub\\LIM015-md-links\\prueba"
    );
  });
});

describe("existeRuta", () => {
  it("Es una funcion", () => {
    expect(typeof existeRuta).toBe("function");
  });
  it("si no existe", () => {
    expect(existeRuta("movie")).toBe(false);
  });
});

describe("buscarArchivosMd", () => {
  it("Es una funcion", () => {
    expect(typeof buscarArchivosMd).toBe("function");
  });

  it("si un archivoMd", () => {
    expect(
      buscarArchivosMd(
        "C:\\Users\\elizabeth\\Documents\\GitHub\\LIM015-md-links\\prueba"
      )
    ).toEqual([
      "C:\\Users\\elizabeth\\Documents\\GitHub\\LIM015-md-links\\prueba\\enlaces.md",
      "C:\\Users\\elizabeth\\Documents\\GitHub\\LIM015-md-links\\prueba\\gm\\gm1.md",
      "C:\\Users\\elizabeth\\Documents\\GitHub\\LIM015-md-links\\prueba\\gm2\\gm2.md",
    ]);
  });
});

describe("esArchivosMd", () => {
  it("Es una funcion", () => {
    expect(typeof esArchivosMd).toBe("function");
  });

  it("si es archivoMd", () => {
    expect(
      esArchivosMd(
        "C://Users//elizabeth//Documents//GitHub//LIM015-md-links//prueba"
      )
    ).toBe(false);
  });
});

describe("esDirectorio", () => {
  it("Es una funcion", () => {
    expect(typeof esDirectorio).toBe("function");
  });
  it("si es Directorio", () => {
    expect(
      esDirectorio(
        "C://Users//elizabeth//Documents//GitHub//LIM015-md-links//prueba"
      )
    ).toBe(true);
  });
});

describe("buscarLinksEnArchivo", () => {
  const ruta = [
    {
      href: "https://github.com/Laboratoria/LIM015-data-lovers",
      text: "hola",
      file: "C:UserselizabethDocumentsGitHubLIM015-md-linkspruebagmgm1.md",
    },
  ];
  it("Es una funcion", () => {
    expect(typeof buscarLinksEnArchivo).toBe("function");
  });

  //     it('si tiene links', () => {
  //     expect(buscarLinksEnArchivo("C:\Users\elizabeth\Documents\GitHub\LIM015-md-links\prueba\gm\gm1.md")).toEqual(ruta);
  //  });
});

describe(" truncarTexto", () => {
  it("Es una funcion", () => {
    expect(typeof truncarTexto).toBe("function");
  });
});

describe("validarLinks", () => {
  it("Es una funcion", () => {
    expect(typeof validarLinks).toBe("function");
  });
  // const arrayOk= [{
  //   file: "C:\\Users\\elizabeth\\Documents\\GitHub\\LIM015-md-links\\prueba\\gm\\gm1.md",
  //   href: "https://github.com/Laboratoria/LIM015-data-lovers",
  //   text: "hola",
  // }]
  // const statusOk = [
  //   {
  //     ok: "ok",
  //   },
  // ];
  // test("deberia retornar status 200 y ok", () => {
  //   return validarLinks(arrayOk).then((response) => {
  //     expect(response).to("ok");
  //   });
  // });

});

describe("estadisticas", () => {
  it("Es una funcion", () => {
    expect(typeof estadisticas).toBe("function");
  });
  it("las estadisticas", () => {
    expect(estadisticas(links)).toEqual({ linksUnicos: 4, totalLinks: 5 });
  });
});

describe("linksRotos", () => {
  it("Es una funcion", () => {
    expect(typeof linksRotos).toBe("function");
  });
  it("linksRotos", () => {
    expect(linksRotos(links)).toEqual([
      {
        href: "http://www.midominio.es/doc-nuevo.html",
        status: 404,
        statusText: "fail",
      },
      {
        href: "https://otra-cosa.net/algun-doc.html",
        status: 404,
        statusText: "fail",
      },
    ]);
  });
});

describe("mdLinks", () => {
  it("Es una funcion", () => {
    expect(typeof mdLinks).toBe("function");
  });
  const ruta = "C:\\Users\\elizabeth\\Documents\\GitHub\\LIM015-md-links\\prueba\\gm\\gm1.md";
  const resultado = [
    {
      href: "https://github.com/Laboratoria/LIM015-data-lovers",
      text: "hola",
      file: "C:\\Users\\elizabeth\\Documents\\GitHub\\LIM015-md-links\\prueba\\gm\\gm1.md",
    },
  ];
  test("deberia resolverse la promesa de validate", () => {
    return mdLinks(ruta, { validate: false }).then((response) => {
      expect(response).toEqual(resultado);
    });
  });
  const resultado2 = [
    {
      file: "C:\\Users\\elizabeth\\Documents\\GitHub\\LIM015-md-links\\prueba\\gm\\gm1.md",
      href: "https://github.com/Laboratoria/LIM015-data-lovers",
      ok: "ok",
      status: 200,
      text: "hola",
    },
  ];
  test("deberia resolverse la promesa de validate", () => {
    return mdLinks(ruta, { validate: true }).then((response) => {
      expect(response).toEqual(resultado2);
    });
  });
});
