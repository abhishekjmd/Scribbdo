import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'


const TopCreateNoteComp = ({ onMenuPress }) => {

    return (
        <View style={styles.root}>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.toogleContainer} onPress={onMenuPress} >
                    <AntDesign name='arrowleft' size={25} style={styles.Icon} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                </View>
                <TouchableOpacity style={styles.searchContainer}>
                    <MaterialCommunityIcons name='pin' size={25} style={styles.Icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.listContainer}>
                    <Ionicons name='ios-archive' size={25} style={styles.Icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TopCreateNoteComp

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1.5%',
        width: '100%',
        height: 55,
    },
    mainContainer: {
        justifyContent: 'space-evenly',
        backgroundColor: '#2E2E2E',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        borderRadius: 10,
    },
    textContainer: {
        justifyContent: 'center',
        height: '100%',
        width: '50%',
    },
    text: {
        fontWeight: '500',
        color: 'white',
        fontSize: 16,
    },
    Icon: {
        color: 'white'
    },
})