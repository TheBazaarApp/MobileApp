import React from 'react'
import {
  Alert
} from 'react-native'

export default (title, message) => {
  const alert =  Alert.alert(
  title,
  message,
  [
    {text: 'OK'}
  ]
  )
  return alert
}
