CHANGED_REGION = 'CHANGED_REGION'
CHANGED_MARKER_REGION = 'CHANGED_MARKER_REGION'
CHANGED_MARKER_TITLE = 'CHANGED_MARKER_TITLE'
SELECTED_MAP_REGION = 'SELECTED_MAP_REGION'

const initalState = {
  region: {
    latitude: 34.1061,
    longitude: 117.7105,
    latitudeDelta: 0,
    longitudeDelta: 0,
  },
  markerTitle: "",
  markerCoordinate:  {
    latitude: 34.1061,
    longitude: 117.7105
  },
  selectedCoordinate: {
    latitude: 0,
    longitude: 0
  },
  promptVisible: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGED_REGION:
      return {...state, region: action.region}
    case CHANGED_MARKER_TITLE:
      return {...state, promptVisible:false,
                markerTitle: action.title,
                markerCoordinate: state.selectedCoordinate}
    case SELECTED_MAP_REGION:
      return {...state,
                selectedCoordinate: action.coordinate,
                promptVisible: true}
    case CANCELED_MAP_SELECT:
      return {...state, promptVisible: false}
  }
}
