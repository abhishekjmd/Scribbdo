import { StyleSheet, Text, View, BackHandler, ToastAndroid, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import EditNotesComp from '../components/HomescreenComponents.js/CreateNoteComps.js/EditNotesComp'
import TopCreateNoteComp, {  UniversalModalComp } from '../components/HomescreenComponents.js/CreateNoteComps.js/TopCreateNoteComp'
import BottomCreateComp from '../components/HomescreenComponents.js/CreateNoteComps.js/BottomCreateComp'
import { useNavigation } from '@react-navigation/native'
import { UpdateArchiveAsync } from '../Redux/Reducers/ArchiveReducer'
import { useDispatch } from 'react-redux'
import { AddPhotoVideoComp } from '../components/ArchiveScreenComp/ArchiveListScreenComps'
import { androidCameraPermission } from '../components/HomescreenComponents.js/Permission'
import ImageCropPicker from 'react-native-image-crop-picker'



const EditNotesScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false)
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [notesStateID, setNotesStateID] = useState('')
    const [backButtonPressed, setBackButtonPressed] = useState(0);

    const notesId = (id) => {
        setNotesStateID(id)
    }

    const archiveHandler = () => {
        dispatch(UpdateArchiveAsync(notesStateID))
        setModalOpen(true)
        setTimeout(() => {
            setModalOpen(false);
            navigation.navigate('Home');
        }, 1000);

    }


    const addHandler = () => {
        setAddModalOpen(!addModalOpen)
    }

    const onPhotoCamera = async () => {
        try {
            const permissionStatus = await androidCameraPermission()
            if (permissionStatus || Platform.OS == 'android') {
                const Image = await ImageCropPicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true
                })
                console.log(Image)
                navigation.navigate('EditNotes', { Image: Image.path })
                setAddModalOpen(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onPhotoGallery = async () => {
        try {
            const permissionStatus = await androidCameraPermission()
            if (permissionStatus || Platform.OS == 'android') {
                const Image = await ImageCropPicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true
                })
                console.log(Image)
                navigation.navigate('EditNotes', { Image: Image.path })
                setAddModalOpen(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onVideoCamera = async () => {
        try {
            const permissionStatus = await androidCameraPermission()
            if (permissionStatus || Platform.OS == 'android') {
                const video = await ImageCropPicker.openCamera({
                    mediaType: 'video',
                    includeBase64: true,
                    videoQuality: 'high',
                })
                console.log(video)
                navigation.navigate('EditNotes', { video: video.path })
                setAddModalOpen(false)
            }
        } catch (error) {
            console.log(error);
        }


    }

    const onVideoGallery = async () => {
        try {
            const permissionStatus = await androidCameraPermission()
            if (permissionStatus || Platform.OS == 'android') {
                const video = await ImageCropPicker.openPicker({
                    mediaType: 'video',
                    includeBase64: true,
                });
                console.log(video);
                navigation.navigate('EditNotes', { video: video.path })
                setAddModalOpen(false)
                // setVideoModalOpen(false)
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButton
        );

        return () => backHandler.remove();
    }, [backButtonPressed]);

    const handleBackButton = () => {
        if (backButtonPressed === 1) {
            navigation.navigate('Home')
        } else {
            setBackButtonPressed(backButtonPressed + 1);
            ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
            setAddModalOpen(false)
            setTimeout(() => setBackButtonPressed(0), 4000);
            return true;
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#171717' }}>
            <TopCreateNoteComp onMenuPress={() => { navigation.navigate('Home') }} archiveHandler={archiveHandler} />
            <EditNotesComp notesId={notesId} />
            {modalOpen
                ?
                <UniversalModalComp text='Note Archived' />
                :
                null
            }
            {addModalOpen
                ?
                <AddPhotoVideoComp onPhotoCamera={onPhotoCamera} onPhotoGallery={onPhotoGallery} onVideoCamera={onVideoCamera} onVideoGallery={onVideoGallery} />
                :
                null
            }
            <BottomCreateComp addHandler={addHandler} />
        </View>

    )
}

export default EditNotesScreen

const styles = StyleSheet.create({})