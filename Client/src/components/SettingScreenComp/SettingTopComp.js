import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

const SettingTopComp = () => {
const navigation = useNavigation() 
    return (
        <View style={styles.root}>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.iconContainer} onPress={()=>{navigation.goBack()}} >
                    <AntDesign name='arrowleft' size={25} color='white' />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Settings</Text>
                </View>
            </View>
        </View>
    )
}

export default SettingTopComp

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: 50,
        marginTop: '1.5%',
        alignItems: 'center',
    },
    mainContainer: {
        width: '96%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        justifyContent: 'center',
        height: '100%',
        width: '40%',
        marginLeft: '5%'
    },
    text: {
        fontSize: 18,
        color: 'white',
        fontWeight: '400'
    },
})