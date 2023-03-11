import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const SearchBarComp = ({  onMenuPress, listhandler,iconName }) => {
  return (
    <View style={styles.MainContainer}>
      <View style={styles.SearchContainer}>
        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name='ios-menu-sharp' size={25} style={styles.Icon} />
        </TouchableOpacity>
        <Text  style={styles.text}> Notes </Text> 
        <TouchableOpacity onPress={listhandler}>
          <AntDesign name={iconName} size={25} style={styles.Icon} />
        </TouchableOpacity>
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
  },
  SearchContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '98%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#2E2E2E'
  },
  text: {
    fontSize: 20,
    color: 'white'
  },
  Icon: {
    color: 'white',
  },
})