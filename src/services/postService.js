import api from "./api"
import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000/api/posts'; // Sostituisci con l'URL di base della tua API


/**
 * Creates a new post (business users only)
 * @param {FormData} data - FormData object containing post data
 * @param {string} data.userId - ID of the business user creating the post
 * @param {string} data.title - Post title
 * @param {string} data.content - Post content
 * @param {string} data.place - One of: MILANO, BERGAMO, ROMA, TORINO, CAGLIARI, PALERMO
 * @param {File} [data.image] - Optional post image file
 * @returns {Promise<Object>} Created post object
 */
export const createPost = (data) => api.post("/api/posts", data)

/**
 * Updates an existing post (business users only)
 * @param {string} postId - ID of the post to update
 * @param {FormData} data - FormData object containing updated post data
 * @param {string} [data.title] - Updated post title
 * @param {string} [data.content] - Updated post content
 * @param {string} [data.place] - Updated place
 * @param {File} [data.image] - Optional new post image file
 * @returns {Promise<Object>} Updated post object
 */
export const updatePost = (postId, data) => api.put(`/api/posts/${postId}`, data)

export const deletePost = async (postId) => {
    try {
      const response = await api.delete(`/api/posts/${postId}`);
      // La risposta dal server potrebbe contenere informazioni sul successo dell'eliminazione
      return response.data;
    } catch (error) {
      console.error("Errore durante l'eliminazione del post:", error);
      // Potresti voler rilanciare l'errore per gestirlo nel componente
      throw error;
    }
  };
  

/**
 * Retrieves a specific post by ID
 * @param {string} postId - ID of the post to retrieve
 * @returns {Promise<Object>} Post object with populated user and comment information
 */
export const getPost = (postId) => api.get(`/api/posts/${postId}`)

/**
 * Retrieves all posts from a specific user
 * @param {string} userId - ID of the user
 * @returns {Promise<Array>} Array of posts with populated user and comment information
 */
export const getUserPosts = (userId) => api.get(`/api/posts/user/${userId}`)

/**
 * Retrieves latest 20 posts from users that the specified user follows
 * @param {string} userId - ID of the user
 * @returns {Promise<Array>} Array of posts with populated user and comment information
 */
export const getFollowedPosts = (userId) => api.get(`/api/posts/followed/${userId}`)

/**
 * Searches posts by title, content, or place
 * @param {string} query - Search term
 * @returns {Promise<Array>} Array of matching posts with populated user and comment information
 */
export const searchPosts = (query) => api.get(`/api/posts/search?query=${query}`)

/**
 * Retrieves all posts from a specific place
 * @param {string} place - One of: MILANO, BERGAMO, ROMA, TORINO, CAGLIARI, PALERMO
 * @returns {Promise<Array>} Array of posts with populated user and comment information
 */
export const getPostsByPlace = (place) => api.get(`/api/posts/place/${place}`)

/**
 * Likes a post
 * @param {string} postId - ID of the post to like
 * @param {string} userId - ID of the user liking the post
 * @returns {Promise<Object>} Updated post object with likes array
 */
export const likePost = (postId, userId) => api.post(`/api/posts/${postId}/like`, { userId })

export const getLatestAllPosts = () => api.get("/api/posts/latest");