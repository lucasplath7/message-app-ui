import { io } from 'socket.io-client'
import { SOCKET_URL, SOCKET_PATH } from '../../config.js'
import { setOnlineUsers, setUserStatus } from '../actions/presenceActions.js'
import { setThreadTyping } from '../actions/typingActions.js'
import { threadNewReceived, threadLastMsgUpdate } from '../actions/threadsActions.js'
import { messageNewReceived } from '../actions/messagesActions.js'

let socket = null
let _dispatch = null

export function initSocket(dispatch) {
  _dispatch = dispatch
  if (!socket) {
    socket = io(SOCKET_URL, {
      path: SOCKET_PATH,
      transports: ['websocket'],
      autoConnect: false,
    })
    attachListeners()
  }
  return socket
}

export function getSocket() {
  return socket
}

export function connectSocket(userId) {
  if (!socket) return
  socket.connect()
  socket.once('connect', () => {
    socket.emit('user:connect', { userId })
  })
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect()
  }
}

export function joinThread(threadId) {
  socket?.emit('thread:join', { threadId })
}

export function leaveThread(threadId) {
  socket?.emit('thread:leave', { threadId })
}

export function emitTypingStart(threadId) {
  socket?.emit('thread:typing:start', { threadId })
}

export function emitTypingStop(threadId) {
  socket?.emit('thread:typing:stop', { threadId })
}

function attachListeners() {
  // Server → client: initial online user set
  socket.on('users:online', ({ userIds }) => {
    _dispatch?.(setOnlineUsers(userIds))
  })

  // Server → client: single user status change
  socket.on('user:status', ({ userId, online }) => {
    _dispatch?.(setUserStatus(userId, online))
  })

  // Server → client: new thread created (participant receives via personal room)
  socket.on('thread:new', (thread) => {
    _dispatch?.(threadNewReceived(thread))
  })

  // Server → client: new message in a thread room
  socket.on('thread:message:new', ({ threadId, message }) => {
    _dispatch?.(messageNewReceived(threadId, message))
    _dispatch?.(threadLastMsgUpdate(threadId, message))
  })

  // Server → client: typing state for a thread
  socket.on('thread:typing', ({ threadId, typingUserIds }) => {
    _dispatch?.(setThreadTyping(threadId, typingUserIds))
  })
}
