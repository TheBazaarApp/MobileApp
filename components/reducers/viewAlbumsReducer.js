const initialState = {
  albums: [],
  search: ''
}

NEW_ALBUM = 'NEW_ALBUM'
UPDATE_ALBUM = 'UPDATE_ALBUM'
DELETED_ALBUM ='DELETED_ALBUM'
SEARCH_ALBUMS = 'SEARCH_ALBUMS'
PICTURE_REQUEST_COMPLETED = 'PICTURE_REQUEST_COMPLETED'
PICTURE_REQUEST_FAILED = 'PICTURE_REQUEST_FAILED'


export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_ALBUM:
      var inserted = false;
      var newState = Object.assign({}, state)
    	for (var i = 0; i < newState.albums.length; i++) {
    		const currAlbum = newState.albums[i];
    		if (currAlbum.timestamp > action.album) {
    			newState.albums.splice(i, 0, action.album);
    			inserted = true;
    			break;
    		}
    	}
    	if (!inserted) {
    		newState.albums.push(action.album);
    	}
      return newState
    case UPDATE_ALBUM:
      var newState = Object.assign({}, state)
      for (var [index, album] of newState.albums.entries()) {
    		if (action.albumID === album.albumID) {
    			newState.albums[index] = changedAlbum;
    			break;
    		}
    	}
      return newState
    case DELETED_ALBUM:
      var newState = Object.assign({}, state)
      for (let i = newState.albums.length - 1; i >= 0; i--) {
        if (newState.albums[i].albumID === action.albumID) {
          newState.albums.splice(i, 1);
          break;
        }
      }
      return newState
    case PICTURE_REQUEST_COMPLETED:
      var newState = Object.assign({}, state)
      for (var album of newState.albums) {
    		if (action.albumID === album.albumID) {
          for (var item of album.unsoldItems) {
            if (action.imageKey === item.imageKey) {
              item.picture = action.url
              item.requestCompleted = true;
            }
          }
        }
      }
      return newState
      case PICTURE_REQUEST_FAILED:
        var newState = Object.assign({}, state)
        for (var album of newState.albums) {
      		if (action.albumID === album.albumID) {
            for (var item of album.unsoldItems) {
              if (action.imageKey === item.imageKey) {
                item.picture = null
                item.requestCompleted = true;
              }
            }
          }
        }
        return newState
    case SEARCH_ALBUMS:
      return {...state, search: action.text}
    default:
      return state
  }
}
