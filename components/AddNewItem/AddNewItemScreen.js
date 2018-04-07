import React from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ListView,
  Image,
  TouchableHighlight,
  Picker
} from 'react-native'
import NavigationBar from 'react-native-navigation-bar';
import { connect } from 'react-redux'
import { typingNewItem, toggleISO, addedItem, removedItem, movedPicker, tagAllMoved } from '../actions/addNewItemActions'
import { firebaseApp, database } from '../firebase/firebaseApp'
import store from '../store/createStore'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddNewItemTextInput from './AddNewItemTextInput';
import CheckBox from 'react-native-checkbox';
import CreateSimpleAlert from '../alerts/createSimpleAlert'
var ImagePicker = require('react-native-image-picker');
var Platform = require('react-native').Platform;

const user = {
			userName: "Olivia the Great",
			uid: "7BU605n3yDMci6fafU7iPIZUJhk1",
			college: "hmc_edu"
}


const closeIcon = (<Icon name="close" size={20} color="#0f0" />)
const addIcon = (<Icon name="add" size={20} color="#0f0" />)

const RowNoPic = ({index, itemName, itemPrice, itemDescription, tag}) => {
  return <View style={styles.container}>
            <ItemName style={styles.inputs}
                      placeholder='Item Name'
                      input='itemName'
                      value={itemName}
                      index={index}/>
            <ItemPrice style={styles.inputs}
                       placeholder='Item Price'
                       input='itemPrice'
                       keyboardType='numeric'
                       value={itemPrice}
                       index={index}/>
           <ItemDescription style={styles.description}
                       placeholder='Item Description'
                       input='itemDescription'
                       value={itemDescription}
                       index={index}
                       multiline={true}/>
            <ActivePicker style={styles.activePicker}  index={index} selectedValue={tag}/>
            <DeleteItemButton icon={closeIcon} index={index}/>
        </View>
}

const Row = ({index, itemName, itemPrice, itemDescription, image, tag}) => {
  return <View style={styles.container}>
            <Image style={styles.image}
              source={{uri: image}}/>
            <ItemName style={styles.inputs}
                      placeholder='Item Name'
                      input='itemName'
                      value={itemName}
                      index={index}/>
            <ItemPrice style={styles.inputs}
                       placeholder='Item Price'
                       input='itemPrice'
                       keyboardType='numeric'
                       value={itemPrice}
                       index={index}/>
           <ItemDescription style={styles.description}
                       placeholder='Item Description'
                       input='itemDescription'
                       value={itemDescription}
                       index={index}
                       multiline={true}/>
            <ActivePicker style={styles.activePicker} index={index} selectedValue={tag}/>
            <DeleteItemButton icon={closeIcon} index={index}/>
          </View>
}

const AddNewItemList = ({dataSource}) => {
  return <ListView
  style={styles.itemList}
  dataSource = {dataSource}
  renderRow = {(rowData) => renderRow(rowData)}
  enableEmptySections={true}
  />
}

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const AddNewItemData = connect((state) =>({
    dataSource: ds.cloneWithRows(state.addNewItemReducer.items)
  }), null
)(AddNewItemList)

const AlbumName = connect((state) => ({
  value: state.addNewItemReducer.albumName
})
, (dispatch) => ({
  onChangeText: (text, input, index) => {
    dispatch(typingNewItem(text, input, index))
  }
}))(AddNewItemTextInput);

const ItemName = connect(null
, (dispatch) => ({
  onChangeText: (text, input, index) => {
    dispatch(typingNewItem(text, input, index))
  }
}))(AddNewItemTextInput);

const ItemDescription = connect(null
, (dispatch) => ({
  onChangeText: (text, input, index) => {
    dispatch(typingNewItem(text, input, index))
  }
}))(AddNewItemTextInput);

const ItemPrice = connect(null
, (dispatch) => ({
  onChangeText: (text, input, index) => {
    dispatch(typingNewItem(text, input, index))
  }
}))(AddNewItemTextInput);

const AddNewItemButton = ({icon, onPress, style}) => (
  <TouchableHighlight
    style={style}
    underlayColor='#35b5ff'
    onPress={onPress}>
    {icon}
  </TouchableHighlight>
)

const DeleteButton = ({icon, onPress, style, index}) => (
  <TouchableHighlight
    style={style}
    underlayColor='#35b5ff'
    onPress={() => onPress(index)}>
    {icon}
  </TouchableHighlight>
)

const DeleteItemButton = connect(null,
(dispatch) => ({
  onPress: (index) => {
    dispatch(removedItem(index))
  }
}))(DeleteButton)


const IsoCheck = ({checked, onChange, containerStyle}) => (
  <CheckBox
  containerStyle={containerStyle}
  label='ISO?'
  checked={checked}
  onChange={onChange}
  />
)

const ActiveIsoCheck = connect((state) => ({
  checked: state.addNewItemReducer.toggle
}),
(dispatch) => ({
  onChange: () => dispatch(toggleISO())
}))(IsoCheck)

const SaveButton = () => (
  <TouchableHighlight
    underlayColor='#35b5ff'
    onPress={saveInDatabase}
    style={styles.saveButton}>
    <Text>
      Save
    </Text>
  </TouchableHighlight>
)

const TagPicker = ({selectedValue, onValueChange, index, style}) => (
  <Picker
    style={style}
    selectedValue={selectedValue}
    onValueChange={(value) => onValueChange(value, index)}>
    <Picker.Item label="Appliances" value="appliances" />
    <Picker.Item label="Electronics" value="electronics" />
    <Picker.Item label="Fashion" value="fashion" />
    <Picker.Item label="Furniture" value="furniture" />
    <Picker.Item label="None" value="none" />
    <Picker.Item label="Services" value="services" />
    <Picker.Item label="In Search Of" value="inSearchOf" />
    <Picker.Item label="Other" value="other" />
    <Picker.Item label="School Supplies" value="schoolSupplies" />
    <Picker.Item label="Transportation" value="transportation" />
  </Picker>
)

const TagAll = ({selectedValue, onValueChange, style}) => (
  <Picker
    style={style}
    selectedValue={selectedValue}
    onValueChange={(value) => onValueChange(value)}>
    <Picker.Item label="Appliances" value="appliances" />
    <Picker.Item label="Electronics" value="electronics" />
    <Picker.Item label="Fashion" value="fashion" />
    <Picker.Item label="Furniture" value="furniture" />
    <Picker.Item label="None" value="none" />
    <Picker.Item label="Services" value="services" />
    <Picker.Item label="In Search Of" value="inSearchOf" />
    <Picker.Item label="Other" value="other" />
    <Picker.Item label="School Supplies" value="schoolSupplies" />
    <Picker.Item label="Transportation" value="transportation" />
  </Picker>
)

const ActivePicker = connect(null,
(dispatch) => ({
  onValueChange: (value, index) => dispatch(movedPicker(value, index))
}))(TagPicker)

const TagAllFilter = connect((state) => ({
  selectedValue: state.addNewItemReducer.tagAllFilter
}),
(dispatch) => ({
  onValueChange: (value) => dispatch(tagAllMoved(value))
}))(TagAll)

function renderRow(rowData) {
  if (rowData.hasPic) {
    return <Row index={rowData.index}
                itemName={rowData.itemName}
                itemPrice={rowData.price}
                itemDescription={rowData.description}
                image={rowData.pic}
                tag={rowData.tag}
          />
    }
    else {
      return <RowNoPic index={rowData.index}
                       itemName={rowData.itemName}
                       itemPrice={rowData.itemPrice}
                       itemDescription={rowData.description}
                       tag={rowData.tag}
            />
    }
}

const AddNewItemScreen = ({_handleNavigate, _goBack}) => (
  <ScrollView contentContainerStyle={styles.container}>
    <AddNewItemButton style={styles.backIcon}
                      onPress={_goBack}
                      icon={closeIcon}
                       />
    <AddNewItemButton style={styles.addIcon}
                      onPress={openCamera}
                      icon={addIcon}
                      />
    <AlbumName style={styles.albumName} placeholder='albumName'/>
    <AddNewItemData />
    <TagAllFilter style={styles.tagAll} />
    <ActiveIsoCheck containerStyle={styles.isoCheckBox}/>
    <SaveButton style={styles.saveButton}/>
  </ScrollView>
)

function saveInDatabase() {
  //If fields aren't valid, we can't save yet
  if (checkValidityProblems()) {
    return;
  }

  const currentState = store.getState().addNewItemReducer

  //Useful values which will come back later
  const college = user.college;
  const uid = user.uid;
  const userName = user.userName;

  const timestamp = Date.now() * -1; //TODO: Why make it negative?

  //If we are editing an existing album, it will already have an albumKey
  const albumKey = albumID ? albumID : firebase.database().ref().child(college + "/user/" + uid + "/albums").push().key;

  //Object where all the stuff to be saved to the database will be stored
  let childUpdates = {};

  //Save every item into the database
  for (let item of currentState.items) {

    //If we are editing an existing album, some items will already have an imageKey
    const imageKey = item.imageKey ? item.imageKey : firebase.database().ref().child(college + "/user/" + uid + "/unsoldItems").push().key;


    if(item.hasPic) {
      savePic(college, uid, imageKey, item.pic);
    }

    sendKeywordNotifications(item);

    //Store item details in the database in multiple different places (by album, and just by image)
    const detailsUnderAlbums = {
      price: item.price,
      description: item.description,
      tag: item.tag,
      name: item.itemName,
      hasPic: item.hasPic
    }

    const detailsUnderItems = {
      price: item.price,
      description: item.description,
      tag: item.tag,
      sellerId: uid,
      sellerName: userName,
      timestamp: timestamp,
      name: item.itemName,
      albumName: currentState.albumName,
      albumKey: albumKey,
      locationLat: currentState.locationLat ? currentState.locationLat : null,
      locationLong: currentState.locationLong ? currentState.locationLong : null,
      location: currentState.location ? currentState.location : null,
      hasPic: item.hasPic
    }

    childUpdates[college + "/user/" + uid + "/albums/" + albumKey + "/unsoldItems/" + imageKey] = detailsUnderAlbums;
    childUpdates[college + "/albums/" + albumKey + "/unsoldItems/" + imageKey] = detailsUnderAlbums;
    childUpdates[college + "/user/" + uid + "/unsoldItems/" + imageKey] = detailsUnderItems;

  }

  //Store album details
  const albumDetailsUnderUser = {
    albumName: store.getState().addNewItemReducer.albumName,
    timestamp: timestamp,
    locationLat: currentState.locationLat ? currentState.locationLat : null,
    locationLong: currentState.locationLong ? currentState.locationLong : null,
    location: currentState.location ? currentState.location : null
  }

  const albumDetailsUnderCollege = {
    albumName: this.state.albumName,
    sellerID: uid,
    sellerName: userName,
    timestamp: timestamp,
    locationLat: currentState.locationLat ? currentState.locationLat : null,
    locationLong: currentState.locationLong ? currentState.locationLong : null,
    location: currentState.location ? currentState.location : null
  }

  childUpdates[college + "/user/" + uid + "/albums/" + albumKey + "/albumDetails"] = albumDetailsUnderUser;
  childUpdates[college + "/albums/" + albumKey + "/albumDetails"] = albumDetailsUnderCollege;

  database.ref().update(childUpdates);

  //Once it's saved, get bumped back to the feed (or maybe to a 'Success' page) //TODO: Discuss success page
} //TODO: deal with errors in updating.


//Save an image to firebase storage
function savePic(college, uid, imageKey, pic) {
const storageRef = firebase.storage().ref().child(college + "/user/" + uid + "/images/" + imageKey);
storageRef.put(pic).then(function(snapshot) {
}).catch(function(error) {
  CreateSimpleAlert('Error', error.message)
});
}

function sendKeywordNotifications(item) {
//TODO: Do this
}


//Make sure the required fields are filled
//		- All albums need names
//		- All items need names
//		- All ISO items need descriptions
//		- All non-ISO items need prices and pictures
function checkValidityProblems() {
const currentState = store.getState().addNewItemReducer
//Check whether there are any unnamed items or items without prices
if(currentState.albumName === "") {
  CreateSimpleAlert('Error', 'Please enter an album name!')
  return true
}
for (let item of currentState.items) {
  if (item.itemName === "") {
    CreateSimpleAlert('Error', 'Please make sure all items have names!')
    return true
  }
  if (currentState.toggle && item.description === "") {
    CreateSimpleAlert('Error', 'Please give your ISO a description')
    return true
  }
  if (!currentState.toggle && item.price === "") {
    CreateSimpleAlert('Error', 'Please make sure all items have a price!')
    return true
  }
  if (!currentState.toggle && item.pic === null) {
    CreateSimpleAlert('Error', 'Please make sure all items have a picture')
    return true
  }
}
return false
}

function openCamera() {
  var options = {
  title: 'Select Picture',
  customButtons: [
    {name: 'noPic', title: 'Post Item Without Picture'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
  };

  ImagePicker.showImagePicker(options, (response) => {
  if (response.didCancel) {
    return
  }
  else if (response.error) {
    return CreateSimpleAlert('Error', response.error)
  }
  else if (response.customButton) {
    store.dispatch(addedItem('noPic', null))
  }
  else {
    let source;

    // You can display the image using either data...
    // source = { uri: 'data:image/jpeg;base64,' + response.data };

    // Or a reference to the platform specific asset location
    if (Platform.OS === 'android') {
      source = { uri: response.uri };
    } else {
      source = { uri: response.uri.replace('file://', '') };
    }

    store.dispatch(addedItem('pic', source.uri))

  }
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 5
  },
  image: {
    height: 80,
    width: 80
  },
  addIcon: {
    alignSelf: 'flex-end',
    marginTop: -15,
    marginRight: 5
  },
  albumName: {
    margin: 5,
    height: 30
  },
  itemsList: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10
  },
  inputs: {
    height: 15,
    marginBottom: 2,
    marginTop: 2,
    marginLeft: 5,
    marginRight: 5
  },
  description: {
    height: 80,
    marginBottom: 2,
    marginTop: 2,
    marginLeft: 5,
    marginRight: 5
  },
  removeIcon: {
    marginTop: 2,
    alignSelf: 'center'
  },
  activePicker: {
    marginTop: 5,
    width: 200
  },
  tagAll: {
    width: 200
  },
  isoCheckBox: {
    marginTop: 5,
    alignSelf: 'center'
  },
  saveButton: {
    height: 40,
    marginTop: 5,
    alignSelf: 'center'
  }
})

export default AddNewItemScreen
