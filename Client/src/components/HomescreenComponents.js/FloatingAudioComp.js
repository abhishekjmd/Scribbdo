import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const FloatingAudioComp = () => {
    const [recordplay, setRecordPlay] = useState(false)
    const recordingHandle = () => {
        setRecordPlay(!recordplay)
    }
    return (
        <View style={styles.root}>
            <TouchableOpacity style={[styles.mainContainer, { borderColor: recordplay ? 'red' : '#87CEEB' }]} onPress={recordingHandle}>
                <FontAwesome name='microphone' size={40} style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

export default FloatingAudioComp

const styles = StyleSheet.create({
    root: {
        width: '85%',
        height: '25%',
        position: 'absolute',
        backgroundColor: '#2E2E2E',
        right: '7%',
        bottom: '35%',
        borderRadius: 20,
        borderColor: '#323232',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        // borderColor: {  "#87CEEB" : '000' },
        // borderColor: '#87CEEB',

        borderWidth: 10,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    icon: {
        color: 'white'
    }
})