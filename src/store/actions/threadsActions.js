import {
  FETCH_THREADS_REQUEST,
  FETCH_THREADS_SUCCESS,
  FETCH_THREADS_FAILURE,
  CREATE_THREAD_REQUEST,
  CREATE_THREAD_SUCCESS,
  CREATE_THREAD_FAILURE,
  SELECT_THREAD,
  THREAD_NEW,
  THREAD_LAST_MESSAGE_UPDATE,
} from '../actionTypes.js'
import { fetchThreads as fetchThreadsService, createThread as createThreadService } from '../services/threads/threadService.js'

export const fetchThreads = () => async (dispatch) => {
  dispatch({ type: FETCH_THREADS_REQUEST })
  try {
    const threads = await fetchThreadsService()
    dispatch({ type: FETCH_THREADS_SUCCESS, payload: threads })
  } catch (err) {
    dispatch({ type: FETCH_THREADS_FAILURE, payload: err?.response?.data?.message || err.message })
  }
}

/**
 * @param {{ subject: string, recipientIds: string[], initialMessage: string }} data
 */
export const createThread = (data) => async (dispatch) => {
  dispatch({ type: CREATE_THREAD_REQUEST })
  try {
    const thread = await createThreadService(data)
    dispatch({ type: CREATE_THREAD_SUCCESS, payload: thread })
    return thread
  } catch (err) {
    const msg = err?.response?.data?.message || err.message
    dispatch({ type: CREATE_THREAD_FAILURE, payload: msg })
    throw new Error(msg, { cause: err })
  }
}

export const selectThread = (threadId) => ({ type: SELECT_THREAD, payload: threadId })

export const threadNewReceived  = (thread)  => ({ type: THREAD_NEW,                payload: thread })
export const threadLastMsgUpdate = (threadId, message) => ({
  type: THREAD_LAST_MESSAGE_UPDATE,
  payload: { threadId, message },
})


