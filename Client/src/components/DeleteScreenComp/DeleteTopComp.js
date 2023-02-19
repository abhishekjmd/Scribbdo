import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const DeleteTopComp = ({ onMenuPress }) => {
    const navigation = useNavigation()
    const toggleHandle = () => { navigation.openDrawer() }
    return (
        <View style={styles.root}>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.toogleContainer} onPress={toggleHandle} >
                    <Ionicons name='ios-menu-sharp' size={25} style={styles.Icon} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Deleted</Text>
                </View>
                <TouchableOpacity style={styles.listContainer}>
                    <MaterialCommunityIcons name='dots-vertical' size={25} style={styles.Icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DeleteTopComp

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1.5%',
        width: '100%',
        height: 55,
    },
    mainContainer: {
        justifyContent: 'space-around',
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