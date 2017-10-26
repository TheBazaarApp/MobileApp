import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight
} from 'react-native'
import NavigationBar from 'react-native-navigation-bar';
import { connect } from 'react-redux'
import { selectedRow, filterText } from '../actions/collegeTradingActions'
import SearchBar from 'react-native-material-design-searchbar';
import { firebaseApp, database } from '../firebase/firebaseApp'
import store from '../store/createStore'
import Icon from 'react-native-vector-icons/MaterialIcons';


const checkBoxFilled = (<Icon name="check-box" size={20} color="#0f0" />)
const checkOutline = (<Icon name="check-box-outline-blank" size={20} color="#0f0" />)

var user = firebaseApp.auth().currentUser;

const route = {
  type: 'push',
  route: {
    key: 'feed',
    title: 'Feed'
  }
}

const CollegeTradingList = ({dataSource, onPress}) => {
  return <ListView
  dataSource = {dataSource}
  renderRow = {(rowData) => renderRow(rowData, onPress)}
  />
}

function renderRow(rowData, onPress) {
  if (rowData.selected) {
    return <Row checkBox={checkBoxFilled}
                collegeName={rowData.collegeName}
                onPress={onPress}
                index={rowData.index}
            />
  }
  else {
    return <Row checkBox={checkOutline}
                collegeName={rowData.collegeName}
                onPress={onPress}
                index={rowData.index}
            />
  }
}

const Row = ({checkBox, collegeName, onPress, index}) => {
  return <View style={styles.view}>
          <TouchableHighlight
          underlayColor='#35b5ff'
          onPress={() => onPress(index)}
          style={styles.button}>
          <View style={styles.view}>
          {checkBox}
            <Text style={styles.label}>
              {collegeName}
            </Text>
          </View>
          </TouchableHighlight>
        </View>
}


const SearchBarActive = connect(null, (dispatch) => ({
  onSearchChange: (text) => {
    dispatch(filterText(text));
  }
}))(SearchBar);

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const getVisibleColleges = (colleges, filter) => {
  return colleges.filter(t => t.collegeName.includes(filter))
}

const CollegeTradingData = connect((state) =>({
    dataSource: ds.cloneWithRows(getVisibleColleges(state.filterCollegesReducer.collegeObjects, state.filterCollegesReducer.filter))
  }),
  (dispatch) => ({
    onPress: (index) => dispatch(selectedRow(index))
  }))(CollegeTradingList)

const CollegeTradingScreen = ({_handleNavigate, _goBack, college}) => (
  <View style={styles.container}>
    <NavigationBar
        title={'Choose colleges you want to trade with!'}
        height={44}
        titleColor={'#fff'}
        backgroundColor={'#149be0'}
        leftButtonTitle={'Back'}
        leftButtonTitleColor={'#fff'}
        onLeftButtonPress={_goBack}
        rightButtonTitle={'Save'}
        rightButtonTitleColor={'#fff'}
        onRightButtonPress={() => saveInDatabase(_handleNavigate, college)}
      />
    <View style={styles.searchBar}>
      <SearchBarActive
          height={50}
          placeholder={'Search for colleges...'}
          autoCorrect={false}
          returnKeyType={'search'}
        />
    </View>

      <CollegeTradingData/>

    </View>
)

function tradingCreator(collegesArray) {
  var collegeTradings = {}
  for (var i = 0; i < collegesArray.length; i++) {
    collegeTradings[i] = collegesArray[i].replace(/\s+/g, '')
  }
  return collegeTradings
}

function saveInDatabase (navigate, college) {
  college = college.replace(/\s+/g, '')
  tradingColleges = tradingCreator(store.getState().filterCollegesReducer.selectedColleges)
  database.ref(college + '/user/' + user.uid + '/settings/colleges').set(tradingColleges, navigate)
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  view: {
    flex: 1,
    flexDirection: "row"
  },
  button: {
    height: 20,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 5
  },
  label: {
    color: 'blue',
    marginLeft: 10
  },
  searchBar: {
    marginTop: 80
  }
})

export default CollegeTradingScreen
