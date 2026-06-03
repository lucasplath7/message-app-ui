import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  SEND_MESSAGE_SUCCESS,
  MESSAGE_NEW,
} from '../actionTypes.js'

// byThreadId[threadId] = { list: [], loading, error, hasMore, oldestCursor }
const initialState = {
  byThreadId: {},
}

function threadMsgState(state = { list: [], loading: false, error: null, hasMore: true, oldestCursor: null }) {
  return state
}

export function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST: {
      const { threadId } = action.payload
      return {
        ...state,
        byThreadId: {
          ...state.byThreadId,
          [threadId]: { ...threadMsgState(state.byThreadId[threadId]), loading: true, error: null },
        },
      }
    }

    case FETCH_MESSAGES_SUCCESS: {
      const { threadId, messages, limit } = action.payload
      const existing = threadMsgState(state.byThreadId[threadId])
      // Messages come oldest-first; prepend older pages to existing list
      const existingIds = new Set(existing.list.map(m => m.id))
      const newMsgs = messages.filter(m => !existingIds.has(m.id))
      return {
        ...state,
        byThreadId: {
          ...state.byThreadId,
          [threadId]: {
            ...existing,
            loading: false,
            list: [...newMsgs, ...existing.list],
            hasMore: messages.length === limit,
            oldestCursor: messages.length > 0 ? messages[0].createdAt : existing.oldestCursor,
          },
        },
      }
    }

    case FETCH_MESSAGES_FAILURE: {
      const { threadId, error } = action.payload
      return {
        ...state,
        byThreadId: {
          ...state.byThreadId,
          [threadId]: { ...threadMsgState(state.byThreadId[threadId]), loading: false, error },
        },
      }
    }

    case SEND_MESSAGE_SUCCESS:
    case MESSAGE_NEW: {
      const { threadId, message } = action.payload
      const existing = threadMsgState(state.byThreadId[threadId])
      if (existing.list.find(m => m.id === message.id)) return state
      return {
        ...state,
        byThreadId: {
          ...state.byThreadId,
          [threadId]: {
            ...existing,
            list: [...existing.list, message],
          },
        },
      }
    }

    default:
      return state
  }
}

