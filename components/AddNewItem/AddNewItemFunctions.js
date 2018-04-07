// class AddNewItemFunctions {
// 	//Updates state to show that an item's name is changed
// 	handleNameChange(newName, index) {
// 		if (newName.length <= 40) {
// 			let items = this.state.items;
// 			items[index].itemName = newName;
// 			this.setState({
// 				items: items
// 			});
// 		}
// 	}
//
// 	//TODO: If there isn't anything to modify here, create a helper function to deal with all of these
// 	//Updates state to show that an item's description is changed
// 	handleDescriptionChange(newDescription, index) {
// 		let items = this.state.items;
// 		items[index].description = newDescription;
// 		this.setState({
// 			items: items
// 		})
// 	}
//
// 	//TODO: Ensure price is in the correct format
// 	//Updates state to show that an item's price is changed
// 	handlePriceChange(newPrice, index) {
// 		let items = this.state.items;
// 		items[index].price = newPrice;
// 		this.setState({
// 			items: items
// 		})
// 	}
//
// 	//Updates state to show that an item's tag is changed
// 	handleTagChange(newTag, index) {
// 		if (!this.state.tagAll) { //If no tag all selection
// 			let items = this.state.items;
// 			items[index].tag = newTag;
// 			this.setState({
// 				items: items
// 			})
// 		} else {
// 			if (!this.state.isISO) {
// 				this.setState({
// 					showTagAllPopup: true
// 				})
// 			}
// 		}
// 	}
//
// 	//Updates state to show that an item's pic is changed
// 	handlePicChange(files, index) {
// 		if(files && files[0]) { //Make sure we actually got something //TODO: Is this necesary?
// 			var reader = new FileReader();
// 			reader.onload = (event) => {
// 				let items = this.state.items;
// 				items[index].pic = event.target.result;
// 				items[index].file = files[0];
// 				this.setState({
// 					items: items
// 				})
// 			}
// 			reader.readAsDataURL(files[0]);
// 		}
// 	}
//
// 	//Updates state to show that the album name is changed
// 	handleAlbumChange(event) {
// 		this.setState({
// 			albumName: event.target.value
// 		});
// 	}
//
// 	//When you add a new item, update state with a new item with default values
// 	addNewItem() {
// 		const newItem = {itemName: "", tag: "None", description:"", price:"", pic:""};
// 		this.setState((prevState, props) => ({
// 			items: prevState.items.concat(newItem)
// 		}))
// 	}
//
// 	//Remove an item's pic
// 	removePic(index) {
// 		let items = this.state.items;
// 		items[index].pic = null;
// 		this.setState({
// 			items: items
// 		})
// 	}
//
// 	//Remove an item
// 	removeItem(index) {
// 		let items = this.state.items;
// 		if (items.length > 1) {
// 			items.splice(index, 1);
// 			this.setState({
// 				items: items
// 			})
// 		}
// 	}
//
// 	//Update state when the tag all field gets changed
// 	updateTagAll(value) {
// 		let items = this.state.items;
// 		for (let i = 0; i < items.length; i++) {
// 			items[i].tag = value;
// 		}
// 		this.setState({
// 			tagAll: value,
// 			items: items
// 		})
// 	}
//
// 	//Close whatever popups are open
// 	closePopups() {
// 		this.setState({
// 			showTagAllPopup: false,
// 			showMissingFieldsPopup: false
// 		})
// 	}
//
//
// 	//Save a new album and all of the items in it to our database
// 	addNewAlbum() {
//
// 		//If fields aren't valid, we can't save yet
// 		if (this.checkValidityProblems()) {
// 			return;
// 		}
//
// 		//Useful values which will come back later
// 		const college = this.props.user.college;
// 		const uid = this.props.user.uid;
// 		const userName = this.props.user.userName;
//
// 		const timestamp = Date.now() * -1; //TODO: Why make it negative?
//
// 		//If we are editing an existing album, it will already have an albumKey
// 		const albumKey = (this.props.albumID) ? this.props.albumID : firebase.database().ref().child(college + "/user/" + uid + "/albums").push().key;
//
// 		//Object where all the stuff to be saved to the database will be stored
// 		let childUpdates = {};
//
// 		//Save every item into the database
// 		for (let item of this.state.items) {
//
// 			//If we are editing an existing album, some items will already have an imageKey
// 			const imageKey = item.imageKey ? item.imageKey : firebase.database().ref().child(college + "/user/" + uid + "/unsoldItems").push().key;
//
//
// 			if(item.pic) {
// 				this.savePic(college, uid, imageKey, item.file);
// 			}
//
// 			this.sendKeywordNotifications(item);
//
// 			//Store item details in the database in multiple different places (by album, and just by image)
// 			const detailsUnderAlbums = {
// 				price: item.price,
// 				description: item.description,
// 				tag: item.tag,
// 				name: item.itemName,
// 				hasPic: (item.pic != null)
// 			}
//
// 			const detailsUnderItems = {
// 				price: item.price,
// 				description: item.description,
// 				tag: item.tag,
// 				sellerId: uid,
// 				sellerName: userName,
// 				timestamp: timestamp,
// 				name: item.itemName,
// 				albumName: this.state.albumName,
// 				albumKey: albumKey,
// 				locationLat: this.state.locationLat ? this.state.locationLat : null,
// 				locationLong: this.state.locationLong ? this.state.locationLong : null,
// 				location: this.state.location ? this.state.location : null,
// 				hasPic: (item.pic != null)
// 			}
//
// 			childUpdates[college + "/user/" + uid + "/albums/" + albumKey + "/unsoldItems/" + imageKey] = detailsUnderAlbums;
// 			childUpdates[college + "/albums/" + albumKey + "/unsoldItems/" + imageKey] = detailsUnderAlbums;
// 			childUpdates[college + "/user/" + uid + "/unsoldItems/" + imageKey] = detailsUnderItems;
//
// 		}
//
// 		//Store album details
// 		const albumDetailsUnderUser = {
// 			albumName: this.state.albumName,
// 			timestamp: timestamp,
// 			locationLat: this.state.locationLat ? this.state.locationLat : null,
// 			locationLong: this.state.locationLong ? this.state.locationLong : null,
// 			location: this.state.location ? this.state.location : null
// 		}
//
// 		const albumDetailsUnderCollege = {
// 			albumName: this.state.albumName,
// 			sellerID: uid,
// 			sellerName: userName,
// 			timestamp: timestamp,
// 			locationLat: this.state.locationLat ? this.state.locationLat : null,
// 			locationLong: this.state.locationLong ? this.state.locationLong : null,
// 			location: this.state.location ? this.state.location : null
// 		}
//
// 		childUpdates[college + "/user/" + uid + "/albums/" + albumKey + "/albumDetails"] = albumDetailsUnderUser;
// 		childUpdates[college + "/albums/" + albumKey + "/albumDetails"] = albumDetailsUnderCollege;
//
// 		firebase.database().ref().update(childUpdates);
//
// 		//Once it's saved, get bumped back to the feed (or maybe to a 'Success' page) //TODO: Discuss success page
// 		this.goToFeed();
// 	} //TODO: deal with errors in updating.
//
//
// 	//Navigate to feed
// 	goToFeed(imageKey) {
// 		const path = "/feed";
// 		browserHistory.push(path);
// 	}
//
// 	//Save an image to firebase storage
// 	savePic(college, uid, imageKey, pic) {
// 		const storageRef = firebase.storage().ref().child(college + "/user/" + uid + "/images/" + imageKey);
// 		storageRef.put(pic).then(function(snapshot) {
// 		}).catch(function(error) {
// 			console.log("pic upload failed" + error);
// 		});
// 	}
//
// 	sendKeywordNotifications(item) {
// 		//TODO: Do this
// 	}
//
//
// 	//Make sure the required fields are filled
// 	//		- All albums need names
// 	//		- All items need names
// 	//		- All ISO items need descriptions
// 	//		- All non-ISO items need prices and pictures
// 	checkValidityProblems() {
// 		//Check whether there are any unnamed items or items without prices
// 		let problems = false;
// 		if(this.state.albumName === "") {
// 			problems = true;
// 		}
// 		for (let item of this.state.items) {
// 			if(item.itemName === "" || (this.state.isISO && item.description === "") || (!this.state.isISO && (item.price === "" || item.pic === null)) ) {
// 				problems = true;
// 			}
// 		}
// 		if (problems) {
// 			let items = this.state.items;
// 			for (let i = 0; i < items.length; i++) {
// 				items[i].highlighted = true;
// 			}
// 			this.setState({
// 				showMissingFieldsPopup: true,
// 				highlighted: true,
// 				items: items
// 			})
// 		}
// 		return(problems);
// 	}
//
//
// }
