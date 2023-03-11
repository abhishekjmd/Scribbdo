import { StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid, BackHandler, ToastAndroid, Platform, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageCropPicker from 'react-native-image-crop-picker'
import { androidCameraPermission } from './Permission'

const FloatingPhotoVideoComp = ({ onCamera, onGallery, heading, firstBtn, secondBtn }) => {
    return (
        <View style={styles.Root}>
            <View style={styles.MainContainer}>
                <View style={styles.AddImageContainer}>
                    <Text style={styles.AddImageText}>{heading}</Text>
                </View>
                <TouchableOpacity style={styles.TakePhotoContainer} onPress={onCamera}>
                    <FontAwesome name='camera' size={25} style={styles.Icon} />
                    <Text style={styles.TakePhotoText}>{firstBtn}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ChooseImageContainer} onPress={onGallery}>
                    <FontAwesome name='photo' size={25} style={styles.Icon} />
                    <Text style={styles.ChooseImageText}>{secondBtn}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FloatingPhotoVideoComp

const styles = StyleSheet.create({
    Root: {
        width: '85%',
        height: '25%',
        position: 'absolute',
        backgroundColor: '#2E2E2E',
        right: '7%',
        bottom: '35%',
        borderRadius: 20,
        borderColor: '#323232',
        borderWidth: 1,
    },
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    AddImageContainer: {
        width: '90%',
        height: '31%',
        justifyContent: 'center',
    },
    AddImageText: {
        color: 'white',
        fontSize: 30
    },
    TakePhotoContainer: {
        width: '90%',
        height: '31%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    TakePhotoText: {
        color: 'white',
        fontSize: 25,
        marginLeft: '8%',

        // alignItems:'center'
    },
    ChooseImageContainer: {
        width: '90%',
        height: '31%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ChooseImageText: {
        color: 'white',
        fontSize: 25,
        marginLeft: '8%',
    },
    Icon: {
        color: 'white'
    },
})