function estadisticas(links) {
  const totalLinks = links.length;
  const linksUnicos = new Set(links.map((link) => link.href));
  return { totalLinks: totalLinks, linksUnicos: linksUnicos };
}

function linksRotos(links) {
  return links.filter((link) => link.status >= 400);
}

module.exports = { estadisticas, linksRotos };
