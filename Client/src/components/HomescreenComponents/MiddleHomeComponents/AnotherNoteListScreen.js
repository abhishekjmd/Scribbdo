
import { StyleSheet, Text, View, FlatList, TouchableOpacity, BackHandler, ToastAndroid, Vibration, Image, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DeleteNotesAsync, GetNotesAsyncThunk } from '../../Redux/Reducers/NotesReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import { UpdateArchiveAsync } from '../../Redux/Reducers/ArchiveReducer'
import EditComp from './EditComp'


export const AnotherNotesListComp = ({ title, note, onLongPress, type, onPress, imageSource, imageExist, videoSource, videoExist, onVideoLoad, onVideoProgress, }) => {
    const videoRef = useRef(null);
    const titleLength = videoExist ? 48 : (imageExist ? 45 : 96);
    const noteTextLength = videoExist ? 190 : (imageExist ? 60 : 660);
    const truncatedTitle = title.length > titleLength ? title.substr(0, titleLength) + "..." : title;
    const truncatedNoteText = note.length > noteTextLength ? note.substr(0, noteTextLength) + "..." : note;
    return (
        <TouchableOpacity style={[styles.root, styles[`root_${type}`]]} onPress={onPress} onLongPress={onLongPress} >
            <View style={styles.mainContainer}>
                {imageExist ?
                    <Image source={{ uri: imageSource }} style={styles.image} resizeMode='cover' />
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

const AnotherNoteListScreen = () => {
    const [modalopen, setModalOpen] = useState(false)
    const [notesID, setNotesID] = useState('')
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [isRefreshing, setIsRefreshing] = useState(false)


    const dispatchFunction = async () => {
        try {
            setIsRefreshing(true);
            await dispatch(GetNotesAsyncThunk());
            setIsRefreshing(false);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        dispatchFunction()
    }, [dispatch])

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
            dispatch(GetNotesAsyncThunk())
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
                        <AnotherNotesListComp title={item.Title} note={item.Note} imageSource={item.Image ? item.Image : null} imageExist={item.Image} videoExist={item.Recording} videoSource={item.Recording ? item.Recording : null} onPress={() => { navigation.navigate('EditNotes', { Title: item.Title, Notes: item.Note, Id: item._id, video: item.Recording, Image: item.Image }) }} onLongPress={() => { modalhandle(item._id) }} />
                    )
                }}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={dispatchFunction} />
                }
            />
            {modalopen
                ?
                <EditComp oneText='Archive' twoText='Delete' deleteHandle={deleteHandle} archiveHandle={archiveHandle} />
                :
                null
            }
        </View>
    )
}

export default AnotherNoteListScreen

const styles = StyleSheet.create({
    root: {
        width: '100%',
        backgroundColor: '#171717',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: '#323232',
        borderWidth: 2,
        height: 400,
        marginTop: '3%',
    },
    
    mainContainer: {
        width: '90%',
        justifyContent: 'center',
        marginLeft: '2%',
        alignItems: 'center'
    },
    mainContainer_Primary: {
        width: '90%',
        justifyContent: 'center',
        marginLeft: '2%',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    image: {
        width: '100%',
        height: '60%',
        borderRadius: 15,
        marginBottom: '2%',
        // resizeMode:'cover'
    },
    videoContainer: {
        width: '100%',
        height: '70%',
    },
    videoPlayer: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        borderColor: '#36454F',
        borderWidth: 1
    },
    playpauseIcon: {
        position: 'absolute',
        right: 0,
        top: '35%',
        left: '45%',
        bottom: 0,
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: '2%'
    },
    noteText: {
        color: 'white',
    },
    ActivityIndicatorContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    }
})