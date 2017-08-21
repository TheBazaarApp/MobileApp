
const initialState = {
  profileName: '',
  defaultLocationText = '',
  longitude: '',
  latitude: '',
  profilePic: require('../placeholderImages/loadingImage.gif')
}

SAVE_PROFILE_PIC = 'SAVE_PROFILE_PIC'
GOT_DEFAULT_LOC = 'GOT_DEFAULT_LOC'
SET_DEFAULT_LOC = 'SET_DEFAULT_LOC'
SAVE_PROFILE_INFO = 'SAVE_PROFILE_INFO'
EDITED_NAME = 'EDITED_NAME'
EDITED_DEFAULT_LOCATION = 'EDITED_DEFAULT_LOCATION'

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_DEFAULT_LOC:
      return {...state, defaultLocationText: action.loc.loc,
              longitude: action.loc.long,
              latitude: action.loc.lat}
    case SAVE_PROFILE_PIC:
      return {...state, profilePic: action.pic}
    case EDITED_NAME:
      return {...state, profileName: action.text}
  }
