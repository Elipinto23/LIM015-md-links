const {
  esRutaAbsoluta,
  transformarRutaRelativa,
  existeRuta,
  buscarArchivosMd,
  validarLinks,
  buscarLinksEnArchivo,
} = require("./funciones.js");

mdLinks = function (path, opts = { validate: false }) {
  return new Promise((resolve, reject) => {
    let rutaFinal = path;
    if (!esRutaAbsoluta(rutaFinal)) {
      rutaFinal = transformarRutaRelativa(rutaFinal);
    }

    if (!existeRuta(rutaFinal)) {
      reject("La ruta no existe:  " + rutaFinal);
    }

    let archivosMD = buscarArchivosMd(rutaFinal);
    let arrayLinks = buscarLinksEnArchivo(archivosMD);

    if (arrayLinks.length == 0) {
      reject("Error no hay Links: " + rutaFinal);
    }

    if (opts.validate) {
      arrayLinks = validarLinks(arrayLinks);
      Promise.all(arrayLinks).then((values) => {
        resolve(values);
      });
    } else {
      resolve(arrayLinks);
    }
  });
};

module.exports = mdLinks;
