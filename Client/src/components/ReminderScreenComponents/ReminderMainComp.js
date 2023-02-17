import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
// import { ScrollView } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const ReminderMainComp = () => {
    return (
        <View style={styles.root}>
            <View style={styles.mainContainer}>
                <View>
                    <MaterialIcons name='notifications-none' size={150} />
                </View>
                <View>
                    <Text style={{ fontSize:18 }}>Notes with upcoming reminders appear here</Text>
                </View>
            </View>
        </View>
    )
}

export default ReminderMainComp

const styles = StyleSheet.create({
    root:{
        flex:1,
        width:'100%',
        backgroundColor:'white'
    },
    mainContainer:{
        width: '100%',
        height:'100%',
        // backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center'
    },
})