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
  MESSAGE_NEW,
} from '../actionTypes.js'

const initialState = {
  list: [],            // [{ id, subject, createdAt, updatedAt, createdBy, participants, lastMessage }]
  selectedThreadId: null,
  loading: false,
  creating: false,
  error: null,
}

export function threadsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_THREADS_REQUEST:
      return { ...state, loading: true, error: null }

    case FETCH_THREADS_SUCCESS:
      return { ...state, loading: false, list: action.payload }

    case FETCH_THREADS_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case CREATE_THREAD_REQUEST:
      return { ...state, creating: true, error: null }

    case CREATE_THREAD_SUCCESS:
      return {
        ...state,
        creating: false,
        // Prepend if not already in list
        list: state.list.find(t => t.id === action.payload.id)
          ? state.list
          : [action.payload, ...state.list],
        selectedThreadId: action.payload.id,
      }

    case CREATE_THREAD_FAILURE:
      return { ...state, creating: false, error: action.payload }

    case SELECT_THREAD:
      return { ...state, selectedThreadId: action.payload }

    case THREAD_NEW: {
      if (state.list.find(t => t.id === action.payload.id)) return state
      return { ...state, list: [action.payload, ...state.list] }
    }

    case MESSAGE_NEW:
    case THREAD_LAST_MESSAGE_UPDATE: {
      const { threadId, message } = action.payload
      return {
        ...state,
        list: state.list
          .map(t =>
            t.id === threadId
              ? { ...t, lastMessage: message, updatedAt: message.createdAt }
              : t
          )
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
      }
    }

    default:
      return state
  }
}

