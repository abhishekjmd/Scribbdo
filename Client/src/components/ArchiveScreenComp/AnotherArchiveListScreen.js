import { StyleSheet, Text, View, FlatList, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetArchiveAsyncThunk } from '../../Redux/Reducers/ArchiveReducer'
import { useNavigation } from '@react-navigation/native'
import EditComp from '../HomescreenComponents.js/EditComp'
import { DeleteNotesAsync, GetNotesAsyncThunk } from '../../Redux/Reducers/NotesReducer'
import { AnotherNotesListComp } from '../HomescreenComponents.js/AnotherNoteListScreen'

const AnotherArchiveListScreen = ({ ArchiveData }) => {
    const [modalopen, setModalOpen] = useState(false)
    const [notesID, setNotesID] = useState('')
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const dispatchFunction = useCallback(() => {
        dispatch(GetArchiveAsyncThunk());
    }, [dispatch])
    useEffect(() => {
        dispatchFunction()
    }, [dispatchFunction])


    const modalhandle = (id) => {
        setModalOpen(!modalopen);
        setNotesID(id);
    }

    const deleteHandle = async () => {
        try {
            dispatch(DeleteNotesAsync(notesID));
            setModalOpen(false);
            dispatch(GetArchiveAsyncThunk());
            dispatch(GetNotesAsyncThunk());
        } catch (error) {
            console.log(error)
        }
    }

    const Unarchivehandle = async () => {
        try {

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={ArchiveData && ArchiveData ? ArchiveData : ArchiveData}
                renderItem={({ item }) => {
                    return (
                        <AnotherNotesListComp title={item.Title} note={item.Note} imageSource={item.Image ? item.Image : null} imageExist={item.Image} videoExist={item.Recording} videoSource={item.Recording ? item.Recording : null} onPress={() => { navigation.navigate('EditNotes', { Title: item.Title, Notes: item.Note, Id: item._id, video: item.Recording, Image: item.Image }) }} type='Primary' onLongPress={() => { modalhandle(item._id) }} />
                    )
                }}
                
            />
            {
                modalopen
                    ?
                    <EditComp oneText='Unarchive' twoText='Delete' archiveHandle={Unarchivehandle} deleteHandle={deleteHandle} />
                    :
                    null
            }

        </View>
    )
}

export default AnotherArchiveListScreen

const styles = StyleSheet.create({
    root: {
        width: '90%',
    },
    mainContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
})