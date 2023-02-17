import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DeleteTopComp from '../components/DeleteScreenComp/DeleteTopComp'

const DeletedScreen = () => {
  return (
    <View style={styles.root}>
      <DeleteTopComp />
    </View>
  )
}

export default DeletedScreen

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
})