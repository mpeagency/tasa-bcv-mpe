export default async function handler(req, res) {
  try {
    const html = await fetch("https://www.bcv.org.ve/").then(r => r.text());
    const match = html.match(/<strong>(\d{2},\d{2})<\/strong>/);
    if (!match) return res.status(500).send("Tasa no encontrada");

    const tasa = match[1].replace(",", ".");
    res.setHeader("Content-Type", "text/plain");
    res.send(tasa);
  } catch (err) {
    res.status(500).send("Error al obtener la tasa");
  }
}
