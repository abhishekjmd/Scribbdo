import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '988883850398-410kfj5k8muh512076smfmpcnne13khu.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
});

export const GoogleSignInHandler = async () => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredentials = firebase.auth.GoogleAuthProvider.credential(idToken);
        const { user } = await firebase.auth().signInWithCredential(googleCredentials);
        console.log('User Profile:', user.toJSON());
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('Google sign-in cancelled');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Google sign-in is already in progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Google Play Services is not available');
        } else {
            console.log('Google sign-in error:', error.message);
        }
    }
};
