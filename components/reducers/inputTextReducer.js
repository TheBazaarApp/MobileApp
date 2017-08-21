
const initialState = {
  signupFirstName: '',
  signupLastName: '',
  signupEmail: '',
  signupPassword: '',
  signupRePassword: '',
  loginEmail: '',
  loginPassword: ''
}

function inputState (state = initialState, action) {
  switch (action.input) {
    case 'signupFirstName':
      return {...state, signupFirstName: action.text}
    case 'signupLastName':
      return {...state, signupLastName: action.text}
    case 'signupEmail':
      return {...state, signupEmail: action.text}
    case 'signupPassword':
      return {...state, signupPassword: action.text}
    case 'signupRePassword':
      return {...state, signupRePassword: action.text}
    case 'loginEmail':
      return {...state, loginEmail: action.text}
    case 'loginPassword':
      return {...state, loginPassword: action.text}
    default:
      return state
  }
}

export default inputState
