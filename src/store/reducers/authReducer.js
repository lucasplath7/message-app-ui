import {
  SYNC_USER_REQUEST,
  SYNC_USER_SUCCESS,
  SYNC_USER_FAILURE,
} from '../actionTypes.js'

const initialState = {
  currentUser: null, // { id, email, firstName, lastName, imageUrl }
  syncing: false,
  error: null,
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SYNC_USER_REQUEST:
      return { ...state, syncing: true, error: null }
    case SYNC_USER_SUCCESS:
      return { ...state, syncing: false, currentUser: action.payload }
    case SYNC_USER_FAILURE:
      return { ...state, syncing: false, error: action.payload }
    default:
      return state
  }
}

