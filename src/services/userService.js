import api from "./api"

/**
 * Creates a new user account
 * @param {Object} userData - User registration data
 * @param {string} userData.first_name - User's first name
 * @param {string} userData.last_name - User's last name
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password
 * @param {string} userData.role - User's role ("USER" or "BUSINESS")
 * @param {Object} [userData.metadata] - Additional user metadata
 * @param {string} [userData.metadata.business_name] - Business name (required if role is "BUSINESS")
 * @returns {Promise<Object>} Created user object (without password)
 */
export const createUser = (userData) => api.post("/api/users", userData)

/**
 * Authenticates a user and returns a token
 * @param {string} userRole - User's role ("USER" or "BUSINESS")
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User's email address
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} Authentication token and user data
 */
export const login = (userRole, credentials) => api.post(`/auth/token?role=${userRole}`, credentials)

/**
 * Updates a user's profile information
 * @param {string} userId - ID of the user to update
 * @param {Object} userData - Updated user data
 * @param {string} [userData.first_name] - Updated first name
 * @param {string} [userData.last_name] - Updated last name
 * @param {string} [userData.email] - Updated email address
 * @param {Object} [userData.metadata] - Updated metadata
 * @returns {Promise<Object>} Updated user object
 */
export const updateUserProfile = (userId, userData) => api.put(`/api/users/${userId}`, userData)

/**
 * Retrieves a user's profile information
 * @param {string} userId - ID of the user to retrieve
 * @returns {Promise<Object>} User profile object (without password)
 */
export const getUserProfile = (userId) => api.get(`/api/users/${userId}`)

/**
 * Uploads or updates a user's profile picture
 * @param {string} userId - ID of the user
 * @param {FormData} formData - FormData object containing the image file
 * @param {File} formData.profile_picture - The image file to upload
 * @returns {Promise<Object>} Success message and profile image URL
 */
export const uploadProfilePicture = (userId, formData) => api.post(`/api/users/${userId}/profile-picture`, formData)

/**
 * Follows another user
 * @param {string} userId - ID of the user to follow
 * @param {string} followerId - ID of the user who wants to follow
 * @returns {Promise<Object>} Success message
 */
export const followUser = (userId, followerId) => api.post(`/api/users/${userId}/follow`, { followerId })