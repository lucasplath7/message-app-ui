import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from '../actionTypes.js'
import { createUser as createUserService } from '../services/users/userService.js'

export const createUser = (userData) => async (dispatch) => {
  dispatch({ type: CREATE_USER_REQUEST })

  try {
    const user = await createUserService(userData)
    dispatch({ type: CREATE_USER_SUCCESS, payload: user })
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAILURE,
      payload: error instanceof Error ? error.message : 'Failed to create user',
    })
  }
}
