NEW_ALBUM = 'NEW_ALBUM'
UPDATE_ALBUM = 'UPDATE_ALBUM'
DELETED_ALBUM ='DELETED_ALBUM'
SEARCH_FEED = 'SEARCH_FEED'
PICTURE_REQUEST_COMPLETED = 'PICTURE_REQUEST_COMPLETED'
PICTURE_REQUEST_FAILED = 'PICTURE_REQUEST_FAILED'

export function newAlbumCreated (album) {
  return {
    type: NEW_ALBUM,
    album: album
  }
}

export function updatedAlbum (albumID) {
  return {
    type: UPDATE_ALBUM,
    albumID: albumID
  }
}

export function deletedAlbum (albumID) {
  return {
    type: DELETED_ALBUM,
    albumID: albumID
  }
}

export function searchFeed (text) {
  return {
    type: SEARCH_FEED,
    text: text
  }
}

export function pictureRequestCompleted (albumID, imageKey, url) {
  return {
    type: PICTURE_REQUEST_COMPLETED,
    albumID: albumID,
    imageKey: imageKey,
    url: url
  }
}

export function pictureRequestFailed (albumID, imageKey) {
  return {
    type: PICTURE_REQUEST_FAILED,
    albumID: albumID,
    imageKey: imageKey
  }
}
