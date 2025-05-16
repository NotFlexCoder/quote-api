# ✨ Quote API

This lightweight Node.js (Next.js) API endpoint fetches and returns inspirational quotes using the [ZenQuotes API](https://zenquotes.io/). Ideal for use in bots, productivity tools, motivational apps, or personal dashboards!

## 🚀 Features

- 📚 Filter by author or keyword.
- 🔄 Returns either a random quote or the full list.
- 📦 Clean JSON or plain text format support.
- ⚡ Built using async/await and `node-fetch`.
- 🔌 Easy to integrate with Telegram bots, widgets, or websites.

## 🛠️ Requirements

- Node.js v14 or higher
- Next.js or any backend that supports API routes (e.g., Vercel, Netlify functions)

## 📡 Usage

1. **Setup**:
   - Create a file under `pages/api/quotes.js` in your Next.js project.
   - Paste the following code:

     ```js
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
     ```

2. **Run Your Server**:
   ```bash
   npm run dev
   ```

3. **Access the API**:
   - Visit: `http://localhost:3000/api/quotes`
   - Add optional query parameters:
     - `author=Einstein`
     - `keyword=life`
     - `format=text`
     - `all=true`

## 🧪 Example Requests

### 🔹 Get a random quote (default)
```
GET /api/quotes
```

### 🔹 Filter by author
```
GET /api/quotes?author=Einstein
```

### 🔹 Filter by keyword
```
GET /api/quotes?keyword=success
```

### 🔹 Get all matched quotes
```
GET /api/quotes?keyword=life&all=true
```

### 🔹 Get in plain text format
```
GET /api/quotes?format=text
```

## 📄 Example JSON Response

```json
{
  "text": "Life is what happens when you're busy making other plans.",
  "author": "John Lennon"
}
```

## ⚠️ Error Handling (Optional)

To make your API more robust, consider wrapping the fetch in a `try-catch` block:

```js
try {
  const response = await fetch("https://zenquotes.io/api/quotes");
  const data = await response.json();
  // ... rest of the code
} catch (error) {
  res.status(500).json({ error: "Failed to fetch quotes" });
}
```

## 📝 License

This project is licensed under the MIT License – see the [LICENSE](https://github.com/NotFlexCoder/quote-api/blob/main/LICENSE) file for details.
