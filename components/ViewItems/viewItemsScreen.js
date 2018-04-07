import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native'
import NavigationBar from 'react-native-navigation-bar';
import { connect } from 'react-redux'
import { searchAlbums } from '../actions/viewAlbumActions'
import SearchBar from 'react-native-material-design-searchbar';
import { firebaseApp, database } from '../firebase/firebaseApp'
import store from '../store/createStore'

const ItemList = {(data)} => {
  return <FlatList
  data = {data}
  renderItem = {(item) => renderItem(item, _handleNavigate)}
  />
}

const route = {
  type: 'push',
  route: {
    key: 'closeup',
    title: 'closeUpRoute'
  }
}

function renderItem(item, _handleNavigate) {
    const rowItem = item.unsoldItems[0]
