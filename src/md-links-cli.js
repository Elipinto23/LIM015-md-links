#!/usr/bin/env node

const { estadisticas, linksRotos } = require("./stats.js");
const { truncarTexto } = require("./funciones.js");
const mdlinks = require("./md-links.js");

//para que tome a partir del tercer argumento como cero
const [, , ...args] = process.argv;

const textHelp =
  "Para conmenzar puedes usar --stats, --validate o ambos (--stats --validate).\nSi necesitas ayuda, intenta con --help.";

const help = `
  ***************************************************************************************************************************************
  Las opciones son las siguientes:
  '--validate' para validar cada link dentro del archivo, obtiene ruta del archivo, href, mensaje de OK o FAIL, estado del link y texto.
  '--stats' para obtener el total de links y cantidad de links únicos.
  '--validate --stats' al ingresar ambas opciones obtiene el total de links, cantidad de links únicos y links rotos.
  ***************************************************************************************************************************************`;


if(args.length === 0) {
  console.error('Ingrese la ruta de un archivo');
}

if (args.length === 1) {
  mdlinks(args[0], { validate: false })
    .then((res) => {
      res.forEach((link) => {
        console.log(
          `${link.file} ${link.href} ${truncarTexto(link.text, 50)}`
        );
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

if (args.length === 2) {
  switch (args[1]) {
    case "--validate":
      mdlinks(args[0], { validate: true })
        .then((res) => {
          res.forEach((link) => {
            console.log(
              `${link.file} ${link.href} ${link.ok} ${
                link.status
              } ${truncarTexto(link.text, 50)}`
            );
          });
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    case "--stats":
      mdlinks(args[0], { validate: true })
        .then((res) => {
          let estadistica = estadisticas(res);
          console.log(`Total: ${estadistica.totalLinks}`);
          console.log(`Unique: ${estadistica.linksUnicos}`);
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    case "--help":
      console.log(help);
      break;
    default:
      console.log(textHelp);
  }
}

if (args.length === 3) {
  if (
    (args[1] === "--stats" && args[2] === "--validate") ||
    (args[1] === "--validate" && args[2] === "--stats")
  ) {
    mdlinks(args[0], { validate: true })
      .then((res) => {
        let estadistica = estadisticas(res);
        let linksRotosEstadistica = linksRotos(res);
        console.log(`Total: ${estadistica.totalLinks}`);
        console.log(`Unique: ${estadistica.linksUnicos}`);
        console.log(`Broken: ${linksRotosEstadistica.length}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
