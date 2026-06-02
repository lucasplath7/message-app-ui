const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
export const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '')

// Socket.io can be explicitly configured for local dev or default to same-origin in deploy.
const configuredSocketUrl = import.meta.env.VITE_SOCKET_URL
const defaultSocketUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
export const SOCKET_URL = configuredSocketUrl || defaultSocketUrl
export const SOCKET_PATH = import.meta.env.VITE_SOCKET_PATH || '/socket.io'
