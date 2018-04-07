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
import { selectedRow, filterText } from '../actions/contactActions'
import SearchBar from 'react-native-material-design-searchbar';
import { firebaseApp, database } from '../firebase/firebaseApp'
import store from '../store/createStore'
import Icon from 'react-native-vector-icons/MaterialIcons';


function listenForMessages() {
 let messageRoot = database.ref().child(college + "/user/" + user.uid + "/messages/recents").queryOrderedByChild("timestamp")
 messageRoot.on('child_added', function(snapshot) {
   var chattingUid = snapshot.key
   var convoName = snapshot.child('name').val()
   var avatar = snapshot.child('avatar').val
   var user = {
     _id: chattingUid,
     name: convoName,
     avatar: avatar
   }
   store.dispatch(newConvo(user))
 }
}

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

const ConvoList = ({dataSource, navigate}) => {
  return <ListView
  dataSource = {dataSource}
  renderRow = {(rowData) => renderRow(rowData, navigate)}
  />
}

function renderRow(rowData, navigate) {
  var user = {
    _id: rowData._id,
    name: rowData.name,
    avatar: rowData.avatar
  }
  return <Row user={user}
              navigate={navigate}
        />
}

const Row = ({user, navigate}) => {
  return <View style={styles.view}>
          <TouchableHighlight
          underlayColor='#35b5ff'
          onPress={() => toConvos(user, navigate)}
          style={styles.button}>
          <View style={styles.view}>
            <Image
              style={styles.image}
              source={{uri: user.avatar}}
              defaultSource={
                require('../placeholderImages/loadingImage.gif'),
                60, 60
              }
            />
            <Text style={styles.label}>
              {user.name}
            </Text>
          </View>
          </TouchableHighlight>
        </View>
}


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const MessageConvoData = connect((state) =>({
    dataSource: ds.cloneWithRows(state.messagesReducer.convos)
  }),
  null)(ConvoList)

const ConvoScreen = ({_handleNavigate}) => (
  <View style={styles.container}>
    <NavigationBar
        title={'Conversations'}
        height={44}
        titleColor={'#fff'}
        backgroundColor={'#149be0'}
      />
      <MessageConvoData navigate={_handleNavigate}/>

    </View>
)

function toConvos(user, navigate) {
  route.user = user
  navigate(route)
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
