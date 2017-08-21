PROFILE_PIC = 'PROFILE_PIC'
PROFILE_VIEW_IMAGE = 'PROFILE_VIEW_IMAGE'
PROFILE_NAME = 'PROFILE_NAME'
PROFILE_RATING = 'PROFILE_RATING'

export function profilePic (image) {
  return {
    type: PROFILE_PIC,
    image: image
  }
}

export function profileViewImage (kind, image) {
  return {
    type: PROFILE_VIEW_IMAGE,
    kind: kind,
    image: image
  }
}

export function gotProfileName (name) {
  return {
    type: PROFILE_NAME,
    name: name
  }
}

export function gotProfileRating (rating) {
  return {
    type: PROFILE_RATING,
    rating: rating
  }
}
