const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const cors = require('cors');

const app = express();
const port = 4000; // You can use any port, e.g., 4000

// Use middleware
app.use(cors());       // Allows requests from your React app
app.use(express.json()); // Allows server to read JSON from request body

// Create an endpoint to handle scraping
app.post('/scrape', async (req, res) => {
  const { url } = req.body; // Get the article URL from the request

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // 1. Download the article's HTML
    const articleResponse = await axios.get(url);

    // 2. Create a DOM object from the HTML
    const dom = new JSDOM(articleResponse.data, { url });

    // 3. Use Readability to extract the content
    const article = new Readability(dom.window.document).parse();

    // 4. Send the extracted content back to the client
    if (article && article.textContent) {
      res.json({ content: article.textContent });
    } else {
      res.status(500).json({ error: 'Could not extract article content.' });
    }
  } catch (error) {
    console.error('Error scraping article:', error);
    res.status(500).json({ error: 'Failed to scrape the article.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
