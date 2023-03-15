import { BackHandler, StyleSheet, Text, ToastAndroid, View, ActivityIndicator } from 'react-native'
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
    const [loading, setLoading] = useState(false);

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
                const imageUrl = await Image.path
                uploadImageToCloudinary(imageUrl)
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
                const imageUrl = await Image.path
                uploadImageToCloudinary(imageUrl)
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
                const videoUrl = await video.path
                uploadVideoToCloudinary(videoUrl)
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
                const videoUrl = await video.path
                uploadVideoToCloudinary(videoUrl)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const uploadImageToCloudinary = async (uri) => {
        try {
            const formData = new FormData();
            formData.append('file', { uri, type: 'image/jpeg', name: 'test.jpg' });
            formData.append('upload_preset', 'moxp9trd');
            setLoading(true);
            const res = await fetch(`https://api.cloudinary.com/v1_1/dwhra8mlv/image/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            })
            const result = await res.json()
            setLoading(false);
            console.log(result.secure_url);
            navigation.navigate('createNote', { Image: result.secure_url })
            setAddModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadVideoToCloudinary = async (uri) => {
        try {
            const formData = new FormData();
            formData.append('file', { uri, type: 'video/mp4', name: 'test.mp4' });
            formData.append('upload_preset', 'moxp9trd');
            setLoading(true);
            const res = await fetch(`https://api.cloudinary.com/v1_1/dwhra8mlv/video/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            const result = await res.json();
            console.log(result);
            setLoading(false);
            navigation.navigate('createNote', { Video: result.secure_url });
            setAddModalOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

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
            {
                loading
                    ?
                    <View style={styles.ActivityIndicatorContainer}>
                        <ActivityIndicator size='large' color="#00acee" />
                    </View>
                    :
                    null
            }
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

const styles = StyleSheet.create({
    ActivityIndicatorContainer: {
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    }
})