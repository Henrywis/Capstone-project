// import ReactTextTruncate from "react-text-truncate";
// import natural from "natural";

// // Function to preprocess job post summaries
// const preprocessText = (text) => {
//     // Check if the text is undefined or null, return an empty string if true
//     if (!text) {
//         return "";
//     }

//     // Convert text to lowercase
//     const lowercaseText = text.toLowerCase();

//     // Remove punctuation
//     const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/g;
//     const textWithoutPunctuation = lowercaseText.replace(punctuationRegex, '');

//     // Tokenize the text into individual words
//     const tokens = textWithoutPunctuation.split(/\s+/);

//     // Remove stopwords
//     const stopwords = new Set([
//         "a", "the", "and", "or", "of", "on", "this", "we", "were", "is", "not",
//         "these", "are", "an", "in", "stop", "to", "it", "I", "that", "had", "for",
//         "was", "also", "although", "always", "such", "sufficiently", "you", "will",
//         "with", "use", "used", "useful", "there", "then", "strongly", "they", "be",
//         "youll", "your", "when", "what", "even", "have", "can", "please", "now",
//         "where", "might", "may", "show", "put", "find", "job", "plus", "together",
//         "through", "cannot", "cant", "havent", "youve", "give"
//     ]);
//     const filteredTokens = tokens.filter((token) => !stopwords.has(token));

//     // Performing stemming
//     const stemmedTokens = filteredTokens.map((token) => {
//         //stemming logic
//         return token;
//     });

//     // Combine the tokens back into a single string
//     const processedText = stemmedTokens.join(" ");

//     return processedText;
// };

// // Function to calculate TF-IDF scores for job post summaries
// const calculateTFIDF = (jobPosts) => {
//     // Step 1: Build a corpus by concatenating all preprocessed summaries
//     const corpus = jobPosts.map((post) => preprocessText(post.summary)).join(" ");

//     // Step 2: Tokenization
//     const tokenizer = new natural.WordTokenizer();
//     const tokens = tokenizer.tokenize(corpus);

//     // Step 3: Calculate Term Frequency (TF)
//     const termFrequency = {};
//     tokens.forEach((token) => {
//         termFrequency[token] = (termFrequency[token] || 0) + 1;
//     });

//     // Step 4: Calculate Document Frequency (DF)
//     const documentFrequency = {};
//     jobPosts.forEach((post) => {
//         const postTokens = tokenizer.tokenize(preprocessText(post.summary));
//         const uniqueTokens = new Set(postTokens);
//         uniqueTokens.forEach((token) => {
//             documentFrequency[token] = (documentFrequency[token] || 0) + 1;
//         });
//     });

//     // Step 5: Calculate Inverse Document Frequency (IDF)
//     const totalDocuments = jobPosts.length;
//     const inverseDocumentFrequency = {};
//     Object.keys(documentFrequency).forEach((token) => {
//         inverseDocumentFrequency[token] = Math.log(totalDocuments / (documentFrequency[token] + 1));
//     });

//     // Step 6: Calculate TF-IDF scores
//     const tfidfScores = jobPosts.map((post) => {
//         const postTokens = tokenizer.tokenize(preprocessText(post.summary));
//         const tfidfVector = {};
//         postTokens.forEach((token) => {
//             tfidfVector[token] = termFrequency[token] * inverseDocumentFrequency[token];
//         });
//         return tfidfVector;
//     });

//     // Step 7: Normalize the TF-IDF scores
//     tfidfScores.forEach((tfidfVector) => {
//         const vectorValues = Object.values(tfidfVector);
//         const euclideanNorm = Math.sqrt(vectorValues.reduce((sum, value) => sum + value * value, 0));
//         Object.keys(tfidfVector).forEach((token) => {
//             tfidfVector[token] /= euclideanNorm;
//         });
//     });

//     // Step 8: Store the TF-IDF scores for each job post
//     jobPosts.forEach((post, index) => {
//         post.tfidf = tfidfScores[index];
//     });

//     return jobPosts;
// };



// // Function to get user interactions from local storage
// const processUserInteractions = async (jobPosts) => {
//     // Wait until jobPosts data is available
//     if (!jobPosts) {
//         return {
//             likedPosts: [],
//             dislikedPosts: [],
//             preferredPosts: [],
//         };
//     }

//     const storedUserInteractionsData = JSON.parse(localStorage.getItem("userInteractionsData"));

//     const likedPostSlugs = storedUserInteractionsData?.likes || [];
//     const dislikedPostSlugs = storedUserInteractionsData?.dislikes || [];
//     const preferredPostSlugs = storedUserInteractionsData?.preferred || [];

//     // Filter jobPosts based on user interactions
//     const likedPosts = jobPosts.filter((post) => likedPostSlugs.includes(post.slug));
//     const dislikedPosts = jobPosts.filter((post) => dislikedPostSlugs.includes(post.slug));
//     const preferredPosts = jobPosts.filter((post) => preferredPostSlugs.includes(post.slug));

//     return { likedPosts, dislikedPosts, preferredPosts };
// };

// export { processUserInteractions, preprocessText, calculateTFIDF };












// import { preprocessText } from "../../../text-processing-server";

// const apiUrl = "http://localhost:3001/processText";

// Function to preprocess job post summaries

// const preprocessText = (text) => {
//     if (!text) {
//       return '';
//     }
  
//     // Add your text preprocessing logic here
//     // For example, lowercase the text and remove punctuation
//     const lowercaseText = text.toLowerCase();
//     const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/g;
//     const textWithoutPunctuation = lowercaseText.replace(punctuationRegex, '');
//     return textWithoutPunctuation;
//   };

const apiUrl = "http://localhost:3001/processText";
//////////////////////////////////////////

//Since I cant use "natural" library, I will manually filter these words
//Punctuations that are together with words dont filter yet
const stopwords = [
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "youll", "may", 
    "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "job", 
    "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "together", 
    "themselves", "what", "which", "who", "whom", "this", "that", "these", "those",
    "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
    "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if",
    "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about",
    "against", "between", "into", "through", "during", "before", "after", "above", "below",
    "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further",
    "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both",
    "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only",
    "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don",
    "should", "now", ",", ".", "-", "!", "(", ")", "'", "&", "/"
  ];

/////////////////////////////////////////
const preprocessText = async (text) => {
  if (!text) {
    return '';
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Error preprocessing text");
    }

    const data = await response.json();
    ////////////////////////////////////

    // Convert the processedText to lowercase
    let processedText = data.processedText.toLowerCase();

    // Remove punctuation
    const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/g;
    processedText = processedText.replace(punctuationRegex, '');

    // Tokenize the text by splitting it into words
    const tokens = processedText.split(/\s+/);

    // Remove stopwords from the tokens
    const textWithoutStopwords = tokens.filter((token) => !stopwords.includes(token));

    // Join the processed tokens back into a string
    const finalProcessedText = textWithoutStopwords.join(' ');

    return finalProcessedText;

    /////////////////////////////////////

    // return data.processedText;
  } catch (error) {
    console.error("Error preprocessing text:", error);
    throw error;
  }
};


// Test the preprocessText function
const testPreprocess = async () => {
    const inputText = "This is a sample, text, for preprocessing, I wILL inTentionALy use mixed casEs tO teSt!, addING more randOM - words HerE to Test onLy stoPWOrds Now & puctuations like , ' and can I say . ";
    const processedText = await preprocessText(inputText);
    console.log("Processed Text:", processedText);
  };
  
  // Call the testPreprocess function to test the text preprocessing
  testPreprocess();


// Function to calculate TF-IDF scores for job post summaries
const calculateTFIDF = async (jobPosts) => {
    // Step 1: Build a corpus by concatenating all preprocessed summaries
    const preprocessedSummaries = await Promise.all(jobPosts.map(async (post) => {
        const processedSummary = await preprocessText(post.summary);
        return processedSummary;
    }));

    const corpus = preprocessedSummaries.join(" ");
    // Step 2: Tokenization
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(corpus);

    // Step 3: Calculate Term Frequency (TF)
    const termFrequency = {};
    tokens.forEach((token) => {
        termFrequency[token] = (termFrequency[token] || 0) + 1;
    });

    // Step 4: Calculate Document Frequency (DF)
    const documentFrequency = {};
    jobPosts.forEach((post) => {
        const postTokens = tokenizer.tokenize(post.summary);
        const uniqueTokens = new Set(postTokens);
        uniqueTokens.forEach((token) => {
            documentFrequency[token] = (documentFrequency[token] || 0) + 1;
        });
    });

    // Step 5: Calculate Inverse Document Frequency (IDF)
    const totalDocuments = jobPosts.length;
    const inverseDocumentFrequency = {};
    Object.keys(documentFrequency).forEach((token) => {
        inverseDocumentFrequency[token] = Math.log(totalDocuments / (documentFrequency[token] + 1));
    });

    // Step 6: Calculate TF-IDF scores
    const tfidfScores = jobPosts.map((post) => {
        const postTokens = tokenizer.tokenize(post.summary);
        const tfidfVector = {};
        postTokens.forEach((token) => {
            tfidfVector[token] = termFrequency[token] * inverseDocumentFrequency[token];
        });
        return tfidfVector;
    });

    // Step 7: Normalize the TF-IDF scores
    tfidfScores.forEach((tfidfVector) => {
        const vectorValues = Object.values(tfidfVector);
        const euclideanNorm = Math.sqrt(vectorValues.reduce((sum, value) => sum + value * value, 0));
        Object.keys(tfidfVector).forEach((token) => {
            tfidfVector[token] /= euclideanNorm;
        });
    });

    // Step 8: Store the TF-IDF scores for each job post
    jobPosts.forEach((post, index) => {
        post.tfidf = tfidfScores[index];
    });

    return jobPosts;
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

export { processUserInteractions, preprocessText, calculateTFIDF };
















// import ReactTextTruncate from "react-text-truncate";
// import natural from "natural";

// const natural = require('natural');



// const apiUrl = "http://localhost:3001/processText";

// // Function to preprocess job post summaries
// const preprocessText = async (text) => {
//   if (!text) {
//     return '';
//   }
//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ text }),
//     });

//     if (!response.ok) {
//       throw new Error("Error preprocessing text");
//     }

//     const data = await response.json();
//     return data.processedText;
//   } catch (error) {
//     console.error("Error preprocessing text:", error);
//     throw error;
//   }
// };


// // Test the preprocessText function
// const testPreprocess = async () => {
//     const inputText = "This is a sample, text, for preprocessing!";
//     const processedText = await preprocessText(inputText);
//     console.log("Processed Text:", processedText);
//   };
  
//   // Call the testPreprocess function to test the text preprocessing
//   testPreprocess();


// // Function to calculate TF-IDF scores for job post summaries
// const calculateTFIDF = async (jobPosts) => {
//     // Step 1: Build a corpus by concatenating all preprocessed summaries
//     const preprocessedSummaries = await Promise.all(jobPosts.map(async (post) => {
//         const processedSummary = await preprocessText(post.summary);
//         return processedSummary;
//     }));

//     const corpus = preprocessedSummaries.join(" ");
//     // Step 2: Tokenization
//     const tokenizer = new natural.WordTokenizer();
//     const tokens = tokenizer.tokenize(corpus);

//     // Step 3: Calculate Term Frequency (TF)
//     const termFrequency = {};
//     tokens.forEach((token) => {
//         termFrequency[token] = (termFrequency[token] || 0) + 1;
//     });

//     // Step 4: Calculate Document Frequency (DF)
//     const documentFrequency = {};
//     jobPosts.forEach((post) => {
//         const postTokens = tokenizer.tokenize(preprocessText(post.summary));
//         const uniqueTokens = new Set(postTokens);
//         uniqueTokens.forEach((token) => {
//             documentFrequency[token] = (documentFrequency[token] || 0) + 1;
//         });
//     });

//     // Step 5: Calculate Inverse Document Frequency (IDF)
//     const totalDocuments = jobPosts.length;
//     const inverseDocumentFrequency = {};
//     Object.keys(documentFrequency).forEach((token) => {
//         inverseDocumentFrequency[token] = Math.log(totalDocuments / (documentFrequency[token] + 1));
//     });

//     // Step 6: Calculate TF-IDF scores
//     const tfidfScores = jobPosts.map((post) => {
//         const postTokens = tokenizer.tokenize(preprocessText(post.summary));
//         const tfidfVector = {};
//         postTokens.forEach((token) => {
//             tfidfVector[token] = termFrequency[token] * inverseDocumentFrequency[token];
//         });
//         return tfidfVector;
//     });

//     // Step 7: Normalize the TF-IDF scores
//     tfidfScores.forEach((tfidfVector) => {
//         const vectorValues = Object.values(tfidfVector);
//         const euclideanNorm = Math.sqrt(vectorValues.reduce((sum, value) => sum + value * value, 0));
//         Object.keys(tfidfVector).forEach((token) => {
//             tfidfVector[token] /= euclideanNorm;
//         });
//     });

//     // Step 8: Store the TF-IDF scores for each job post
//     jobPosts.forEach((post, index) => {
//         post.tfidf = tfidfScores[index];
//     });

//     return jobPosts;
// };



// // Function to get user interactions from local storage
// const processUserInteractions = async (jobPosts) => {
//     // Wait until jobPosts data is available
//     if (!jobPosts) {
//         return {
//             likedPosts: [],
//             dislikedPosts: [],
//             preferredPosts: [],
//         };
//     }

//     const storedUserInteractionsData = JSON.parse(localStorage.getItem("userInteractionsData"));

//     const likedPostSlugs = storedUserInteractionsData?.likes || [];
//     const dislikedPostSlugs = storedUserInteractionsData?.dislikes || [];
//     const preferredPostSlugs = storedUserInteractionsData?.preferred || [];

//     // Filter jobPosts based on user interactions
//     const likedPosts = jobPosts.filter((post) => likedPostSlugs.includes(post.slug));
//     const dislikedPosts = jobPosts.filter((post) => dislikedPostSlugs.includes(post.slug));
//     const preferredPosts = jobPosts.filter((post) => preferredPostSlugs.includes(post.slug));

//     return { likedPosts, dislikedPosts, preferredPosts };
// };

// export { processUserInteractions, preprocessText, calculateTFIDF };

