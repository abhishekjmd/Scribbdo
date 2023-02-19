import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DeletedScreen from '../../screens/DeletedScreen';
import RemindersScreen from '../../screens/RemindersScreen';
import SettingScreen from '../../screens/SettingScreen';
import StackNavigation from '../StackNavigation/StackNavigation';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerLabelStyle: {
            fontSize: 16,
            color: 'white',
          },
          drawerActiveBackgroundColor: '#737373',
          drawerStyle: {
            backgroundColor: '#353935',
          },
        }}

      >
        <Drawer.Screen name='Notes' component={StackNavigation}
          options={{

            drawerIcon: (() => (
              <MaterialIcons name='lightbulb-outline' size={30} color='white' />
            ))
          }}
        />
        <Drawer.Screen name='Reminder' component={RemindersScreen}
          options={{
            drawerIcon: (() => (
              <MaterialIcons name='notifications-none' size={30} color='white' />

            ))
          }}
        />

        <Drawer.Screen name='Delete' component={DeletedScreen}
          options={{
            drawerIcon: (() => (
              <AntDesign name='delete' size={30} color='white' />
            ))
          }}
        />

        <Drawer.Screen name='Setting' component={SettingScreen}
          options={{
            drawerIcon: (() => (
              <Ionicons name='settings-sharp' size={30} color='white' />
            ))
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})