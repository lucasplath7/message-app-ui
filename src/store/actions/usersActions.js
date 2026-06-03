import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from '../actionTypes.js'
import { fetchAllUsers } from '../services/users/userService.js'

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST })
  try {
    const users = await fetchAllUsers()
    dispatch({ type: FETCH_USERS_SUCCESS, payload: users })
  } catch (err) {
    dispatch({ type: FETCH_USERS_FAILURE, payload: err?.response?.data?.message || err.message })
  }
}

