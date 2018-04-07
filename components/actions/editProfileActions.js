SAVE_PROFILE_PIC = 'SAVE_PROFILE_PIC'
GOT_DEFAULT_LOC = 'GOT_DEFAULT_LOC'
SET_DEFAULT_LOC = 'SET_DEFAULT_LOC'
SAVE_PROFILE_INFO = 'SAVE_PROFILE_INFO'
EDITED_NAME = 'EDITED_NAME'
EDITED_DEFAULT_LOCATION = 'EDITED_DEFAULT_LOCATION'

export function editedName (text) {
  return {
    type: EDITED_NAME,
    text: text
  }
}

export function editedDefaultLoction (loc) {
  return {
    type: EDITED_DEFAULT_LOCATION,
    loc: loc
  }
}

export function saveProfilePic (pic) {
  return {
    type: SAVE_PROFILE_PIC,
    pic: pic
  }
}

export function gotDefaultLoc (loc) {
  return {
    type: GOT_DEFAULT_LOC,
    loc: loc
  }
}

export function setDefaultLoc (loc) {
  return {
    type: SET_DEFAULT_LOC
    loc: loc
  }
}

export function saveProfileInfo () {
  return {
    type: SAVE_PROFILE_INFO
  }
}
