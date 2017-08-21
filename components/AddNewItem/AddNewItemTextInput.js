import React from 'react'

import {Text, StyleSheet, TextInput} from 'react-native'

export default ({placeholder, value, onChangeText, index, style, multiline, input}) => (
  <TextInput
        style={style}
        placeholder={placeholder}
        value={value}
        onChangeText= {(text) => onChangeText(text, input, index)}
        multiline={multiline}>
  </TextInput>
)
