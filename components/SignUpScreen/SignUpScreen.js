import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { typingInput } from '../actions/signupActions'
import SignUpButton from './SignUpButton'
import SignUpTextInput from './SignUpTextInput'
import CreateSimpleAlert from '../alerts/createSimpleAlert'
import { firebaseApp } from '../firebase/firebaseApp'
import { collegeDomains } from '../collegeStuff/collegeDomainsString'
import { collegeStrings } from '../collegeStuff/collegesListString'
import store from '../store/createStore'


const loginRoute = {
  type: 'push',
  route: {
    key: 'login',
    title: 'Login'
  }
}

const domainRoute = {
  type: 'push',
  route: {
    key: 'domain',
    title: 'Domain'
  }
}

const SignupFirstName = connect((state) => ({
  value: state.inputTextReducer.signupFirstName,
  }), (dispatch) => ({
  onChangeText: (text) => {
    dispatch(typingInput('signupFirstName', text))
  }
}))(SignUpTextInput);

const SignupLastName = connect((state) => ({
  value: state.inputTextReducer.signupLastName
  }), (dispatch) => ({
  onChangeText: (text) => {
    dispatch(typingInput('signupLastName',text));
  }
}))(SignUpTextInput);

const SignupEmail = connect((state) => ({
  value: state.inputTextReducer.signupEmail
  }), (dispatch) => ({
  onChangeText: (text) => {
    dispatch(typingInput('signupEmail',text));
  }
}))(SignUpTextInput);

const SignupPassword = connect((state) => ({
  value: state.inputTextReducer.signupPassword
  }), (dispatch) => ({
  onChangeText: (text) => {
    dispatch(typingInput('signupPassword',text));
  }
}))(SignUpTextInput);

const SignupRePassword = connect((state) => ({
  value: state.inputTextReducer.signupRePassword
  }), (dispatch) => ({
  onChangeText: (text) => {
    dispatch(typingInput('signupRePassword',text));
  }
}))(SignUpTextInput);


const SignUpScreen = ({_handleNavigate}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Bazaar</Text>
    <SignupFirstName placeholder='First Name' keyboardType='default'
    autoCapitalize='words' secureTextEntry={false} />

    <SignupLastName placeholder='Last Name' keyboardType='default'
    autoCapitalize='words' secureTextEntry={false} />

    <SignupEmail placeholder='Email (must be .edu)' keyboardType='email-address'
    autoCapitalize='none' secureTextEntry={false} />

    <SignupPassword placeholder='Password' keyboardType='default'
    autoCapitalize='none' secureTextEntry={true} />

    <SignupRePassword placeholder='Re-enter Password' keyboardType='default'
    autoCapitalize='none' secureTextEntry={true} />

    <SignUpButton onPress={() => createAccount(_handleNavigate)} label='Create Account!' />

    <SignUpButton onPress={() => _handleNavigate(loginRoute)} label='Already have an account? Login here!' />
  </View>
)

function createAccount(handleNavigate) {
  const email = store.getState().inputTextReducer.signupEmail
  const password = store.getState().inputTextReducer.signupPassword
  const rePassword = store.getState().inputTextReducer.signupRePassword
  const firstName = store.getState().inputTextReducer.signupFirstName
  const lastName = store.getState().inputTextReducer.signupLastName
  if (email.endsWith('.edu')) {
    if (firstName === "") {
      return CreateSimpleAlert('Error', 'Please enter a first name')
    }
    if (lastName === "") {
      return CreateSimpleAlert('Error', 'Please enter a last name')
    }
    if (password != rePassword) {
      return CreateSimpleAlert('Error', 'Passswords do not match')
    }
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      user.sendEmailVerification().then( () => {
        var mail = email.split("@")
        var domain = mail[1]
        const collegeIndex = collegeDomains.indexOf(domain)
        if (collegeIndex > -1) {
          user.updateProfile({displayName: firstName.replace(/\s+/g, '') + ' ' + lastName.replace(/\s+/g, '')})
          domainRoute.route.title = collegeStrings[collegeIndex]
          handleNavigate(domainRoute)
        }
      },
      function(error) {
        CreateSimpleAlert('Error sending verification', error.message)
      });
    },
    function(error) {
      return CreateSimpleAlert('Error creating account', error.message)
  });
  }
  else {
    return CreateSimpleAlert('Error', 'Please enter a valid .edu email')
  }
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

export default SignUpScreen
