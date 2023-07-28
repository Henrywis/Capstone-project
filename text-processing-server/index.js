const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Function to preprocess job post summaries
const preprocessText = (text) => {
  //text preprocessing logic
  // in this case lowercase the text and remove punctuation
  const lowercaseText = text.toLowerCase();
  const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/g;
  const textWithoutPunctuation = lowercaseText.replace(punctuationRegex, '');
  return textWithoutPunctuation;
};

// Endpoint for text preprocessing
app.post('/processText', (req, res) => {
  const { text } = req.body;
  const processedText = preprocessText(text);
  res.json({ processedText });
});

app.listen(port, () => {
  console.log(`Text processing server is running on port ${port}`);
});
