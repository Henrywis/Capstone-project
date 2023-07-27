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
  
  export default processUserInteractions;