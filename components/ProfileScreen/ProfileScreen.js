import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Button
} from 'react-native'
import { firebaseApp } from '../firebase/firebaseApp'
import NavigationBar from 'react-native-navigation-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';

var {height, width} = Dimensions.get('window');


const route = {
  type: 'push',
  route: {
    key: 'profile',
    title: 'Profile'
  }
}

const ProfilePic = ({pic}) {
  return <Image
            style={styles.profilePic}
            source={{uri: pic}}
          />
}

const StarsList = ({data}) => {
  return <FlatList
            data={data}
            renderItem={(data) => renderItem(data)}
            style={styles.starsList}
        </FlatList>
}

function renderItem(data) {
  if (data == 1) {
    return <Icon name="star" size={25} color="#900" />
  }
  if (.5 < data < 1) {
    return <Icon name="half star" size={30} color="#900" />
  }
  if (data == 0) {
    return <Icon name="rocket" size={30} color="#900" />
  }
}

const RatingsList = connect((state) => ({
  data: state.profileReducer.rating
}))(starsLists)

const ProfilePicImage = connect((state) =>({
  pic: state.profileReducer.profilePic
}))(ProfilePic)

// TODO: Maybe make this a list view to avoid making 9 images
const UnSoldImage1 = connect((state) => ({
  pic: state.profileReducer.unsoldItems[0]
}))(ProfileImage)
const UnSoldImage2 = connect((state) => ({
  pic: state.profileReducer.unsoldItems[0]
}))(ProfileImage)
const UnSoldImage3 = connect((state) => ({
  pic: state.profileReducer.unsoldItems[0]
}))(ProfileImage)
const SoldImage1 = connect((state) => ({
  pic: state.profileReducer.soldItems[0]
}))(ProfileImage)
const SoldImage2 = connect((state) => ({
  pic: state.profileReducer.soldItems[0]
}))(ProfileImage)
const SoldImage3 = connect((state) => ({
  pic: state.profileReducer.soldItems[0]
}))(ProfileImage)
const PurchasddImage1 = connect((state) => ({
  pic: state.profileReducer.purchasedItems[0]
}))(ProfileImage)
const PurchasedImage2 = connect((state) => ({
  pic: state.profileReducer.purchasedItems[0]
}))(ProfileImage)
const PurchasedImage3 = connect((state) => ({
  pic: state.profileReducer.purchasedItems[0]
}))(ProfileImage)

const ProfileScreen = ({_handleNavigate, _goBack}) => (
  <View style={styles.container}>
    <NavigationBar
        title={'Profile'}
        height={44}
        titleColor={'#fff'}
        backgroundColor={'#149be0'}
        leftButtonTitle={'Edit Albums'}
        leftButtonTitleColor={'#fff'}
        onLeftButtonPress={_goBack}
        rightButtonTitle={'Edit Profile'}
        rightButtonTitleColor={'#fff'}
        onRightButtonPress={_goBack}
      />
    <ScrollView style = styles.scrollView>
      <View>
        <RatingsList/>
        <ProfilePicImage/>
      </View>
      <Text style={styles.imageLabel}>"Unsold Items"</Text>
      <View style={styles.imageContainer}>
        <UnSoldImage1 style={styles.imageView}>
        <UnSoldImage2 style={styles.imageView}>
        <UnSoldImage3 style={styles.imageView}>
      <View/>
      <Text style={styles.imageLabel}>"Unsold Items"</Text>
      <View style={styles.imageContainer}>
        <UnSoldImage1 style={styles.imageView}>
        <UnSoldImage2 style={styles.imageView}>
        <UnSoldImage3 style={styles.imageView}>
      <View/>
      <Text style={styles.imageLabel}>"Unsold Items"</Text>
      <View style={styles.imageContainer}>
        <UnSoldImage1 style={styles.imageView}>
        <UnSoldImage2 style={styles.imageView}>
        <UnSoldImage3 style={styles.imageView}>
      <View/>
      <Button
      <Button
        onPress={() => {logout()}
        title="Logout"
        />
    </View>
)

function logout() {
  firebaseApp.auth().signOut()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 800
  },
  starsView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  starsList: {
    horizontal: true
  },
  scrollView: {
    flex: 1,
  },
  profilePic: {
    height: 80,
    borderRadius: 40,
    width: 80
  },
  profileBackgroud: {
    width: width,
    backgroundColor: '149be0',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageLabel: {
    fontSize: 14,
    alignSelf: 'flex-start'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  imageView: {
    marginHorizontal: 5
  },
  logutButton: {
    marginVertical: 10
  }
})

export default ProfileScreen
