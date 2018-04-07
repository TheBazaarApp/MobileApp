import MapView from 'react-native-maps';
import Prompt from 'react-native-prompt';
import React from 'react';

const MapScreen = ({region, onRegionChange, coordinate, title}) {
  return <MapView
            region={region}
            onRegionChange={onRegionChange}
            onPress={() => selectedRegion}
          >
          <MapView.Marker
            coordinate={coordinate}
            title={title}
          />
          </MapView>
}

const MapScreenContainer = connect((state) => ({
  region: state.editProfileMapViewReducer.region
  coordinate: state.editProfileMapViewReducer.markerCoordinate
  title: state.editProfileMapViewReducer.markerTitle
  onPress: {(coordinate, position) => selectedRegion(coordinate, position)}
}), (dispatch) => ({
  onRegionChange: (region) => {
    dispatch(changedRegion(region));
  }
  onPress: {(coordinate, position) => dispatch(selectedMapRegion(coordinate))}
})) (MapScreen)

const TitlePrompt = ({isVisible, onCancel, onSubmit}) {
  return <Prompt
            title="Enter a name for this location"
            placholder="Start typing"
            defaultValue=""
            visible={isVisible}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
}

const TitlePromptContainer = connect((state) => ({
  isVisible:state.editProfileMapViewReducer.promptVisible
}), (dispatch) => ({
  onCancel: { () => dispatch(canceledMapSelect())}
  onSubmit: { (value) => dispatch(changedMarkerTitle(value))}
})) (TitlePrompt)

const EditProfileMapViewScreen = (_handleNavigate, _goBack) => (
  <View style = {styles.container}>
    <NavigationBar
      title={'Select your default location'}
      height={44}
      titleColor={'#fff'}
      backgroundColor={'#149be0'}
      leftButtonTitle={'Back'}
      leftButtonTitleColor={'#fff'}
      onLeftButtonPress={_goBack}
      rightButtonTitle={'Save'}
      rightButtonTitleColor={'#fff'}
      onRightButtonPress={() => saveInDatabase(_handleNavigate)}
    />
    <MapScreenContainer />
  </View>
)

function saveInDatebase(handleNavigate) {
  // Save the current marker region as the user default location in the database
  // Then navigates back to the profile
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default EditProfileMapViewScreen
