// const express = require('express');
// const cors = require('cors');
// const natural = require('natural');

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// const preprocessText = (text) => {
//   try {
//     // Convert text to lowercase
//     const lowercaseText = text.toLowerCase();

//     // Tokenize the text into individual words
//     const tokenizer = new natural.WordTokenizer();
//     const tokens = tokenizer.tokenize(lowercaseText);

//     // Remove stopwords
//     const stopwords = new Set(["a", "the", "and", "or", "of", "on", "this", "we", "were", "is", "not", "these", "are", "an", "in", "stop", "to", "it", "I", "that", "had", "for", "was", "also", "although", "always", "such", "sufficiently", "you", "will", "with", "use", "used", "useful", "there", "then", "strongly", "they", "be", "youll", "your", "when", "what", "even", "have", "can", "please", "now", "where", "might", "may", "show", "put", "find", "job", "plus", "together", "through", "cannot", "cant", "havent", "youve", "give"]);
//     const filteredTokens = tokens.filter((token) => !stopwords.has(token));

//     // Combine the tokens back into a single string
//     const processedText = filteredTokens.join(" ");

//     return processedText;
//   } catch (error) {
//     console.error("Error preprocessing text:", error);
//     throw error;
//   }
// };

// app.post('/processText', (req, res) => {
//   const { text } = req.body;

//   try {
//     // Perform the text preprocessing
//     const processedText = preprocessText(text);

//     res.json({ processedText });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to preprocess text" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Text processing server is running on port ${port}`);
// });















// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// // Function to remove punctuation from text
// const removePunctuation = (text) => {
//   const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/g;
//   return text.replace(punctuationRegex, '');
// };

// // Endpoint for text preprocessing
// app.post('/processText', (req, res) => {
//   const { text } = req.body;
//   const textWithoutPunctuation = removePunctuation(text);
//   const processedText = textWithoutPunctuation.toLowerCase(); // Lowercase the text
//   res.json({ processedText });
// });

// app.listen(port, () => {
//   console.log(`Text processing server is running on port ${port}`);
// });












const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Function to preprocess job post summaries
const preprocessText = (text) => {
  // Add your text preprocessing logic here
  // For example, lowercase the text and remove punctuation
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

// export { preprocessText };