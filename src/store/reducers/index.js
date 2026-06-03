import { combineReducers } from 'redux'
import { authReducer }     from './authReducer.js'
import { usersReducer }    from './usersReducer.js'
import { threadsReducer }  from './threadsReducer.js'
import { messagesReducer } from './messagesReducer.js'
import { presenceReducer } from './presenceReducer.js'
import { typingReducer }   from './typingReducer.js'

export const rootReducer = combineReducers({
  auth:     authReducer,
  users:    usersReducer,
  threads:  threadsReducer,
  messages: messagesReducer,
  presence: presenceReducer,
  typing:   typingReducer,
})
