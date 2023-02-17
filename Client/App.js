import { StyleSheet, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/screens/HomeScreen'
import DrawerNavigation from './src/navigation/DrawerNavigation/DrawerNavigation';
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