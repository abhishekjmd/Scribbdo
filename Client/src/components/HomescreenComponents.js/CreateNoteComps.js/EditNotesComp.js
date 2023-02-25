import { StyleSheet, View, TextInput, Text,TouchableOpacity,BackHandler } from 'react-native'
import React, {  useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {  UpdateNotesAsync } from '../../../Redux/Reducers/NotesReducer'
import { useNavigation, useRoute } from '@react-navigation/native'

const EditNotesComp = () => {
    
    const route = useRoute();
    const Title = route.params.Title;
    const Notes = route.params.Notes;
    const Id = route.params.Id;
    const [titleValue, setTitleValue] = useState(Title)
    const [notesValue, setNoteValue] = useState(Notes)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    
    
    const handleSubmit = async () => {
        try {
            dispatch(UpdateNotesAsync({
                titleValue, notesValue, Id
            }))
            navigation.navigate('Home')
        } catch (error) {
            console.log(error)
        }
    };


    
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButton
        );

        return () => backHandler.remove();
    }, []);

    const handleBackButton = () => {
        navigation.navigate('Home')
    };

    return (
        <View style={styles.root}>
            <View style={styles.mainContainer}>
                <TextInput placeholder='Title' value={titleValue} multiline={true} onChangeText={(e) => setTitleValue(e)} placeholderTextColor='#8A8A8A' style={styles.textinputStyle} />
                <TextInput placeholder='Note' value={notesValue} multiline={true} onChangeText={(e) => setNoteValue(e)} placeholderTextColor='#8A8A8A' style={styles.textinputStyle} />
            </View>
            <TouchableOpacity style={styles.submitContainer} onPress={handleSubmit} >
                <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.submitText}>submit</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

export default EditNotesComp

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    mainContainer: {
        width: '98%',
        marginLeft: '6%',
        marginTop: '10%',
    },
    textinputStyle: {
        fontSize: 18,
        width: '100%',
        color: 'white'
    },
    submitContainer: {
        width: '50%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2E2E2E',
        borderRadius: 15,
        marginTop:'5%'
    },
    submitText: {
        fontSize: 18,
        width: '100%',
        color: 'white',
    },
})