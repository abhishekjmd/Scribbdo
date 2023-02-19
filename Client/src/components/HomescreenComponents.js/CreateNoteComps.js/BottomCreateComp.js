import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feature from 'react-native-vector-icons/Feather'
const BottomCreateComp = () => {
  return (
    <View style={styles.root}>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Feature name='plus-square' size={25} style={styles.Icon} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Edited 9:04 am</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialCommunityIcons name='dots-vertical' size={25} style={styles.Icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BottomCreateComp

const styles = StyleSheet.create({
  root:{
    width:'100%',
    height:40,
    position: 'absolute',
    bottom: '0.5%',
  },
  mainContainer:{
    width:'100%',
    height:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    // backgroundColor:'#2E2E2E'
  },
  textContainer:{
    width:'75%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize:16,
    color:'white'
  },
  Icon:{
    color:'white'
  },
  
})