import { StyleSheet, View } from 'react-native'
import React,{useState} from 'react'
import DrawerNavigation from './src/navigation/DrawerNavigation/DrawerNavigation';
import auth from '@react-native-firebase/auth'
const App = () => {

  return (
    <View style={styles.root}>
      <DrawerNavigation />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  root:{
    flex:1
  },
})