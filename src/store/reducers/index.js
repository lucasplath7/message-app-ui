import { combineReducers } from 'redux'
import { userReducer } from './userReducer.js'
import { counterReducer } from './counterReducer.js'

export const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
})

