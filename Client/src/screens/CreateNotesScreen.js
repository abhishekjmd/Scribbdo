import { BackHandler, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import TopCreateNoteComp from '../components/HomescreenComponents.js/CreateNoteComps.js/TopCreateNoteComp'
import MiddleCreateNotesComp from '../components/HomescreenComponents.js/CreateNoteComps.js/MiddleCreateNotesComp'
import BottomCreateComp from '../components/HomescreenComponents.js/CreateNoteComps.js/BottomCreateComp'
import { useNavigation } from '@react-navigation/native'
import { AddPhotoVideoComp } from '../components/ArchiveScreenComp/ArchiveListScreenComps'
import { androidCameraPermission } from '../components/HomescreenComponents.js/Permission'
import ImageCropPicker from 'react-native-image-crop-picker'

const CreateNotesScreen = () => {
    const navigation = useNavigation();
    
    const [backButtonPressed, setBackButtonPressed] = useState(0);
    const [addModalOpen, setAddModalOpen] = useState(false)
    
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
                navigation.navigate('createNote', { Image: Image.path })
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
                navigation.navigate('createNote', { Image: Image.path })
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
                navigation.navigate('createNote', { video: video.path })
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
                navigation.navigate('createNote', { video: video.path })
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
        <View style={{ flex: 1, backgroundColor: '#171717', }}>
            <TopCreateNoteComp onMenuPress={() => { navigation.navigate('Home') }} />
            <MiddleCreateNotesComp />

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

export default CreateNotesScreen

const styles = StyleSheet.create({})