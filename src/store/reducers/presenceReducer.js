import { SET_ONLINE_USERS, SET_USER_STATUS } from '../actionTypes.js'

const initialState = {
  onlineUserIds: [], // string[]
}

export function presenceReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ONLINE_USERS:
      return { ...state, onlineUserIds: action.payload }

    case SET_USER_STATUS: {
      const { userId, online } = action.payload
      if (online) {
        return state.onlineUserIds.includes(userId)
          ? state
          : { ...state, onlineUserIds: [...state.onlineUserIds, userId] }
      } else {
        return { ...state, onlineUserIds: state.onlineUserIds.filter(id => id !== userId) }
      }
    }

    default:
      return state
  }
}

