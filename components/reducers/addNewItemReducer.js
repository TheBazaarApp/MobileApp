const initialState = {
  albumName: '',
  items: [],
  toggle: false,
  tagAllFilter: 'none'
}

TYPING_NEW_ITEM = 'TYPING_NEW_ITEM'
TOGGLE_ISO = 'TOGGLE_ISO'
ADDED_ITEM = 'ADDED_ITEM'
REMOVED_ITEM = 'REMOVED_ITEM'
MOVED_PICKER = 'MOVED_PICKER'
TAG_ALL_MOVED = 'TAG_ALL_MOVED'

var index = 0

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ISO:
      var newState = Object.assign({}, state)
      newState.toggle = !(newState.toggle)
      return newState
    case TYPING_NEW_ITEM:
      console.log("typing item")
      console.log(action.input)
      console.log(action.index)
      switch (action.input) {
        case 'albumName':
          return {...state, albumName: action.text}
        case 'itemName':
          var newState = Object.assign({}, state)
          for (var item of newState.items) {
            if (item.index === action.index) {
              item.itemName = action.text
            }
          }
          return newState
        case 'itemDescription':
          var newState = Object.assign({}, state)
          for (var item of newState.items) {
            if (item.index === action.index) {
              item.description = action.text
            }
          }
          return newState
        case 'itemPrice':
          var newState = Object.assign({}, state)
          for (var item of newState.items) {
            if (item.index === action.index) {
              item.price = action.text
            }
          }
          return newState
        default:
          return state
    }
    case ADDED_ITEM:
      if (action.kind === 'pic') {
        console.log("index is")
        console.log(index)
        const newItem = {
          price: '',
          description: '',
          tag: 'none',
          itemName: '',
          hasPic: true,
          index: index,
          tag: 'none',
          pic: action.image
        }
        index++
        var newState = Object.assign({}, state)
        newState.items.push(newItem)
        return newState
      }
      if (action.kind === 'noPic') {
        console.log("index is")
        console.log(index)
        const newItem = {
          price: '',
          description: '',
          tag: 'none',
          itemName: '',
          hasPic: false,
          pic: null,
          tag: 'none',
          index: index
        }
        index++
        var newState = Object.assign({}, state)
        newState.items.push(newItem)
        return newState
      }
      else {
        return state
      }
    case REMOVED_ITEM:
      console.log(action.index)
      console.log("going to remove an item!")
      var newState = Object.assign({}, state)
      newState.items.splice(action.index, 1)
      index--
      return newState
    case MOVED_PICKER:
      console.log("moved picker!")
      console.log(action.index)
      var newState = Object.assign({}, state)
      for (var item of newState.items) {
        if (item.index === action.index) {
          item.tag = action.value
        }
      }
      return newState
    case TAG_ALL_MOVED:
      var newState = Object.assign({}, state)
      for (var item of newState.items) {
        item.tag = action.value
      }
      newState.tagAllFilter = action.value
      return newState
    default:
      return state
  }
}
