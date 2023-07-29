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

      // Check if jobPosts is valid (not null or undefined)
    if (!jobPosts || !Array.isArray(jobPosts) || jobPosts.length === 0) {
        throw new Error("Invalid job posts data for calculating TF-IDF.");
    }
    // Step 1: Build a corpus by concatenating all preprocessed summaries
    const preprocessedTitles = await Promise.all(
        jobPosts.map(async (post) => {

            if (!post.title) {
                console.error(`Job post with slug '${post.slug}' is missing a title.`);
                // Provide a default value or skip the job post if title is missing
                return "";
            }
            const processedTitle= await preprocessText(post.title);
            return processedTitle;
    }));
  
    // Step 2: Tokenization
    const tokens = tokenizeText(preprocessedTitles.join(" "));
  
    // Step 3: Calculate Term Frequency (TF)
    const termFrequency = {};
    preprocessedTitles.forEach((title) => {
        const titleTokens = tokenizeText(title);
        titleTokens.forEach((token) => {
            termFrequency[token] = (termFrequency[token] || 0) + 1;
        });
    });

    // Step 4: Calculate Document Frequency (DF)
    const documentFrequency = {};
    tokens.forEach((token) => {
        documentFrequency[token] = 0;
    });

    jobPosts.forEach((post) => {
        const postTokens = tokenizeText(post.title);
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
        const postTokens = tokenizeText(post.title);
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



  
   // Return the TF-IDF vectorizer function
    const tfidfVectorizer = async (text) => {
        const processedText = await preprocessText(text);
        const tokens = tokenizeText(processedText);
        const tfidfVector = {};

        tokens.forEach((token) => {
            tfidfVector[token] = (termFrequency[token] || 0) * inverseDocumentFrequency[token];
        });

        // Normalize the vector
        const vectorValues = Object.values(tfidfVector);
        const euclideanNorm = Math.sqrt(vectorValues.reduce((sum, value) => sum + value * value, 0));
        for (const token in tfidfVector) {
            tfidfVector[token] /= euclideanNorm;
        }

        return tfidfVector;
    };

    return { jobPosts, tfidfVectorizer };
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



// Function to calculate cosine similarity between two vectors
const calculateCosineSimilarity = (vector1, vector2) => {
    // Check if either vector is undefined or null
    if (!vector1 || !vector2 || typeof vector1 !== "object" || typeof vector2 !== "object") {
      throw new Error("Invalid vectors for calculating cosine similarity.");
    }
  
    const vectorValues1 = Object.values(vector1);
    const vectorValues2 = Object.values(vector2);
  
    // Check if vectorValues1 and vectorValues2 are valid arrays
    if (!Array.isArray(vectorValues1) || !Array.isArray(vectorValues2)) {
      throw new Error("Invalid vectors for calculating cosine similarity.");
    }
  
    // Check if vector lengths are equal
    if (vectorValues1.length !== vectorValues2.length) {
      throw new Error("Vector lengths do not match for calculating cosine similarity.");
    }

    // Calculate the dot product of the two vectors
    const dotProduct = vectorValues1.reduce((sum, value, index) => sum + value * vectorValues2[index], 0);

    // Calculate the Euclidean norms of the vectors
    const vector1Norm = Math.sqrt(vectorValues1.reduce((sum, value) => sum + value * value, 0));
    const vector2Norm = Math.sqrt(vectorValues2.reduce((sum, value) => sum + value * value, 0));

    // Calculate the cosine similarity
    const cosineSimilarity = dotProduct / (vector1Norm * vector2Norm);
    return cosineSimilarity;
  };
  
const buildRankingModel = async (jobPosts, userInteractions) => {
    const { jobPosts: updatedJobPosts, tfidfVectorizer } = await calculateTFIDF(jobPosts);
    // const userProfileVector = createUserProfileVector(userInteractions, tfidfVectorizer);
  
    // Calculate cosine similarity and add to job posts
    const rankedJobPosts = updatedJobPosts.map((post) => ({
      ...post,
      cosineSimilarity: calculateCosineSimilarity(userInteractions, post.tfidf || {}),
    }));
  
    // Sort the job posts based on cosine similarity in descending order
    rankedJobPosts.sort((a, b) => b.cosineSimilarity - a.cosineSimilarity);
  
    return rankedJobPosts;
  };
export { processUserInteractions, preprocessText, calculateTFIDF, buildRankingModel, calculateCosineSimilarity };




