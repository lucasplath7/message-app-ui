/**
 * Serializes the data for a POST /users request body.
 * @param {Object} data - Raw data from the UI
 * @param {string} data.userName - The name to create the user with
 * @returns {Object} - The request payload sent to the API
 */
export function serializePostUser(data) {
  return {
    userName: data.userName,
  }
}

