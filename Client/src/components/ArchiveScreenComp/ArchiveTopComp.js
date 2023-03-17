import { StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const ArchiveTopComp = ({ onMenuPress, iconName, listHandler, value, onChangeText }) => {
    return (
        <View style={styles.root}>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.toogleContainer} onPress={onMenuPress} >
                    <Ionicons name='ios-menu-sharp' size={25} style={styles.Icon} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                   <Text style={styles.text}>Archive</Text>
                </View>
                <TouchableOpacity style={styles.listContainer} onPress={listHandler}>
                    <AntDesign name={iconName} size={25} style={styles.Icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ArchiveTopComp

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
        height: '90%',
        width: '52%',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#737373',
        justifyContent:'space-around',
        borderRadius:20,
        borderWidth:1,
        borderColor:'#737373'
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