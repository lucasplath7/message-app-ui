// ── Auth / User Sync ──────────────────────────────────────────────────────────
export const SYNC_USER_REQUEST = 'SYNC_USER_REQUEST'
export const SYNC_USER_SUCCESS = 'SYNC_USER_SUCCESS'
export const SYNC_USER_FAILURE = 'SYNC_USER_FAILURE'

// ── Users (all users list) ────────────────────────────────────────────────────
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// ── Threads ───────────────────────────────────────────────────────────────────
export const FETCH_THREADS_REQUEST = 'FETCH_THREADS_REQUEST'
export const FETCH_THREADS_SUCCESS = 'FETCH_THREADS_SUCCESS'
export const FETCH_THREADS_FAILURE = 'FETCH_THREADS_FAILURE'

export const CREATE_THREAD_REQUEST = 'CREATE_THREAD_REQUEST'
export const CREATE_THREAD_SUCCESS = 'CREATE_THREAD_SUCCESS'
export const CREATE_THREAD_FAILURE = 'CREATE_THREAD_FAILURE'

export const SELECT_THREAD = 'SELECT_THREAD'

// Received via socket
export const THREAD_NEW              = 'THREAD_NEW'
export const THREAD_LAST_MESSAGE_UPDATE = 'THREAD_LAST_MESSAGE_UPDATE'

// ── Messages ──────────────────────────────────────────────────────────────────
export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST'
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS'
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE'

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST'
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE'

// Received via socket
export const MESSAGE_NEW = 'MESSAGE_NEW'

// ── Presence ──────────────────────────────────────────────────────────────────
export const SET_ONLINE_USERS = 'SET_ONLINE_USERS'
export const SET_USER_STATUS  = 'SET_USER_STATUS'

// ── Typing ────────────────────────────────────────────────────────────────────
export const SET_THREAD_TYPING = 'SET_THREAD_TYPING'
