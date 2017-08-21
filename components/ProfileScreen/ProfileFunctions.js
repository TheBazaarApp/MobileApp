//////////////////////////////////////////////////////////////////////
////////////                                                //////////
////////////                PROFILE FUNCTIONS               //////////
////////////                                                //////////
//////////////////////////////////////////////////////////////////////

function getProfile(user) {
  getProfilePic(user)
  getProfileInfo(user)
  getItemsForSale(user, 'unsoldItems')
  getItemsForSale(user, 'purchasedItems')
  getItemsForSale(user, 'soldItems')
}

//Get the user's profile pic, save it to the state
function getProfilePic(user) {
  const storageRef = firebase.storage().ref();
  var imageRef = storageRef.child(user.domain + '/user/' + user.uid + '/ProfilePic');
  imageRef.getDownloadURL().then(function(url) {
    store.dispath(profilePic(url))
  }
}


//Get the user's personal profile info, save it to the state
getProfileInfo(user) {
  const profileRef = getProfilePath(user).child('profile');
  profileRef.on('value', function(snapshot) {
    if (snapshot) {
      console.log("Got a snapshot!" + snapshot);
      const name = snapshot.val().name;
      const rating = snapshot.val().rating;
      const collegeName = "Harvey Mudd College"; //TODO: Get this from their email domain
      store.dispatch(gotProfileName(name))
      store.dispatch(gotProfileRating(rating))
    }
  }
}

// Return a database reference to the user's profile.
function getProfilePath(user) {
  return firebase.database().ref( user.domian + '/user/' + user.uid)
}

function getItemsForSale(user, path) {
  var counter = 0
	getProfilePath(user).child(path).orderByKey().once('value').then(function(snapshot) {
		snapshot.forEach(function(item) {
      // Get three items to display on the profile
      if (counter <= 3) {
  			const key = item.key;
  			const albumID = item.child('albumKey').val();
  			getItem(user, key, albumID, path);
        counter += 1
      }
      else {
        return
      }
		});
	});
}

getItem(user, key, albumid, path) {
	const imageRef = firebase.storage().ref().child(user.domain + '/user/' + user.uid + path + key);
	imageRef.getDownloadURL().then(function(url) {
		console.log("got an unsold item");
    store.dispatch(profileViewImage(path, url));
	}).catch(function(error) { //TODO: Take out this catch phrase; make the unsold item just not show up.
		console.log("too bad, couldn't get it");
	});
}
