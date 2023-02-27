import { StyleSheet, View, BackHandler, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import SearchBarComp from '../components/HomescreenComponents.js/SearchBarComp'
import FloatingAddComp from '../components/HomescreenComponents.js/FloatingAddComp'
import BottomTabsComp from '../components/HomescreenComponents.js/BottomTabsComp'
import { useNavigation } from '@react-navigation/native'
import NotesListScreen from '../components/HomescreenComponents.js/NotesListScreen'
import FloatingPhotoComp from '../components/HomescreenComponents.js/FloatingPhotoComp'
import { androidCameraPermission } from '../components/HomescreenComponents.js/Permission'
import ImageCropPicker from 'react-native-image-crop-picker'
import { useDispatch } from 'react-redux'
import { GetNotesAsyncThunk } from '../Redux/Reducers/NotesReducer'
import FloatingAudioComp from '../components/HomescreenComponents.js/FloatingAudioComp'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [modalopen, setModalOpen] = useState(false)
    const [audioModalOpen, setAudioModalOpen] = useState(false);
    const [backButtonPressed, setBackButtonPressed] = useState(0);

    const photoHandle = () => {
        setModalOpen(!modalopen);
    }

    const microPhoneHandle = () => {
        setAudioModalOpen(!audioModalOpen);
    }

    const onCamera = async () => {
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

    const onGallery = async () => {
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

    const handleBackButton = () => {
        if (backButtonPressed === 1) {
            BackHandler.exitApp();
        } else {
            setBackButtonPressed(backButtonPressed + 1);
            ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
            setTimeout(() => setBackButtonPressed(0), 4000);
            setModalOpen(false);
            setAudioModalOpen(false);
            return true;
        }
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButton
        );
        return () => backHandler.remove();
    }, [backButtonPressed]);

    return (
        <View style={styles.root}>
            <SearchBarComp placeholder='Seach your notes' onMenuPress={() => { navigation.openDrawer() }} />
            <NotesListScreen />
            {
                modalopen
                    ?
                    <FloatingPhotoComp onCamera={onCamera} onGallery={onGallery} />
                    :
                    null
            }
            {
                audioModalOpen
                    ?
                    <FloatingAudioComp />
                    :
                    null
            }
            <FloatingAddComp />
            <BottomTabsComp onchecksPress={() => { navigation.navigate('Archieve') }} photoHandle={photoHandle} microPhoneHandle={microPhoneHandle} />
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