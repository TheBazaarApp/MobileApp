import { combineReducers } from 'redux'
import navReducer from './navReducer'
import inputTextReducer from './inputTextReducer'
import filterCollegesReducer from './filterCollegesReducer'
import feedReducer from './feedReducer'
import addNewItemReducer from './addNewItemReducer'
import profileReducer from './profileReducer'
import editProfileReducer from './editProfileReducer'
import editProfileMapViewReducer from './editProfileMapViewReducer'

// Combines all reduces into one to create the store
const rootReducer = combineReducers({
  navReducer,
  inputTextReducer,
  filterCollegesReducer,
  feedReducer,
  addNewItemReducer
})

export default rootReducer
