NEW_ITEM = 'NEW_ITEM'

const initialState = {
  currItem: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_ITEM:
      return {...state, currItem: action.item}
    }
  }
