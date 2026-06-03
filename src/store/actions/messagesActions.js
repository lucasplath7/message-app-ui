import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  MESSAGE_NEW,
} from '../actionTypes.js'
import {
  fetchMessages as fetchMessagesService,
  sendMessage as sendMessageService,
} from '../services/messages/messageService.js'

const DEFAULT_LIMIT = 50

export const fetchMessages = (threadId, before = null) => async (dispatch) => {
  dispatch({ type: FETCH_MESSAGES_REQUEST, payload: { threadId } })
  try {
    const params = { limit: DEFAULT_LIMIT }
    if (before) params.before = before
    const messages = await fetchMessagesService(threadId, params)
    dispatch({
      type: FETCH_MESSAGES_SUCCESS,
      payload: { threadId, messages, limit: DEFAULT_LIMIT },
    })
  } catch (err) {
    dispatch({
      type: FETCH_MESSAGES_FAILURE,
      payload: { threadId, error: err?.response?.data?.message || err.message },
    })
  }
}

export const sendMessage = (threadId, body) => async (dispatch) => {
  dispatch({ type: SEND_MESSAGE_REQUEST })
  try {
    const message = await sendMessageService(threadId, body)
    dispatch({ type: SEND_MESSAGE_SUCCESS, payload: { threadId, message } })
    return message
  } catch (err) {
    dispatch({ type: SEND_MESSAGE_FAILURE, payload: err?.response?.data?.message || err.message })
    throw err
  }
}

export const messageNewReceived = (threadId, message) => ({
  type: MESSAGE_NEW,
  payload: { threadId, message },
})

