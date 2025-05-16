import fetch from "node-fetch";

export default async function handler(req, res) {
  const { author, keyword, format, all } = req.query;

  const response = await fetch("https://zenquotes.io/api/quotes");
  const data = await response.json();

  let filtered = data;

  if (author) {
    filtered = filtered.filter(q => q.a.toLowerCase().includes(author.toLowerCase()));
  }

  if (keyword) {
    filtered = filtered.filter(q => q.q.toLowerCase().includes(keyword.toLowerCase()));
  }

  if (all === "true") {
    return res.status(200).json(filtered.map(q => ({ text: q.q, author: q.a })));
  }

  const quote = filtered[Math.floor(Math.random() * filtered.length)] || { q: "No quote found", a: "Unknown" };

  if (format === "text") {
    return res.status(200).send(`${quote.q} - ${quote.a}`);
  }

  res.status(200).json({ text: quote.q, author: quote.a });
}
