const initialState = {
  name: '',
  rating: [0, 0, 0, 0, 0],
  unsoldItems: [],
  soldItems: [],
  purchasedItems: [],
  profilePic: require('../placeholderImages/loadingImage.gif')
}

PROFILE_PIC = 'PROFILE_PIC'
PROFILE_VIEW_IMAGE = 'PROFILE_VIEW_IMAGE'
PROFILE_NAME = 'PROFILE_NAME'
PROFILE_RATING = 'PROFILE_RATING'
SOLD_ITEM = '/soldItems/'
UNSOLD_ITEM = '/unsoldItem/'
PURCHASED_ITEM = '/purchasedItems/'

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_PIC:
      return {...state, profilePic: action.image}
    case PROFILE_VIEW_IMAGE:
      switch (action.kind) {
        case SOLD_ITEM:
          var newState = Object.assign({}, state)
          newState.soldItems.push(action.image)
          return newState
        case UNSOLD_ITEM:
          var newState = Object.assign({}, state)
          newState.unsoldItems.push(action.image)
          return newState
        case PURCHASED_ITEM:
          var newState = Object.assign({}, state)
          newState.purchasedItems.push(action.image)
          return newState
        }
    case PROFILE_NAME:
      return {...state, name: action.name}
    case PROFILE_RATING:
      var newRating = []
      var stars = action.rating
      for (var i = 0; i < 5; i++) {
        if (stars >= 1) {
          newRating[i] = 1
          stars -= 1
          continue
        }
        if (0 < stars < 1) {
          newRating[i] = stars
          stars = 0
          break
        }
        if (stars == 0) {
          break
        }
      }
      return {...state, rating: newRating}
  }
}
