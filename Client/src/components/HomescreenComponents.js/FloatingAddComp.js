import { StyleSheet, Text, TouchableOpacity,View,Image } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'

const FloatingAddComp = () => {
    const navigation = useNavigation()
    const createNoteHandle =()=>{
        navigation.navigate('createNote')
    }
    return (
        <View style={styles.root}>
            <TouchableOpacity style={styles.lottieContainer} onPress={createNoteHandle}>
                <Image source={require('../../assets/add-file.png')} style={styles.image} resizeMode='center' />
            {/* 
            <LottieView source={require('../../assets/notes.json')} loop autoPlay speed={0.5} />
         */}   
            </TouchableOpacity>
        </View>
    )
}

export default FloatingAddComp

const styles = StyleSheet.create({
    root: {
        width: 150,
        height: 150,
        position: 'absolute',
        right: 0,
        bottom: '8%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lottieContainer: {
        width: '60%',
        height: '60%',
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    },
    image:{
        height:'70%',
        width:'70%',
    },
})