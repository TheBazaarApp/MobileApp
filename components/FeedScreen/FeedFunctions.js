
//////////////////////////////////////////////////////////////////////
////////////                                                //////////
////////////                FEED FUNCTIONS                  //////////
////////////                                                //////////
//////////////////////////////////////////////////////////////////////

//Listen for items for sale from each college the user is following
function listenToColleges(userState) {
	for (const college of userState.tradingList) {
		// Each item will show up under the feedRef with a unique key
		const feedRef = firebase.database().ref().child(college + "/albums");
		createChildAddedListener(feedRef, college);
		createChildChangedListener(feedRef, college);
		createChildRemovedListener(feedRef);
	}
}

// TODO: Maybe hide image until it shows up
function createChildAddedListener(feedRef, college) {
	//const improveFeedRef = feedRef.queryOrderedByChild("albumDetails/timestamp");

	// Snapshot is obtained for each child of feedRef
	feedRef.on('child_added', function(snapshot) {
		let album = createAlbum(snapshot, college);
    store.dispatch(newAlbumCreated(album))
	}
}

function createChildChangedListener(feedRef, college) {
	feedRef.on('child_changed', function(snapshot) {
		let album = createAlbum(snapshot, college);
    store.dispatch(updatedAlbum(album.albumID))
	}
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
		locationLong: snapshot.child('albumDetails/sellerName').val(),
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
			picture: itemInfo.child('pictureUrl'), //TODO: take this out
			hasPic: true //Default, ISOs may be exceptions to this
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
			getImage(newItem, newAlbum); //TODO: Would be more efficient if we only called this when needed
		}
    newAlbum.unsoldItems.push(newItem);
	}
}

function createChildRemovedListener(feedRef) {
	feedRef.on('child_removed', function(snapshot) {
		const deletedAlbumID = snapshot.key;
    store.dispatch(deletedAlbum(deletedAlbumID))
	}
}


function getImage(item, album) {
	const imageRef = firebase.storage().ref().child(album.sellerCollege + '/user/' + album.sellerID + '/images/' + item.imageKey);
	imageRef.getDownloadURL().then(function(url) {
		item.picture = url;
		this.updateAlbum(album);
	}.catch(function(error) {
		console.log("didn't get pic :(" + error.message);
		//TODO: Later on, make it repeat a few times if it isn't loading.
	});
}
