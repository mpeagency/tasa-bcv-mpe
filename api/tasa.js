export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.bcv.org.ve/');
    const html = await response.text();

    // Buscamos el valor en el HTML usando expresión regular
    const match = html.match(/USD<\/strong>\s*<\/td>\s*<td[^>]*>\s*([\d.,]+)/i);

    if (match && match[1]) {
      const rawRate = match[1].replace('.', '').replace(',', '.');
      const rate = parseFloat(rawRate);
      return res.status(200).json({ rate });
    } else {
      return res.status(500).json({ error: 'No se encontró la tasa en el HTML del BCV' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener la tasa', details: error.message });
  }
}
