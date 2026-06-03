import { SET_THREAD_TYPING } from '../actionTypes.js'

const initialState = {
  byThreadId: {}, // { [threadId]: string[] } - user IDs currently typing
}

export function typingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_THREAD_TYPING: {
      const { threadId, typingUserIds } = action.payload
      return {
        ...state,
        byThreadId: { ...state.byThreadId, [threadId]: typingUserIds },
      }
    }
    default:
      return state
  }
}

