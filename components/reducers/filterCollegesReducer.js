import { collegeObjects } from '../collegeStuff/collegeObjects'

export default (state = collegeObjects, action) => {
  if (action.type === 'FILTERED_TEXT') {
    return {...state, filter: action.text}
  }
  if (action.type === 'SELECTED_ROW') {
    var newState = Object.assign({}, state)
    newState.collegeObjects[action.index].selected = !(newState.collegeObjects[action.index]).selected
    newState.selectedColleges.push(newState.collegeObjects[action.index].collegeName)
    return newState
  }
  else {
    return state
  }
}
