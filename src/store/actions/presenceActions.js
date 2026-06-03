import { SET_ONLINE_USERS, SET_USER_STATUS } from '../actionTypes.js'

export const setOnlineUsers = (userIds) => ({ type: SET_ONLINE_USERS, payload: userIds })
export const setUserStatus  = (userId, online) => ({ type: SET_USER_STATUS, payload: { userId, online } })

