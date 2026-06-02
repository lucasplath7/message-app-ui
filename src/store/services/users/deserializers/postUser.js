/**
 * Deserializes the API response for a POST /users request.
 * @param {Object} data - Raw response data from the API
 * @param {string} data.userId - UUID of the newly created user
 * @param {string} data.userName - Name of the newly created user
 * @returns {Object} - Normalized user data for the Redux store
 */
export function deserializePostUser(data) {
  return {
    userId: data.userId,
    userName: data.userName,
  }
}

