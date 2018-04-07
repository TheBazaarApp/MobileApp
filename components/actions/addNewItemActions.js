TYPING_NEW_ITEM = 'TYPING_NEW_ITEM'
TOGGLE_ISO = 'TOGGLE_ISO'
ADDED_ITEM = 'ADDED_ITEM'
REMOVED_ITEM = 'REMOVED_ITEM'
MOVED_PICKER = 'MOVED_PICKER'
TAG_ALL_MOVED = 'TAG_ALL_MOVED'

export function typingNewItem (text, input, index) {
  return {
    type: TYPING_NEW_ITEM,
    input: input,
    text: text,
    index: index
  }
}

export function toggleISO (){
  return {
    type: TOGGLE_ISO
  }
}

export function addedItem (kind, image) {
  return {
    type: ADDED_ITEM,
    kind: kind,
    image: image
  }
}

export function removedItem (index) {
  return {
    type: REMOVED_ITEM,
    index: index
  }
}

export function movedPicker (value, index) {
  return {
    type: MOVED_PICKER,
    value: value,
    index: index
  }
}

export function tagAllMoved (value) {
  return {
    type: TAG_ALL_MOVED,
    value: value
  }
}
