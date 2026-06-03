import { SYNC_USER_REQUEST, SYNC_USER_SUCCESS, SYNC_USER_FAILURE } from '../actionTypes.js'
import { syncUser as syncUserService } from '../services/users/userService.js'

/**
 * Upsert the signed-in Clerk user into the backend DB.
 * Must be called after every sign-in.
 */
export const syncUser = (clerkUser) => async (dispatch) => {
  dispatch({ type: SYNC_USER_REQUEST })
  try {
    const user = await syncUserService({
      email:    clerkUser.primaryEmailAddress?.emailAddress,
      username: clerkUser.username,
      imageUrl: clerkUser.imageUrl || null,
    })
    dispatch({ type: SYNC_USER_SUCCESS, payload: user })
    return user
  } catch (err) {
    dispatch({ type: SYNC_USER_FAILURE, payload: err?.response?.data?.message || err.message })
    throw err
  }
}

