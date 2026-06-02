import { getSocket } from '../services/socket.js'
import { deserializeCounterValue } from '../services/counter/deserializers/getCount.js'
import {
  COUNTER_SET,
  // COUNTER_FAILURE,
} from '../actionTypes.js'
import apiClient from '../services/apiClient.js';

/**
 * Subscribes to the 'counter:value' socket event.
 * All state updates flow through here — increment and decrement actions are
 * fire-and-forget; the authoritative new value always arrives via this broadcast.
 * Returns a cleanup function to remove the listener on unmount.
 * @returns {Function} unsubscribe
 */
export const subscribeToCounter = () => (dispatch) => {
  const socket = getSocket()

  function onCounterValue(value) {
    dispatch({ type: COUNTER_SET, payload: deserializeCounterValue(value) })
  }

  socket.on('counter:value', onCounterValue)

  return () => socket.off('counter:value', onCounterValue)
}

/**
 * Fires a POST /counter/increment request without awaiting the response.
 * The server broadcasts the new value via 'counter:value' which subscribeToCounter handles.
 */
export const incrementCounter = () => () => {
  apiClient.post('/counter/increment');
}

/**
 * Fires a POST /counter/decrement request without awaiting the response.
 * The server broadcasts the new value via 'counter:value' which subscribeToCounter handles.
 */
export const decrementCounter = () => () => {
  apiClient.post('/counter/decrement');
}
