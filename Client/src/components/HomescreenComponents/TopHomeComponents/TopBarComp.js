import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import profile from '../../../assets/profile.jpg'
import { justify } from '@cloudinary/base/qualifiers/textAlignment'


const TopBarComp = ({ onMenuPress, listhandler, iconName }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  // const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '988883850398-410kfj5k8muh512076smfmpcnne13khu.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
  }, [])

  const googleSignInHandler = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      if (!isSignedIn) {
        await GoogleSignin.signOut(); // Sign out the user if not signed in
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const { user } = await auth().signInWithCredential(googleCredential);
        setUserProfile(user);
      } else {
        await GoogleSignin.revokeAccess(); // Revoke access if signed in
        await auth().signOut();
        setUserProfile(null);
      }
      setIsSignedIn(!isSignedIn);

    } catch (error) {
      console.log(error.message);
    }

  }


  return (
    <View style={styles.rootContainer}>
      <View style={styles.MainContainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={onMenuPress}>
            <Ionicons name='ios-menu-sharp' size={25} style={styles.Icon} />
          </TouchableOpacity>
          <Text style={styles.searchText}> Search your notes </Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={listhandler}>
            <AntDesign name={iconName} size={23} style={styles.listIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={googleSignInHandler}>
            <Image
              source={userProfile != null ? { uri: userProfile.photoURL } : require('../../../assets/profile.jpg')}
              style={styles.profileImage}
              resizeMode='center'
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


export default TopBarComp

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'

  },
  MainContainer: {
    alignItems: 'center',
    width: '95%',
    height: 50,
    backgroundColor: '#2E2E2E',
    flexDirection: 'row',
    borderRadius: 40,
    justifyContent: 'space-around'
  },
  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '60%',
    // backgroundColor: 'blue',
  },
  rightContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    width: '20%',
    // backgroundColor: 'red',
    justifyContent:'flex-end',
  }
  // leftContainer: {
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   width: '98%',
  //   height: '100%',
  //   borderRadius: 10,
  //   backgroundColor: '#2E2E2E'
  // }
  ,
  searchText: {
    fontSize: 17,
    color: 'white'
  },
  Icon: {
    color: 'white',
    marginLeft:'4%'
  },
  listIcon:{
    color: 'white',
    marginRight: 15
  },
  profileImage: {
    height: 28,
    width: 28,
    borderRadius: 20,

  }
})