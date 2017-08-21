//////////////////////////////////////////////////////////////////////
////////////                                                //////////
////////////             Edit PROFILE FUNCTIONS             //////////
////////////                                                //////////
//////////////////////////////////////////////////////////////////////

function getEditProfilePath (user) {
  return firebase.database().ref( user.domian + '/user/' + user.uid + '/profile')
}

function getDefaultLoc (user) {
  getEditProfilePath(user).on('value', function(snapshot) {
    if (snapshot) {
      console.log("Got a snapshot!" + snapshot);
      const loc = snapshot.val().defaultLocation
      const lat = snapshot.val().defaultLatitude
      const long = snapshot.val().defaultLongitude
      const loctionObject = {
        loc: loc,
        lat: lat,
        long: long
      }
      store.dispatch(gotDefaultLoc(locationObject))
    }
}

function saveProfilePic (user, pic) {
  const storageRef = firebase.storage().ref();
  var profilePicRef = storageRef.child(user.domain + '/user/' + user.uid + '/ProfilePic');
  profilePicRef.put(pic).on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

      case 'storage/canceled':
        // User canceled the upload
        break;

      ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, function() {
    // Upload completed successfully, now we can get the download URL
    var downloadURL = uploadTask.snapshot.downloadURL;
  });
}

function saveProfileInfo (user, loc) {
  var newProfileData = {
    defaultLocation: loc,
    defaultLatitude: lat,
    defaultLongitude: long,
    name: name
  }

  var profileKey = getEditProfilePath(user)
  var updates = {}
  updates[profileKey] = newProfileData
  return firebase.database().ref().update(updates)
}
