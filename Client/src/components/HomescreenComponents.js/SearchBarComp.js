import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const SearchBarComp = ({ value, onChangeText, placeholder, onMenuPress }) => {
  return (
    <View style={styles.MainContainer}>
      <View style={styles.SearchContainer}>
        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name='ios-menu-sharp' size={25} style={styles.Icon} />
        </TouchableOpacity>
        <TextInput placeholder={placeholder} style={styles.textInput} value={value} onChangeText={onChangeText} placeholderTextColor='#191919' />
        <AntDesign name='appstore-o' size={25} style={styles.Icon} />
      </View>
    </View>
  )
}

export default SearchBarComp

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: 'center',
    width: '100%',
    height: 60,
    // marginTop: 6,
  },
  SearchContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '98%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#EDEADE'
  },
  textInput: {
    fontSize: 20,
    color: '#191919'
  },
  Icon: {
    color: '#191919',
  },
})