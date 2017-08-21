import { NavigationExperimental } from 'react-native'

const {
 StateUtils: NavigationStateUtils
} = NavigationExperimental

const initialState = {
  index: 0,
  key: 'root',
  routes: [
    {
      key: 'signup',
      title: 'sign up'
    }
  ]
}

PUSH_ROUTE = 'PUSH_ROUTE'
POP_ROUTE = 'POP_ROUTE'

export default (state = initialState, action) => {
  const {
    index,
    routes
  } = state
  switch (action.type) {
    case PUSH_ROUTE:
      return {
        ...state,
        routes: [
          ...routes,
          action.route
        ],
        index: index + 1
      }
    case POP_ROUTE:
      return index > 0 ? {
        ...state,
        routes: routes.slice(0, routes.length - 1),
        index: index - 1
      } : state
    default:
      return state
  }
}
