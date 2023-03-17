import { StyleSheet, View, BackHandler, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { GetNotesAsyncThunk } from '../Redux/Reducers/NotesReducer'
import ImageCropPicker from 'react-native-image-crop-picker'

// ------------------- IMPORTED FILES --------------
import SearchBarComp from '../components/HomescreenComponents.js/SearchBarComp'
import FloatingAddComp from '../components/HomescreenComponents.js/FloatingAddComp'
import BottomTabsComp from '../components/HomescreenComponents.js/BottomTabsComp'
import { androidCameraPermission } from '../components/HomescreenComponents.js/Permission'
import NotesListScreen from '../components/HomescreenComponents.js/NotesListScreen'
import FloatingPhotoVideoComp from '../components/HomescreenComponents.js/FloatingPhotoVideoComp'
import AnotherNoteListScreen from '../components/HomescreenComponents.js/AnotherNoteListScreen'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [modalopen, setModalOpen] = useState(false)
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [backButtonPressed, setBackButtonPressed] = useState(0);
    const [topList, setTopList] = useState(false);
    const [loading, setLoading] = useState(false);

    const photoHandle = () => {
        setModalOpen(!modalopen);
    }

    const microPhoneHandle = () => {
        setVideoModalOpen(!videoModalOpen);
    }

    const onCameraPhoto = async () => {
        const permissionStatus = await androidCameraPermission()
        if (permissionStatus || Platform.OS == 'android') {
            const Image = await ImageCropPicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                console.log(image);
            });
            const imageUrl = await Image.path;
            uploadImageToCloudinary(imageUrl)
            // navigation.navigate('createNote', { Image: Image.path })
            // await GetNotesAsyncThunk();
        }
    }

    const onGalleryPhoto = async () => {
        try {
            const permissionStatus = await androidCameraPermission()
            if (permissionStatus || Platform.OS == 'android') {
                const Image = await ImageCropPicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true
                })
                console.log(Image.path)
                navigation.navigate('createNote', { Image: Image.path })
                const imageUrl = await Image.path;
                uploadImageToCloudinary(imageUrl)

                // await GetNotesAsyncThunk();
                // setModalOpen(false);
            }
        } catch (error) {
            console.log(error)
        }

    }

    const onCameraVideo = async () => {
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
                // navigation.navigate('createNote', { video: video.path })
                // setVideoModalOpen(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onGalleryVideo = async () => {
        try {
            const permissionStatus = await androidCameraPermission()
            if (permissionStatus || Platform.OS == 'android') {
                const video = await ImageCropPicker.openPicker({
                    mediaType: 'video',
                    includeBase64: true,
                });
                console.log(video);
                // navigation.navigate('createNote', { Video: video.path })
                // setVideoModalOpen(false)
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
            setModalOpen(false);

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
            setVideoModalOpen(false)
        } catch (error) {
            console.log(error);
        }
    };



    const handleBackButton = () => {
        if (backButtonPressed === 1) {
            BackHandler.exitApp();
        } else {
            setBackButtonPressed(backButtonPressed + 1);
            ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
            setTimeout(() => setBackButtonPressed(0), 4000);
            setModalOpen(false);
            setVideoModalOpen(false);
            return true;
        }
    };

    const listhandler = () => {
        setTopList(!topList);
    }


    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButton
        );
        return () => backHandler.remove();
    }, [backButtonPressed]);

    return (
        <View style={styles.root}>
            {
                loading
                    ?
                    <View style={styles.ActivityIndicatorContainer}>
                        <ActivityIndicator size='large' color="#00acee" />
                    </View>
                    :
                    null
            }
            <SearchBarComp placeholder='Seach your notes' onMenuPress={() => { navigation.openDrawer() }} iconName={topList ? 'appstore-o' : 'layout'} listhandler={listhandler} />
            {
                topList
                    ?
                    <AnotherNoteListScreen />
                    :
                    <NotesListScreen />

            }
            {
                modalopen
                    ?
                    <FloatingPhotoVideoComp onCamera={onCameraPhoto} onGallery={onGalleryPhoto} heading='Add image' firstBtn='Take photo' secondBtn='Choose image' />
                    :
                    null
            }
            {
                videoModalOpen
                    ?
                    <FloatingPhotoVideoComp onCamera={onCameraVideo} onGallery={onGalleryVideo} heading='Add video' firstBtn='Take video' secondBtn='Choose video' />
                    :
                    null
            }
            <FloatingAddComp />
            <BottomTabsComp onchecksPress={() => { navigation.navigate('Archive') }} photoHandle={photoHandle} videoHandle={microPhoneHandle} />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#171717'
    },
    ActivityIndicatorContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})