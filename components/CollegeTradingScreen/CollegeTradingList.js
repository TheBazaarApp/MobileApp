import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  ListView,
  StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons';


const checkBoxFilled = (<Icon name="check-box" size={20} color="#0f0" />)
const checkOutline = (<Icon name="check-box-outline-blank" size={20} color="#0f0" />)

const Row = ({checkBox, collegeName, onPress, index}) => {
  return <View style={styles.view}>
          <TouchableHighlight
          underlayColor='#35b5ff'
          onPress={() => onPress(index)}
          style={styles.button}>
          <View style={styles.view}>
          {checkBox}
            <Text style={styles.label}>
              {collegeName}
            </Text>
          </View>
          </TouchableHighlight>
        </View>
}


export default ({dataSource, onPress}) => {
  return <ListView
  dataSource = {dataSource}
  renderRow = {(rowData) => renderRow(rowData)}
  />
}

function renderRow(rowData, onPress) {
  if (rowData.selected) {
    return <Row checkBox={checkBoxFilled}
                collegeName={rowData.collegeName}
                onPress={onPress}
                index={rowData.index}
            />
  }
  else {
    return <Row checkBox={checkOutline}
                collegeName={rowData.collegeName}
                onPress={onPress}
                index={rowData.index}
            />
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row"
  },
  button: {
    height: 20,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 5
  },
  label: {
    color: 'blue'
  }
})
