import React from 'react'
// import { AppRegistry } from 'react-native'
// import store from './components/store/createStore'
// import NavigationRootContainer from './components/containers/navRootContainer'
// import { Provider } from 'react-redux'
//
// const BazaarMobileApp = () => (
//   <Provider store={store}>
//     <NavigationRootContainer />
//   </Provider>
// )
// AppRegistry.registerComponent('BazaarMobileApp', () => BazaarMobileApp)

const chattingUser = {
  college: 'hmc_edu',
  _id: 'MmlnMh7ReeeUjFJQD8drs2B7lkT2',
  avatar: null,
  name: 'Oliva Watkins'
}

const user = {
  _id: 'dC0eqBBGU7gYjcOderodYBRu0Tz2',
  name: 'Matthew Guillory',
  avatar: null
}

import {
  AppRegistry,
} from 'react-native';

import MessagesScreen from './components/Messages/MessagesScreen';

class BazaarMobileApp extends React.Component {
  render() {
    return (
      <MessagesScreen user={user}
                      chattingUser={chattingUser} />
    )
  }
}
AppRegistry.registerComponent('BazaarMobileApp', () => BazaarMobileApp);
