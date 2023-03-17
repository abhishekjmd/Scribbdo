import { StyleSheet, Text, View, FlatList, TouchableOpacity, BackHandler, ToastAndroid, Vibration, Image, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import Video from 'react-native-video'
import { DeleteNotesAsync, GetNotesAsyncThunk } from '../../Redux/Reducers/NotesReducer'
import { useDispatch, useSelector } from 'react-redux'
import EditComp from './EditComp'
import { useNavigation } from '@react-navigation/native'
import { UpdateArchiveAsync } from '../../Redux/Reducers/ArchiveReducer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { UniversalModalComp } from './CreateNoteComps.js/TopCreateNoteComp'


export const NotesListComp = ({ title, note, onLongPress, onPress, imageSource, imageExist, videoSource, videoExist, onVideoLoad, onVideoProgress, }) => {

    const videoRef = useRef(null);
    const titleLength = videoExist ? 40 : (imageExist ? 20 : 60);
    const noteTextLength = videoExist ? 110 : (imageExist ? 55 : 160);
    const truncatedTitle = title.length > titleLength ? title.substr(0, titleLength) + "..." : title;
    const truncatedNoteText = note.length > noteTextLength ? note.substr(0, noteTextLength) + "..." : note;

    return (
        <TouchableOpacity style={styles.root} onPress={onPress} onLongPress={onLongPress} >
            <View style={styles.mainContainer}>
                {imageExist ?
                    <Image source={{ uri: imageSource }} style={styles.image} resizeMode='center' />
                    :
                    null
                }
                {
                    videoExist
                        ?
                        <View style={styles.videoContainer}>
                            <Video
                                source={{ uri: videoSource }}
                                style={styles.videoPlayer}
                                repeat={true}
                                ref={videoRef}
                                paused={true}
                                resizeMode={'cover'}
                                onLoad={onVideoLoad}
                                onProgress={onVideoProgress}
                            />
                            <Ionicons name='play' size={60} color='white' style={styles.playpauseIcon} />
                        </View>
                        :
                        null
                }

                <Text style={styles.titleText}> {truncatedTitle} </Text>
                <Text style={styles.noteText}> {truncatedNoteText} </Text>
            </View>
        </TouchableOpacity>
    )
}

const NotesListScreen = () => {
    const [modalopen, setModalOpen] = useState(false)
    const [notesID, setNotesID] = useState('')
    const [archiveDoneModal, setArchiveDoneModal] = useState(false)
    const [deleteDoneModal, setDeleteDoneModal] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const dispatchFunction = async () => {
        try {
            setIsRefreshing(true)
            await dispatch(GetNotesAsyncThunk())
            setIsRefreshing(false)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatchFunction()
    }, [])

    const NoteData = useSelector((state) => state.Notes.GetNotes)

    const modalhandle = (id) => {
        Vibration.vibrate(50)
        setNotesID(id);
        console.log(id);
        setModalOpen(!modalopen);
    }

    const [backButtonPressed, setBackButtonPressed] = useState(0);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButton
        );

        return () => backHandler.remove();
    }, [backButtonPressed]);

    const handleBackButton = () => {
        if (backButtonPressed === 1) {
            BackHandler.exitApp();
        } else {
            setBackButtonPressed(backButtonPressed + 1);
            ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
            setTimeout(() => setBackButtonPressed(0), 4000);
            setModalOpen(false);
            return true;
        }
    };

    const deleteHandle = async () => {
        try {
            dispatch(DeleteNotesAsync(notesID))
            setModalOpen(false);
            dispatch(GetNotesAsyncThunk())

        } catch (error) {
            console.log(error)
        }
    }

    const archiveHandle = async () => {
        try {
            dispatch(UpdateArchiveAsync(notesID))
            setModalOpen(false);
            setArchiveDoneModal(true)
            dispatch(GetNotesAsyncThunk())
            setTimeout(() => {
                setArchiveDoneModal(false);
                navigation.navigate('Home');
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={NoteData}
                renderItem={({ item }) => {
                    return (
                        <NotesListComp title={item.Title} note={item.Note} imageSource={item.Image ? item.Image : null} imageExist={item.Image} videoExist={item.Recording} videoSource={item.Recording ? item.Recording : null} onPress={() => { navigation.navigate('EditNotes', { Title: item.Title, Notes: item.Note, Id: item._id, video: item.Recording, Image: item.Image }) }} onLongPress={() => { modalhandle(item._id) }} />
                    )
                }}
                numColumns={2}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={dispatchFunction} />
                }
            />
            {
                archiveDoneModal ?
                    <UniversalModalComp text='Note Archived' />
                    :
                    null
            }
            {modalopen
                ?
                <EditComp oneText='Archive' twoText='Delete' deleteHandle={deleteHandle} archiveHandle={archiveHandle} />
                :
                null
            }

        </View>
    )
}

export default NotesListScreen

const styles = StyleSheet.create({
    root: {
        width: '48.5%',
        backgroundColor: '#171717',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: '#323232',
        borderWidth: 2,
        height: 320,
        marginTop: '3%',
        marginLeft: '1%'
    },
    mainContainer: {
        width: '90%',
        justifyContent: 'center',
        marginLeft: '2%',
        alignItems: 'center'
    },
    image: {
        width: '80%',
        height: '60%',
        borderRadius: 15,
        marginBottom: '5%'
    },
    videoContainer: {
        width: '100%',
        height: 150,
        marginBottom: '5%'

    },
    videoPlayer: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        borderColor: '#36454F',
        borderWidth: 1,

    },
    playpauseIcon: {
        position: 'absolute',
        right: 0,
        top: '15%',
        left: '35%',
        bottom: 0,
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: '5%'
    },
    noteText: {
        color: 'white',
    },
})