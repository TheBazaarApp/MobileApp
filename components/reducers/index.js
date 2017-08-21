import { combineReducers } from 'redux'
import navReducer from './navReducer'
import inputTextReducer from './inputTextReducer'
import filterCollegesReducer from './filterCollegesReducer'
import feedReducer from './feedReducer'
import addNewItemReducer from './addNewItemReducer'

const rootReducer = combineReducers({
  navReducer,
  inputTextReducer,
  filterCollegesReducer,
  feedReducer,
  addNewItemReducer
})

export default rootReducer
