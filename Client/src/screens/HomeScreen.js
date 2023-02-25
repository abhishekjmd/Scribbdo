import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import SearchBarComp from '../components/HomescreenComponents.js/SearchBarComp'
import FloatingAddComp from '../components/HomescreenComponents.js/FloatingAddComp'
import BottomTabsComp from '../components/HomescreenComponents.js/BottomTabsComp'
import { useNavigation } from '@react-navigation/native'
import NotesListScreen from '../components/HomescreenComponents.js/NotesListScreen'
import EditComp from '../components/HomescreenComponents.js/EditComp'

const HomeScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.root}>
            <SearchBarComp placeholder='Seach your notes' onMenuPress={() => { navigation.openDrawer() }} />
            <NotesListScreen />
            <FloatingAddComp />
            <BottomTabsComp onchecksPress={() => { navigation.navigate('Archieve') }} />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#171717'
    },
})