import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SettingTopComp from '../components/SettingScreenComp/SettingTopComp'
import SettingMiddleComp from '../components/SettingScreenComp/SettingMiddleComp'

const SettingScreen = () => {
  return (
    <View style={styles.root}>
      <SettingTopComp />
      <SettingMiddleComp />
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor:'#191919'
  },
})