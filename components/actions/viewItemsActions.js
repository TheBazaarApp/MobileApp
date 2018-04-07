SELECTED_ALBUM = 'SELECTED_ALBUM'

export function selectedAlbum (item) {
  return {
    type: SELECTED_ALBUM,
    album: item
  }
}
