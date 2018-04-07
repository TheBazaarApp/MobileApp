//Close up view is passed in an image, and has functionality for buying, or messaging the seller



const CloseUpViewScreen = (image, handleNavigate_, goBack_, onPress) => (
  <View style = {styles.container}>
    <Image
      style={styles.image}
      source={{uri: image}}
      defaultSource={
        require('../placeholderImages/loadingImage.gif'),
        {width},
        320
      }
    />
    <Button
      title={"Buy"}
      onPress={onPress}
    />
    <
)

const DetailsTextBox = (seller, itemName, price, description) => (
  <View style = {styles.textView}>
    <Text style={styles.text}>
      {seller}
    </Text>
    <Text style={styles.text}>
      {itemName}
    </Text>
    <Text style={styles.text}>
      {price}
    </Text>
    <Text style={styles.text}>
      {description}
    </Text>
  </View>
)

const DetailsTextBoxContainer = connect((state) => ({
  seller: state.closeUpViewReducer.currItem.sellerName,
  itemname: state.closeUpViewReducer.currItem.name,
  price: state.closeUpViewReducer.currItem.price,
  description: state.closeUpViewReducer.currItem.description
}))
