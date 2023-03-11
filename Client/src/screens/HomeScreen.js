import { StyleSheet, View, BackHandler, ToastAndroid } from 'react-native'
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
// import FloatingPhotoVideoComp from '../components/HomescreenComponents.js/FloatingPhotoVideoComp'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [modalopen, setModalOpen] = useState(false)
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [backButtonPressed, setBackButtonPressed] = useState(0);
    const [topList, setTopList] = useState(false);
    const photoHandle = () => {
        setModalOpen(!modalopen);
    }

    const microPhoneHandle = () => {
        setVideoModalOpen(!videoModalOpen);
    }

    const onCameraPhoto = async () => {
        const permissionStatus = await androidCameraPermission()
        if (permissionStatus || Platform.OS == 'android') {
            ImageCropPicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                console.log(image);
            });
            navigation.navigate('createNote', { Image: Image.path })
            await GetNotesAsyncThunk();
            setModalOpen(false);
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
                await GetNotesAsyncThunk();
                setModalOpen(false);
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
                navigation.navigate('createNote', { video: video.path })
                setVideoModalOpen(false)
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
                navigation.navigate('createNote', { video: video.path })
                setVideoModalOpen(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

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
            <SearchBarComp placeholder='Seach your notes' onMenuPress={() => { navigation.openDrawer() }} iconName={topList ? 'appstore-o' : 'layout' } listhandler={listhandler} />
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
})