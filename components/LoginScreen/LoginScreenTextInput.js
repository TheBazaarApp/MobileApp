import React from 'react'

import {Text, StyleSheet, TextInput} from 'react-native'

export default ({placeholder, keyboardType,
  autoCapitalize, secureTextEntry, value, onChangeText}) => (
  <TextInput
        style={styles.firstName}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}>
  </TextInput>
)

const styles = StyleSheet.create({
  firstName: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
})
