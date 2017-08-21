import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { typingInput } from '../actions/loginActions'
import LoginScreenButton from './LoginScreenButton'
import LoginScreenTextInput from './LoginScreenTextInput'
import store from '../store/createStore'
import { firebaseApp } from '../firebase/firebaseApp'
import CreateSimpleAlert from '../alerts/createSimpleAlert'


const route = {
  type: 'push',
  route: {
    key: 'feed',
    title: 'Feed'
  }
}

const LoginEmail = connect((state) => ({
  value: state.inputTextReducer.loginEmail
  }), (dispatch) => ({
  onChangeText: (text) => {
    dispatch(typingInput('loginEmail',text));
  }
}))(LoginScreenTextInput);

const LoginPassword = connect((state) => ({
  value: state.inputTextReducer.loginPassword
  }), (dispatch) => ({
  onChangeText: (text) => {
    dispatch(typingInput('loginPassword',text));
  }
}))(LoginScreenTextInput);

const LoginScreen = ({_handleNavigate, _goBack}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Bazaar</Text>

    <LoginEmail placeholder='Email' keyboardType='email-address'
    autoCapitalize='none' secureTextEntry={false} />

    <LoginPassword placeholder='Password' keyboardType='default'
    autoCapitalize='none' secureTextEntry={true} />

    <LoginScreenButton onPress={() => login(_handleNavigate)} label='Login' />

    <LoginScreenButton onPress={_goBack} label="Don't have an accout? Sign-up here!" />
  </View>
)

function login(handleNavigate) {
  const email = store.getState().inputTextReducer.loginEmail
  const password = store.getState().inputTextReducer.loginPassword
  firebaseApp.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    if (user.emailVerified) {
      handleNavigate(route)
    }
    else {
      firebaseApp.auth().signOut()
      return CreateSimpleAlert('Please Verify Email', 'You must verify your email before signing in')
    }
  },
  function(error) {
    return CreateSimpleAlert('Error signing in', error.message)
  });
}

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 40,
    textAlign: 'center'
  },
  container: {
    flex: 1
  }
})

export default LoginScreen
