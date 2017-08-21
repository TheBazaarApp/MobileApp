const initialState = {
  convos: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_CONVO:
      return {...state, convos: [...convos, action.user]}
  }
}
