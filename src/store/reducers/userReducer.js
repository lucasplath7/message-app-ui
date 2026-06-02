import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from '../actionTypes.js'

const initialState = {
  user: null,       // { userId, userName } on success
  loading: false,
  error: null,
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { ...state, loading: true, error: null }

    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null }

    case CREATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

