import apiClient from '../apiClient.js'

/**
 * GET /api/threads — all threads the current user participates in
 */
export async function fetchThreads() {
  const res = await apiClient.get('/threads')
  return res.data
}

/**
 * POST /api/threads — create a new thread
 * @param {{ subject: string, recipientIds: string[], initialMessage: string }} data
 */
export async function createThread(data) {
  const res = await apiClient.post('/threads', data)
  return res.data
}

