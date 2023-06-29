import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



const EditComp = ({ deleteHandle, archiveHandle, oneText, twoText }) => {
    return (
        <View style={styles.root}>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.archiveContainer} onPress={archiveHandle}>
                    <Ionicons name='archive' size={30} color='white' />
                    <Text style={styles.archiveText}> {oneText} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.DeleteContainer} onPress={deleteHandle}>
                    <MaterialCommunityIcons name='delete-circle' size={30} color='white' />
                    <Text style={styles.deleteText}> {twoText} </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditComp

const styles = StyleSheet.create({
    root: {
        width: '60%',
        position: 'absolute',
        height: 190,
        top: '30%',
        right: '20%',
        borderRadius: 15,
        borderColor: '#7f7f7f',
        borderWidth: 5,
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    archiveContainer: {
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#7f7f7f',
        borderWidth: 2,
        padding: '5%',
        borderRadius: 15,
        backgroundColor: '#191919',
    },
    archiveText: {
        color: 'white',
        fontSize: 30
    },
    DeleteContainer: {
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#7f7f7f',
        borderWidth: 2,
        padding: '5%',
        top: '3%',
        borderRadius: 15,
        backgroundColor: '#191919',

    },
    deleteText: {
        color: 'white',
        fontSize: 30
    },
})