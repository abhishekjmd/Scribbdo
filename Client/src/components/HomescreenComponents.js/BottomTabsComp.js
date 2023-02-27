import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, } from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const BottomTabsComp = ({ onchecksPress, photoHandle, microPhoneHandle }) => {
    return (
        <View style={styles.root}>
            <View style={styles.mainContainer}>
                <TouchableOpacity onPress={onchecksPress}>
                    <FontAwesome name='check-square-o' size={25} style={styles.Icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={microPhoneHandle}>
                    <FontAwesome name='microphone' size={25} style={styles.Icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={photoHandle}>
                    <FontAwesome name='photo' size={25} style={styles.Icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BottomTabsComp
const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '0.5%',
    },
    mainContainer: {
        width: '98%',
        // borderWidth: 1,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#2E2E2E'
    },
    Icon: {
        color: 'white',
    },
})