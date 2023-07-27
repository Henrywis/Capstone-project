import ReactTextTruncate from "react-text-truncate";

// Function to preprocess job post summaries
const preprocessText = (text) => {
  // Check if the text is undefined or null, return an empty string if true
  if (!text) {
    return "";
  }

  // Convert text to lowercase
  const lowercaseText = text.toLowerCase();

  // Remove punctuation (optional, you can add more punctuation characters if needed)
  const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/g;
  const textWithoutPunctuation = lowercaseText.replace(punctuationRegex, '');

  // Tokenize the text into individual words
  const tokens = textWithoutPunctuation.split(/\s+/);

  // Remove stopwords (you can add more stopwords if needed)
  const stopwords = new Set([
    "a", "the", "and", "or", "of", "on", "this", "we", "were", "is", "not",
    "these", "are", "an", "in", "stop", "to", "it", "I", "that", "had", "for",
    "was", "also", "although", "always", "such", "sufficiently", "you", "will",
    "with", "use", "used", "useful", "there", "then", "strongly", "they", "be",
    "youll", "your", "when", "what", "even", "have", "can", "please", "now",
    "where", "might", "may", "show", "put", "find", "job", "plus", "together",
    "through", "cannot", "cant", "havent", "youve", "give"
  ]);
  const filteredTokens = tokens.filter((token) => !stopwords.has(token));

  // Perform stemming (optional, you can remove this if not needed)
  const stemmedTokens = filteredTokens.map((token) => {
    // Apply your own stemming logic here if required
    return token;
  });

  // Combine the tokens back into a single string
  const processedText = stemmedTokens.join(" ");

  return processedText;
};

// Function to get user interactions from local storage
const processUserInteractions = async (jobPosts) => {
  // Wait until jobPosts data is available
  if (!jobPosts) {
    return {
      likedPosts: [],
      dislikedPosts: [],
      preferredPosts: [],
    };
  }

  const storedUserInteractionsData = JSON.parse(localStorage.getItem("userInteractionsData"));

  const likedPostSlugs = storedUserInteractionsData?.likes || [];
  const dislikedPostSlugs = storedUserInteractionsData?.dislikes || [];
  const preferredPostSlugs = storedUserInteractionsData?.preferred || [];

  // Filter jobPosts based on user interactions
  const likedPosts = jobPosts.filter((post) => likedPostSlugs.includes(post.slug));
  const dislikedPosts = jobPosts.filter((post) => dislikedPostSlugs.includes(post.slug));
  const preferredPosts = jobPosts.filter((post) => preferredPostSlugs.includes(post.slug));

  return { likedPosts, dislikedPosts, preferredPosts };
};

export { processUserInteractions, preprocessText };

