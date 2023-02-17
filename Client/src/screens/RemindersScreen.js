import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReminderTopComp from '../components/ReminderScreenComponents/ReminderTopComp'
import BottomTabsComp from '../components/HomescreenComponents.js/BottomTabsComp'
import FloatingAddComp from '../components/HomescreenComponents.js/FloatingAddComp'
import ReminderMainComp from '../components/ReminderScreenComponents/ReminderMainComp'

import { useNavigation } from '@react-navigation/native'
const RemindersScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1 }}>
      <ReminderTopComp onMenuPress={() => { navigation.openDrawer() }} />
      <ReminderMainComp />
      <FloatingAddComp />
      <BottomTabsComp />
    </View>
  )
}

export default RemindersScreen

const styles = StyleSheet.create({})