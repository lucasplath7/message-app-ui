import {
  COUNTER_SET,
  COUNTER_FAILURE,
} from '../actionTypes.js'

const initialState = {
  count: null,  // null until the initial REST fetch resolves
  error: null,
}

export function counterReducer(state = initialState, action) {
  switch (action.type) {
    case COUNTER_SET:
      // Authoritative value from the server (REST on mount or socket broadcast)
      return { ...state, count: action.payload, error: null }

    case COUNTER_FAILURE:
      return { ...state, error: action.payload }

    default:
      return state
  }
}
