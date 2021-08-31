#!/usr/bin/env node

const { estadisticas, linksRotos } = require("./stats.js");
const { truncarTexto } = require("./funciones.js");
const mdlinks = require("./md-links.js");

const textHelp =
  "Para conmenzar puedes usar --stats, --validate o ambos (--stats --validate).\nSi necesitas ayuda, intenta con --help.";

const help = `
  ***************************************************************************************************************************************
  Las opciones son las siguientes:
  '--validate' para validar cada link dentro del archivo, obtiene ruta del archivo, href, mensaje de OK o FAIL, estado del link y texto.
  '--stats' para obtener el total de links y cantidad de links únicos.
  '--validate --stats' al ingresar ambas opciones obtiene el total de links, cantidad de links únicos y links rotos.
  ***************************************************************************************************************************************`;

if (process.argv.length === 1) {
  mdlinks(process.argv[0], { validate: false })
    .then((res) => {
      res.forEach((link) => {
        console.log(
          `${link.file} ${link.href} ${truncarTexto(link.text, 50)}\n`
        );
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

if (process.argv.length === 2) {
  switch (argv[1]) {
    case "--validate":
      mdlinks(process.argv[0], { validate: true })
        .then((res) => {
          res.forEach((link) => {
            console.log(
              `${link.file} ${link.href} ${link.ok} ${
                link.status
              } ${truncarTexto(link.text, 50)}\n`
            );
          });
        })
        .catch((err) => {
          console.error(err);
        });
      break;
    case "--stats":
      mdlinks(process.argv[0], { validate: true })
        .then((res) => {
          let estadistica = estadisticas(res);
          console.log(`Total: ${estadistica.totalLinks}\n`);
          console.log(`Unique: ${estadistica.linksUnicos}\n`);
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

if (process.argv.length === 3) {
  if (
    (process.args[1] === "--stats" && process.args[2] === "--validate") ||
    (process.args[1] === "--validate" && process.args[2] === "--stats")
  ) {
    mdlinks(process.argv[0], { validate: true })
      .then((res) => {
        let estadistica = estadisticas(res);
        let linksRotosEstadistica = linksRotos(res);
        console.log(`Total: ${estadistica.totalLinks}\n`);
        console.log(`Unique: ${estadistica.linksUnicos}\n`);
        console.log(`Broken: ${linksRotosEstadistica.length}\n`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
