import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArchiveTopComp from '../components/ArchiveScreenComp/ArchiveTopComp'
import { useNavigation } from '@react-navigation/native'
import ArchiveListScreen from '../components/ArchiveScreenComp/ArchiveListScreen'

const ArchiveNotesScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <ArchiveTopComp onMenuPress={() => { navigation.openDrawer() }} />
      <ArchiveListScreen />
      </View>
  )
}

export default ArchiveNotesScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#171717'
  },
})