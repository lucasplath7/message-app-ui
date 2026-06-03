import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from '../actionTypes.js'

const initialState = {
  list: [],    // [{ id, email, firstName, lastName, imageUrl, online }]
  loading: false,
  error: null,
}

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, list: action.payload }
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

