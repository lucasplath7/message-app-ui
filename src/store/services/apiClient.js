import axios from 'axios'
import { API_BASE_URL } from '../../config.js'

// Token getter is set once Clerk is ready (called from AppContainer)
let _getToken = null

export function setTokenGetter(fn) {
  _getToken = fn
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use(async (config) => {
  if (_getToken) {
    try {
      const token = await _getToken()
      if (token) config.headers.Authorization = `Bearer ${token}`
    } catch {
      // token unavailable — request proceeds without auth header
    }
  }
  return config
})

export default apiClient
