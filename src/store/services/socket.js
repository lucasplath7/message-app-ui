import { io } from 'socket.io-client'
import { SOCKET_URL, SOCKET_PATH } from '../../config.js'

let socket = null

/**
 * Returns a shared Socket.io client instance, creating it on first call.
 * Using a singleton avoids duplicate connections when multiple components
 * subscribe to socket events.
 * @returns {import('socket.io-client').Socket}
 */
export function getSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      path: SOCKET_PATH,
      transports: ['websocket'],
    })
  }
  return socket
}
