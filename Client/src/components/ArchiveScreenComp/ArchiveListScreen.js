import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NotesListComp } from '../HomescreenComponents.js/NotesListScreen'
import { useDispatch, useSelector } from 'react-redux'
import { GetArchiveAsyncThunk } from '../../Redux/Reducers/ArchiveReducer'
import { useNavigation } from '@react-navigation/native'
import EditComp from '../HomescreenComponents.js/EditComp'
import { DeleteNotesAsync, GetNotesAsyncThunk } from '../../Redux/Reducers/NotesReducer'

const ArchiveListScreen = () => {
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

    const ArchiveData = useSelector((state) => state.Archive.GetArchive)

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
        <View>
            <FlatList
                data={ArchiveData[0] && ArchiveData[0] ? ArchiveData[0].Archive : ArchiveData[0]}
                renderItem={({ item }) => {
                    return (
                        <NotesListComp title={item.Title} note={item.Note} onPress={() => { navigation.navigate('EditNotes', { Title: item.Title, Notes: item.Note, Id: item._id }) }} onLongPress={() => { modalhandle(item._id) }} />
                    )
                }}
                numColumns={2}
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

export default ArchiveListScreen

const styles = StyleSheet.create({})