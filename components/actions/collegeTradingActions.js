SELECTED_ROW = 'SELECTED_ROW'
FILTERED_TEXT = 'FILTERED_TEXT'

export function selectedRow (index) {
  return {
    type: SELECTED_ROW,
    index: index
  }
}

export function filterText (text) {
  return {
    type: FILTERED_TEXT,
    text: text
  }
}
