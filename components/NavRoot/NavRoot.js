import React, { Component } from 'react'
import SignUpScreen from '../SignUpScreen/SignUpScreen.js'
import LoginScreen from '../LoginScreen/LoginScreen.js'
import DomainScreen from '../DomainScreen/DomainScreen'
import CollegeTradingScreen from '../CollegeTradingScreen/CollegeTradingScreen'
import FeedScreen from '../FeedScreen/FeedScreen'
import AddNewItemScreen from '../AddNewItem/AddNewItemScreen'
import { firebaseApp, database } from '../firebase/firebaseApp'
import store from '../store/createStore'
import { deletedAlbum, updatedAlbum, newAlbumCreated, pictureRequestCompleted, pictureRequestFailed } from '../actions/feedActions'


import {
  BackAndroid,
  NavigationExperimental
} from 'react-native'

const {
  CardStack: NavigationCardStack
} = NavigationExperimental

class NavRoot extends Component {
  constructor (props) {
    super(props)
    this._renderScene = this._renderScene.bind(this)
    this._handleBackAction = this._handleBackAction.bind(this)
  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
  }
  _renderScene (props) {
    const { route } = props.scene
    // Different route keys will allow rendering of screens
    if (route.key === 'signup') {
      return <SignUpScreen _handleNavigate={this._handleNavigate.bind(this)} />
    }
    if (route.key === 'login') {
      return <LoginScreen _goBack={this._handleBackAction.bind(this)}
              _handleNavigate={this._handleNavigate.bind(this)}
              />
    }
    if (route.key === 'domain') {
      return <DomainScreen _handleNavigate={this._handleNavigate.bind(this)}
              collegeName = {route.title}
              />
    }
    if (route.key === 'collegeTrading') {
      return <CollegeTradingScreen _goBack={this._handleBackAction.bind(this)}
              _handleNavigate={this._handleNavigate.bind(this)}
              college={route.title}
              />
    }
    if (route.key === 'feed') {
      // User state passed into listenToColleges so that we can find the
      // correct things in database

      // State that is passed into feed FUNCTIONS
      // TODO: pass state into the feed from the previous screen
      var userState = {
      	albums: [],
      	user: user, //Null when not logged in //The current default is Olivia
      	tradingList: ["hmc_edu"]
      }
      listenToColleges(userState)
      return <FeedScreen _goBack={this._handleBackAction.bind(this)}
              _handleNavigate={this._handleNavigate.bind(this)}
              />
    }
    if (route.key === 'addnewitem') {
      return <AddNewItemScreen _goBack={this._handleBackAction.bind(this)}
              _handleNavigate={this._handleNavigate.bind(this)}
              />
    }

    if (route.key == 'profile') {
      return
    }

    if (route.key == 'editProfile') {
      return
    }

    if (route.key == 'editProfileMapView') {
      return
    }

    if (route.key == 'closeup') {
      return <CloseUpView _goBack={this._handleBackAction.bind(this)}
              _handleNavigate={this._handleNavigate.bind(this)}
              />
    }
    if (route.key == 'viewAlbums') {
      return
    }
    if (route.key == 'viewItems') {
      return
    }
    
  }

  _handleBackAction () {
    if (this.props.navigation.index === 0) {
      return false
    }
    this.props.popRoute()
    return true
  }
  _handleNavigate (action) {
    switch (action && action.type) {
      case 'push':
        this.props.pushRoute(action.route)
        return true
      case 'back':
      case 'pop':
        return this._handleBackAction()
      default:
        return false
    }
  }
  render () {
    return (
      <NavigationCardStack
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate.bind(this)}
        renderScene={this._renderScene} />
    )
  }
}

const user = {
			userName: "Olivia the Great",
			uid: "7BU605n3yDMci6fafU7iPIZUJhk1",
			college: "hmc_edu"
}

var state = {
	albums: [],
	user: user, //Null when not logged in //The current default is me (Olivia)
	tradingList: ["hmc_edu"]
}

//////////////////////////////////////////////////////////////////////
////////////                                                //////////
////////////                FEED FUNCTIONS                  //////////
////////////                                                //////////
//////////////////////////////////////////////////////////////////////

var numTimes = 0
//Listen for items for sale from each college the user is following
function listenToColleges() {
  if (numTimes === 0) {
  numTimes++
	for (const college of state.tradingList) {
		const feedRef = database.ref().child(college + "/albums");
		createChildAddedListener(feedRef, college);
		createChildChangedListener(feedRef, college);
		createChildRemovedListener(feedRef);
	}
}
}

//TODO: Maybe hide image until it shows up
function createChildAddedListener(feedRef, college) {
	//const improveFeedRef = feedRef.queryOrderedByChild("albumDetails/timestamp");
	feedRef.on('child_added', function(snapshot) {
    console.log("We have an album!")
		let album = createAlbum(snapshot, college);
    console.log(album.albumName)
    store.dispatch(newAlbumCreated(album))
	})
}

function createChildChangedListener(feedRef, college) {
	feedRef.on('child_changed', function(snapshot) {
		let album = createAlbum(snapshot, college);
    store.dispatch(updatedAlbum(album.albumID))
	})
}

//Take in a snapshot and the college.Create and return an album object
function createAlbum(snapshot, college) { //TODO: For the moment, we're not counting to see if the album needs to be deleted
	//Album details
	var newAlbum = {
		unsoldItems: [],
		albumID: snapshot.key,
		albumName: snapshot.child('albumDetails/albumName').val(),
		sellerID: snapshot.child('albumDetails/sellerID').val(),
		sellerName: snapshot.child('albumDetails/sellerName').val(),
		sellerCollege: college,
		locationLat: snapshot.child('albumDetails/locationLat').val(), //TODO: Coult be problematic if these don't exist
		locationLong: snapshot.child('albumDetails/locationLong').val(),
		location: snapshot.child('albumDetails/location').val(),
		timestamp: snapshot.child('albumDetails/timestamp').val()
	};
	//Add Items to the album
	var itemList = snapshot.child('unsoldItems');
	itemList.forEach(function(itemInfo) {
		var newItem = {
			imageKey: itemInfo.key,
			description: itemInfo.child('description').val(),
			tag: itemInfo.child('tag').val(),
			name: itemInfo.child('name').val(),
			price: itemInfo.child('price').val(),
			picture: 'https://firebasestorage.googleapis.com/v0/b/bubbleu-app.appspot.com/o/hmc_edu%2Fuser%2F3eeJ7tnMZNSq4eF2LkpVGnpPe2q2%2Fimages%2F-KUKRtdbPJsNtr3WytVk?alt=media&token=e9a04c2b-7f00-4456-8adb-d88ab8d6b856', //TODO: take this out
      sellerName: snapshot.child('albumDetails/sellerName').val(),
      hasPic: true, //Default, ISOs may be exceptions to this
      requestCompleted: false
		}
		//Some ISOs don't have pics
		//TODO: Only have to do this once
		newAlbum.isISO = (newItem.tag === "In Search Of");
		if (newAlbum.isISO) {
			if (itemInfo.child('hasPic').val()) {
				newItem.hasPic = false;
			}
		}
		if (newItem.hasPic) {
			getImage(newItem, newAlbum, 0); //TODO: Would be more efficient if we only called this when needed
		}

    newAlbum.unsoldItems.push(newItem);
	})
  return newAlbum
}

function createChildRemovedListener(feedRef) {
	feedRef.on('child_removed', function(snapshot) {
		const deletedAlbumID = snapshot.key;
    store.dispatch(deletedAlbum(deletedAlbumID))
	})
}


function getImage(item, album, numTries) {
	const imageRef = firebaseApp.storage().ref().child(album.sellerCollege + '/user/' + album.sellerID + '/images/' + item.imageKey);
	imageRef.getDownloadURL().then(function(url) {
		item.picture = url;
    item.requestCompleted = true;
    store.dispatch(pictureRequestCompleted(album.albumID, item.imageKey, url))
	}).catch(function(error) {
    if (numTries < 3) {
      getImage(item, album, numTries++)
    }
		console.log("didn't get pic :()" + error.message);
    item.picture = null;
    item.requestCompleted = true;
    store.dispatch(pictureRequestFailed(album.albumID, item.imageKey))
    //TODO: Later on, make it repeat a few times if it isn't loading.
	});
}


export default NavRoot
