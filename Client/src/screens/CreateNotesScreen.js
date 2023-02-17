import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopCreateNoteComp from '../components/HomescreenComponents.js/CreateNoteComps.js/TopCreateNoteComp'
import MiddleCreateNotesComp from '../components/HomescreenComponents.js/CreateNoteComps.js/MiddleCreateNotesComp'
import BottomCreateComp from '../components/HomescreenComponents.js/CreateNoteComps.js/BottomCreateComp'
import { useNavigation } from '@react-navigation/native'

const CreateNotesScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: '#EDEADE', }}>
            <TopCreateNoteComp onMenuPress={() => { navigation.navigate('Home') }} />
            <MiddleCreateNotesComp />
            <BottomCreateComp />
        </View>
    )
}

export default CreateNotesScreen

const styles = StyleSheet.create({})