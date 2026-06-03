import apiClient from '../apiClient.js'

/**
 * GET /api/threads/:threadId/messages
 * @param {string} threadId
 * @param {{ limit?: number, before?: string }} params
 */
export async function fetchMessages(threadId, { limit = 50, before } = {}) {
  const params = { limit }
  if (before) params.before = before
  const res = await apiClient.get(`/threads/${threadId}/messages`, { params })
  return res.data
}

/**
 * POST /api/threads/:threadId/messages
 * @param {string} threadId
 * @param {string} body
 */
export async function sendMessage(threadId, body) {
  const res = await apiClient.post(`/threads/${threadId}/messages`, { body })
  return res.data
}

