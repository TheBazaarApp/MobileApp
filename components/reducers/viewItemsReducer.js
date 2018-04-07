const initalState = {
  album: null
}

SELECTED_ALBUM = 'SELECTED_ALBUM'
NAVIGATED_BACK = 'NAVIGATED_BACK'

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_ALBUM:
      return {...state, album: action.album}
    case NAVIGATED_BACK:
      return {...state, album: null}
    default:
      return state
  }
}
