import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Button
} from 'react-native'
import { firebaseApp } from '../firebase/firebaseApp'
import NavigationBar from 'react-native-navigation-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';

const route = {
  type: 'push',
  route: {
    key: 'profile',
    title: 'Profile'
  }
}

const ProfilePic = ({pic}) {
  return <Image
            style={styles.profilePic}
            source={{uri: pic}}
          />
}

const ProfileName = ({text, value, onChangeText}) {
  return <TextInput style={styles.profileName}
          value={value}
          onChangeText={onChangeText}>
        </TextInput>
}

const DefaultLocationText = ({text}) {
  return <Text style={styles.defaultLocationText}>
            {text}
          </Text>
}

const SetDefaultLoctionButton = {
  return <TouchableHighlight
            underlayColor='#35b5ff'
            onPress= onPressSetLocation()
            style={styles.setDefaultLocationButton}>
            <Text>
              'Set Default Location'
            </Text>
        </TouchableHighlight>
}

const SaveButton = {
  return <TouchableHighlight
            underlayColor='#35b5ff'
            onPress= onPressSave()
            style={styles.saveButton}>
            <Text>
              'Save'
            </Text>
        </TouchableHighlight>
}

function onPressSetLocation() {
  //TODO: Pull up map view with initial view
  // Either set to their location, or HMC
  // Allow user to choose their location
  // Ask user for a name for their location
  // Save longitude, latitude, and name
}

function onPressSave() {
  // TODO: Save the profilePic, profileName,
  // location, lat, and long
  // Function is most written in editProfileFunctions
}

const ProfileNameContainer = connect((state) => ({
  value: state.editProfileReducer.profileName
  }), (dispatch) => ({
  onChangeText: (text) => {
    dispatch(editedName(text));
  }
}))(ProfileName)

const ProfilePicContainer = connect((state) => ({
  pic: state.editProfileReducer.profilePic
}))(ProfilePic)

const DefaultLocationTextContainer = connect((state) => ({
  text: state.editProfileReducer.defaultLocationText;
}))(DefaultLocationText)

const styles = StyleSheet.create({
  container: {
