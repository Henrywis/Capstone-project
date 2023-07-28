const apiUrl = "http://localhost:3001/processText";
//////////////////////////////////////////

//Since I cant use "natural" library, I will manually filter these words
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
    const tokens = processedText.match(/\b\w+\b/g);

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
    const inputText = "This is a sample, text, for preprocessing, I wILL + inTentionALy + use mixed casEs tO teSt!, addING more randOM - words HerE to Test onLy stoPWOrds Now & puctuations like , ' and can I say . ";
    const processedText = await preprocessText(inputText);
    console.log("Processed Text:", processedText);
  };
  
  // Call the testPreprocess function to test the text preprocessing
  testPreprocess();


const tokenizeText = (text) => {
    // Custom tokenization logic to split text into words
    return text.match(/\b\w+\b/g);
  };
// Function to calculate TF-IDF scores for job post summaries
const calculateTFIDF = async (jobPosts) => {
    // Step 1: Build a corpus by concatenating all preprocessed summaries
    const preprocessedSummaries = await Promise.all(
        jobPosts.map(async (post) => {
            const processedSummary = await preprocessText(post.summary);
            return processedSummary;
    }));
  
    // Step 2: Tokenization
    const tokens = tokenizeText(preprocessedSummaries.join(" "));
  
    // Step 3: Calculate Term Frequency (TF)
    const termFrequency = {};
    preprocessedSummaries.forEach((summary) => {
        const summaryTokens = tokenizeText(summary);
        summaryTokens.forEach((token) => {
            termFrequency[token] = (termFrequency[token] || 0) + 1;
        });
    });

    // Step 4: Calculate Document Frequency (DF)
    const documentFrequency = {};
    tokens.forEach((token) => {
        documentFrequency[token] = 0;
    });

    jobPosts.forEach((post) => {
        const postTokens = tokenizeText(post.summary);
        const uniqueTokens = new Set(postTokens);
        uniqueTokens.forEach((token) => {
            documentFrequency[token] = (documentFrequency[token] || 0) + 1;
        });
    });
  
    // Step 5: Calculate Inverse Document Frequency (IDF)
    const totalDocuments = jobPosts.length;
    const inverseDocumentFrequency = {};
    Object.keys(documentFrequency).forEach((token) => {
        // Ensure that no token has a count of zero
        documentFrequency[token] = Math.max(documentFrequency[token], 1);
        inverseDocumentFrequency[token] = Math.log(totalDocuments / documentFrequency[token]);
    });
  
    // Step 6: Calculate TF-IDF scores
    const tfidfScores = jobPosts.map((post) => {
        const postTokens = tokenizeText(post.summary);
        const tfidfVector = {};
        postTokens.forEach((token) => {
            tfidfVector[token] = (termFrequency[token] || 0) * inverseDocumentFrequency[token];
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

//////////////////////////

// Test the calculateTFIDF function
const testTFIDF = async () => {
    const jobPosts = [
      { summary: "We are hiring software engineers" },
      { summary: "Another sample summary for job post 2" },
      { summary: "Your work matters and is essential to the evolution growth and success of our businessGROWTH" },
      { summary: "Continually learn about investments and the financial markets to address the individual clients investment needs" },
      { summary: "We are hiring software developers" },
    ];
    const postsWithTFIDF = await calculateTFIDF(jobPosts);
    console.log("Job Posts with TF-IDF:", postsWithTFIDF);
  };
  
  // Call the testTFIDF function to test the TF-IDF calculation
  testTFIDF();
/////////////////////////
  
  export { processUserInteractions, preprocessText, calculateTFIDF };

