import { StyleSheet, View, TextInput, BackHandler, TouchableOpacity, Text,Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetNotesAsyncThunk, NotesAyncThunk } from '../../../Redux/Reducers/NotesReducer'
import { useNavigation, useRoute } from '@react-navigation/native'

const MiddleCreateNotesComp = () => {
  const [titleValue, setTitleValue] = useState('')
  const [notesValue, setNoteValue] = useState('')
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const route = useRoute()
  const image = route.params?.Image
  const handleSubmit = async () => {
    try {
      dispatch(NotesAyncThunk({ titleValue, notesValue,image }))
      dispatch(GetNotesAsyncThunk())
      navigation.navigate('Home');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.mainContainer}>
        <TextInput placeholder='Title' multiline={true} value={titleValue}  onChangeText={(e) => setTitleValue(e)} placeholderTextColor='#8A8A8A' style={styles.titleStyle} />
        <TextInput placeholder='Note' multiline={true} value={notesValue}  onChangeText={(e) => setNoteValue(e)} placeholderTextColor='#8A8A8A' style={styles.textinputStyle} />
      </View>
      <TouchableOpacity style={styles.submitContainer} onPress={handleSubmit} >
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.submitText}>submit</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  )
}

export default MiddleCreateNotesComp

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
  titleStyle:{
    fontSize: 20,
    width: '100%',
    color: 'white'
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
  },

  submitText: {
    fontSize: 18,
    width: '100%',
    color: 'white',
  },
})