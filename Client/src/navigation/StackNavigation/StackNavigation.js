import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import SettingScreen from '../../screens/SettingScreen';
import CreateNotesScreen from '../../screens/CreateNotesScreen';
const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='createNote' component={CreateNotesScreen} />
            <Stack.Screen name='Setting' component={SettingScreen} />
        </Stack.Navigator>
    )
}