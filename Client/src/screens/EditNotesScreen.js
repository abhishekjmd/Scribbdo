import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EditNotesComp from '../components/HomescreenComponents.js/CreateNoteComps.js/EditNotesComp'
import TopCreateNoteComp from '../components/HomescreenComponents.js/CreateNoteComps.js/TopCreateNoteComp'
import BottomCreateComp from '../components/HomescreenComponents.js/CreateNoteComps.js/BottomCreateComp'
import { useNavigation } from '@react-navigation/native'

const EditNotesScreen = () => {
const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: '#171717', }}>
            <TopCreateNoteComp onMenuPress={() => { navigation.navigate('Home') }} />
            <EditNotesComp />
            <BottomCreateComp />
        </View>

    )
}

export default EditNotesScreen

const styles = StyleSheet.create({})