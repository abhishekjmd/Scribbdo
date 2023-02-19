import { StyleSheet,  View, TextInput } from 'react-native'
import React from 'react'

const MiddleCreateNotesComp = () => {
  return (
    <View style={styles.root}>
      <View style={styles.mainContainer}>
        <TextInput placeholder='Title' placeholderTextColor='#8A8A8A' style={styles.textinputStyle} />
        <TextInput placeholder='Note' placeholderTextColor='#8A8A8A' style={styles.textinputStyle} />
      </View>
    </View>
  )
}

export default MiddleCreateNotesComp

const styles = StyleSheet.create({
  root:{
    width:'100%',
  },
  mainContainer:{
    width: '98%',
    marginLeft:'6%',
    marginTop: '10%',
  },
  textinputStyle:{
    fontSize:18,
    width:'100%',
  },
})