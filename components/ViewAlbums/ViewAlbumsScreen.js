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

// FlatList list of albums
const AlbumsList = ({data}) => {
  return <FlatList
  data = {data}
  renderItem = {(item) => renderItem(item, _handleNavigate)}
  />
}

// Route on album select
const route = {
  type: 'push',
  route: {
    key: 'viewItems',
    title: 'View Items'
  }
}

// Render item function
function renderItem(item, _handleNavigate) {
    const rowItem = item.unsoldItems[0]
    if (rowItem.picture === null) {
      return <NullRow
                      item={item}
                      navigate={_handleNavigate}
            />
    }
    if (rowItem.requestCompleted) {
      return <SingleRow
                        item={item}
                        navigate={_handleNavigate}
             />
    }
    else {
      return <LoadingRow
                         item={item}
                         navigate={_handleNavigate}
            />

    }
  // }
  // else {
  //   return  <SwiperRow
  //             item={item}
  //             onPress={onPress}
  //           />
  // }
}

// TODO: add support for swiper albums
const SwiperRow = ({item, _handleNavigate}) => {
  var items = []
  for (var i=0; i < unsoldItems.length; i++) {
    const item = unsoldItems[i]
    const row = <SingleRow item={item}
                      onPress={onPress}
                />
    items.push(row)
  }
  return
}

const LoadingRow = ({item, _handleNavigate}) => {
  const rowItem = item.unsoldItems[0];
  return <View style={styles.view}>
          <TouchableHighlight
            onPress={onPress}>
            <View style={styles.view}>
              <Image
                style={styles.image}
                source={{uri: rowItem.image}}
                source={require('../placeholderImages/loadingImage.gif')}
              />
              <Text style={styles.label}>
                {rowItem.price}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
}

const SingleRow = ({item, _handleNavigate}) => {
  const rowItem = item.unsoldItems[0]
  return <View style={styles.view}>
          <TouchableHighlight
            onPress={onPress}>
            <View style={styles.view}>
              <Image
                style={styles.image}
                source={{uri: rowItem.image}}
                defaultSource={
                  require('../placeholderImages/loadingImage.gif'),
                  {width},
                  320
                }
              />
              <Text style={styles.label}>
                {rowItem.price}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
}

function onPressItem (item, _handleNavigate) {
  // Navigate to view items screen
  // Load all data
  store.dispatch(selectedAlbum(item))
  _handleNavigate(route)
}

const SearchBarActive = connect(null, (dispatch) => ({
  onSearchChange: (text) => {
    dispatch(searchAlbums(text));
  }
}))(SearchBar);


const ViewAlbumsScreen = ({_handleNavigate, _goBack}) => (
  <View style={styles.container}>
    <NavigationBar
        title={'Albums'}
        height={44}
        titleColor={'#fff'}
        backgroundColor={'#149be0'}
        leftButtonTitle={'Back'}
        leftButtonTitleColor={'#fff'}
        onLeftButtonPress={_goBack}
      />
    <View style={styles.searchBar}>
      <SearchBarActive
          height={20}
          placeholder={'Search for albums...'}
          autoCorrect={false}
          returnKeyType={'search'}
        />
    </View>

      <AlbumData
        handleNavigate={_handleNavigate}
      />

    </View>
)

const getVisibleAlbums = (albums filter) => {
  return albums.filter(t => t.albumName.includes(filter))
}

const AlbumData = connect((state) => ({
    data: state.viewAlbumsReducer.albums
  }))
(AlbumList)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  view: {
    flex: 1,
  },
  label: {
    color: 'blue',
    marginLeft: 10
  },
  searchBar: {
    marginTop: 75
  },
  image: {
    width: 375,
    height: 320
  }
})
