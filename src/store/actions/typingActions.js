import { SET_THREAD_TYPING } from '../actionTypes.js'

export const setThreadTyping = (threadId, typingUserIds) => ({
  type: SET_THREAD_TYPING,
  payload: { threadId, typingUserIds },
})

