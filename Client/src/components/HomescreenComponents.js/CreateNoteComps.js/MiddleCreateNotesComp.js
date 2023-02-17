import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const MiddleCreateNotesComp = () => {
  return (
    <View style={styles.root}>
      <View style={styles.mainContainer}>
        <TextInput placeholder='Title' placeholderTextColor='black' style={styles.textinputStyle} />
        <TextInput placeholder='Note' placeholderTextColor='black' style={styles.textinputStyle} />
      </View>
    </View>
  )
}

export default MiddleCreateNotesComp

const styles = StyleSheet.create({
  root:{
    width:'100%',
    // backgroundColor:'yellow',
  },
  mainContainer:{
    width: '98%',
    alignItems: 'flex-start',
    marginLeft:'6%'
  },
  textinputStyle:{
    fontSize:18,
    width:'100%'
  },
})