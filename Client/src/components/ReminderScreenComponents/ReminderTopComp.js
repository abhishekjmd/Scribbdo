import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const ReminderTopComp = ({ onMenuPress }) => {
    return (
        <View style={styles.root}>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.toogleContainer} onPress={onMenuPress} > 
                    <Ionicons name='ios-menu-sharp' size={25} style={styles.Icon} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Reminders</Text>
                </View>
                <TouchableOpacity style={styles.searchContainer}>
                    <Ionicons name='ios-search' size={25} style={styles.Icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.listContainer}>
                    <FontAwesome name='th-list' size={25} style={styles.Icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReminderTopComp

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
        backgroundColor: '#EDEADE',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        borderRadius:10,
    },
    textContainer: {
        justifyContent: 'center',
        height: '100%',
        width: '50%',
    },
    text: {
        fontWeight: '500',
        color: '#191919',
        fontSize: 16,
    },
    Icon: {
        color: '#191919'
    },
})