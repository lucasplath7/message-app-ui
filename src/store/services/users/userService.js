import apiClient from '../apiClient.js'

/**
 * POST /api/users/sync — upsert the current Clerk user into the DB
 */
export async function syncUser(userData) {
  const res = await apiClient.post('/users/sync', userData)
  return res.data
}

/**
 * GET /api/users — all users with live online flag
 */
export async function fetchAllUsers() {
  const res = await apiClient.get('/users')
  return res.data
}
