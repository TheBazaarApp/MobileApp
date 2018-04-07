import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ListView,
  Image,
  Dimensions,
  Button,
  TouchableHighlight
} from 'react-native'
import NavigationBar from 'react-native-navigation-bar';
import { connect } from 'react-redux'
import { searchFeed } from '../actions/feedActions'
import SearchBar from 'react-native-material-design-searchbar';
import { firebaseApp, database } from '../firebase/firebaseApp'
import store from '../store/createStore'
import Icon from 'react-native-vector-icons/MaterialIcons';

// Checkboc icons
const checkBoxFilled = (<Icon name="check-box" size={20} color="#0f0" />)
const checkOutline = (<Icon name="check-box-outline-blank" size={20} color="#0f0" />)

var {height, width} = Dimensions.get('window');

// route to navigate to when the user taps a picture
const closeUpRoute = {
  type: 'push',
  route: {
    key: 'closeup',
    title: 'Close Up'
  }
}

// feed ListView
// TODO: change into FlatList
const FeedList = ({dataSource, onPress}) => {
  return <ListView
  dataSource = {dataSource}
  renderRow = {(rowData) => renderRow(rowData, onPress)}
  enableEmptySections={true}
  />
}

// renderRow function
function renderRow(rowData, onPress) {
  // if (rowData.unsoldItems.length === 1) {
    const item = rowData.unsoldItems[0]
    if (item.picture === null) {
      return <NullRow
                      onPress={onPress}
                      item={item}
            />
    }
    if (item.requestCompleted) {
      return <SingleRow
                        onPress={onPress}
                        item={item}
             />
    }
    else {
      return <LoadingRow
                         onPress = {onPress}
                         item={item}
            />

    }
  // }
  // else {
  //   return  <SwiperRow
  //             unsoldItems={rowData.unsoldItems}
  //             onPress={onPress}
  //           />
  // }
}

// TODO: add support for swiper rows
const SwiperRow = ({unsoldItems, onPress}) => {
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

// Loading feed item
const LoadingRow = ({item, onPress}) => {
  return <View style={styles.view}>
          <TouchableHighlight
            onPress={onPress}>
            <View style={styles.view}>
              <Image
                style={styles.image}
                source={{uri: item.image}}
                source={require('../placeholderImages/loadingImage.gif')}
              />
              <Text style={styles.label}>
                {item.price}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
}

// feed item without a picture
const NullRow = ({item, onPress}) => {
  return <View style={styles.view}>
          <TouchableHighlight
            onPress={onPress}>
            <View style={styles.view}>
              <Image
                style={styles.image}
                source={require('../placeholderImages/imageNotFound.png')}
              />
              <Text style={styles.label}>
                {item.price}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
}

// Feed item with a single picture
const SingleRow = ({item, onPress}) => {
  return <View style={styles.view}>
          <TouchableHighlight
            onPress={onPress}>
            <View style={styles.view}>
              <Image
                style={styles.image}
                source={{uri: item.image}}
                defaultSource={
                  require('../placeholderImages/loadingImage.gif'),
                  {width},
                  320
                }
              />
              <Text style={styles.label}>
                {item.price}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
}

// TODO: Implement
function onItemPress (item) {
  //Navigate to close up screen
  //Load all data
}

// Active search bar
const SearchBarActive = connect(null, (dispatch) => ({
  onSearchChange: (text) => {
    dispatch(searchFeed(text));
  }
}))(SearchBar);

// Data source for the feed
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

// Filter for feed searching
// TODO: Implement this for proper searching
const getVisibleFeed = (feed, filter) => {
  return feed.filter(t => t.unsoldItems[0].name.includes(filter))
}

// Feed connected with state
const FeedData = connect((state) => ({
    dataSource: ds.cloneWithRows(state.feedReducer.albums)
  }),
  (dispatch) => ({
    onPress: handleNavigate(closeUpRoute)
  }))(FeedList)

function handleNavigate(route) {

}

const FeedScreen = ({_handleNavigate, _goBack}) => (
  <View style={styles.container}>
    <NavigationBar
        title={'Bazaar'}
        height={44}
        titleColor={'#fff'}
        backgroundColor={'#149be0'}
        leftButtonTitle={checkOutline}
        leftButtonTitleColor={'#fff'}
        onLeftButtonPress={_goBack}
        rightButtonTitle={'forward'}
        rightButtonTitleColor={'#fff'}
        onRightButtonPress={_goBack}
      />
    <View style={styles.searchBar}>
      <SearchBarActive
          height={20}
          placeholder={'Search for items...'}
          autoCorrect={false}
          returnKeyType={'search'}
        />
    </View>

      <FeedData/>

    </View>
)


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

export default FeedScreen
