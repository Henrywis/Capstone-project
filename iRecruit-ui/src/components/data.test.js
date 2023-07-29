const { calculateTFIDF, buildRankingModel, calculateCosineSimilarity } = require("./data");

describe("calculateTFIDF", () => {
  it("should calculate the TF-IDF scores for job titles", () => {
    // Mock jobPosts data
    const jobPosts = [
      { title: "Software Engineer" },
      { title: "Sample title for job post 2" },
      { title: "Financial Analyst" },
      { title: "Investment Manager" },
      { title: "Software Developer" },
    ];

    // Call the function and expect the result
    const { jobPosts: updatedJobPosts, tfidfVectorizer } = calculateTFIDF(jobPosts);

    // Add assertions here to validate the results
    expect(updatedJobPosts).toEqual(expect.any(Array));
    expect(updatedJobPosts.length).toBe(jobPosts.length);

    // Making sure each post has the "tfidf" property set
    updatedJobPosts.forEach((post) => {
      expect(post).toHaveProperty("tfidf");
      expect(post.tfidf).toEqual(expect.any(Object));
    });

    // test the tfidfVectorizer function separately (could be opyional)
    const vector = tfidfVectorizer("sample text");
    // Add assertions for the vector result
    expect(vector).toEqual(expect.any(Object));
  });
});

describe("calculateCosineSimilarity", () => {
  it("should calculate the cosine similarity between two vectors", () => {
    // Mock vector data
    const vector1 = { term1: 0.5, term2: 0.3 };
    const vector2 = { term1: 0.2, term2: 0.7 };

    // Call the function and expect the result
    const similarity = calculateCosineSimilarity(vector1, vector2);

    // Add assertions here to validate the result
    // For example, checking if the similarity value is within a certain range
    expect(similarity).toBeCloseTo(0.3855, 4);
  });
});

describe("buildRankingModel", () => {
  it("should build a ranking model based on user interactions", () => {
    // Mock jobPosts data
    const jobPosts = [
      { title: "Software Engineer" },
      { title: "Sample title for job post 2" },
      { title: "Financial Analyst" },
      { title: "Investment Manager" },
      { title: "Software Developer" },
    ];

    // Mock userInteractions data
    const userInteractions = {
      likedPosts: ["Software Engineer", "Investment Manager"],
      dislikedPosts: ["Financial Analyst"],
      preferredPosts: ["Sample title for job post 2"],
    };

    // Call the function and expect the result
    const rankedJobPosts = buildRankingModel(jobPosts, userInteractions);

    // Add assertions here to validate the result
    expect(rankedJobPosts).toEqual(expect.any(Array));
    expect(rankedJobPosts.length).toBe(jobPosts.length);

    // Make sure each post has the "cosineSimilarity" property set
    rankedJobPosts.forEach((post) => {
      expect(post).toHaveProperty("cosineSimilarity");
      expect(typeof post.cosineSimilarity).toBe("number");
    });

    // Sort the rankedJobPosts based on cosine similarity in descending order
    const sortedJobPosts = [...rankedJobPosts];
    sortedJobPosts.sort((a, b) => b.cosineSimilarity - a.cosineSimilarity);

    // Expect that the sortedJobPosts matches the rankedJobPosts
    expect(rankedJobPosts).toEqual(sortedJobPosts);
  });
});
