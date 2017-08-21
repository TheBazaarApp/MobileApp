import React from 'react'

import { Text, TouchableHighlight, StyleSheet } from 'react-native'

export default ({label, onPress}) => (
  <TouchableHighlight
  underlayColor='#35b5ff'
  onPress={onPress}
  style={styles.button}>
    <Text style={styles.label}>
    {label}
    </Text>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  button: {
    height: 50,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#22a3ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  label: {
    color: 'white'
  }
})
