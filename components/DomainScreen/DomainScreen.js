import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import DomainScreenButton from './DomainScreenButton'

const collegeTradingRoute = {
  type: 'push',
  route: {
    key: 'collegeTrading',
    title: 'CollegeTrading'
  }
}

const selectCollegeRoute = {
  type: 'push',
  route: {
    key: 'selectCollege',
    title: 'SelectCollege'
  }
}

const DomainScreen = ({_handleNavigate, collegeName}) => (
  <View style={styles.container}>
    <Text style={styles.header}>
    From your email domain,
    we believe your college is</Text>

    <Text style={styles.title}>
        {collegeName} </Text>

    <DomainScreenButton onPress={() => {
      collegeTradingRoute.route.title = collegeName
      _handleNavigate(collegeTradingRoute)}} label='This College is Correct' />

    <DomainScreenButton onPress={() => _handleNavigate(selectCollegeRoute)} label='This College is Incorrect' />
  </View>
)

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    justifyContent: 'center',
    marginBottom: 10,
    textAlign: 'center'

  },
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

export default DomainScreen
