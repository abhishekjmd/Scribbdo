import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Switch } from 'react-native-paper'
const MiddleComp = ({ text }) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <View style={styles.middleRootContainer}>
            <View style={styles.middleContainer}>
                <Text style={styles.middleText}> {text} </Text>
                <Switch
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                    disabled={false}
                    thumbColor={isSwitchOn ? "#800000" : '#ffffff'}
                    trackColor={{ false: '#767577', true: '#767577' }}
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
            </View>
        </View>
    )
}

const SettingMiddleComp = () => {
    return (
        <View style={styles.root}>
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.displayText}>Display options</Text>
                </View>
                <MiddleComp text='Add New Items to bottom' />
                <MiddleComp text='Move ticked items to bottom' />
                <MiddleComp text='Display rich link previews' />
                <View style={styles.textContainer}>
                    <Text style={styles.displayText}>Sharing</Text>
                </View>
                <MiddleComp text='Enable sharing' />
            </View>
        </View>
    )
}

export default SettingMiddleComp

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: 300,
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    textContainer: {
        width: '95%',
        height: '10%',
        justifyContent: 'center',
        marginLeft: '2%'
    },
    displayText: {
        color: '#FFB6C1',
        fontWeight: '400',
        fontSize: 16
    },
    // middle root container
    middleRootContainer: {
        width: '95%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1%'
    },
    middleContainer: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    middleText: {
        fontSize: 18,
        color: 'white'
    },
})