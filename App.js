import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {RootSiblingParent} from 'react-native-root-siblings';
import {AddExpense, AddTrips, Home, TripExpenses} from './src/screens/appFlow';
import {ForgotPassword, Signin, Signup, Welcome} from './src/screens/authFlow';
import {Provider} from 'react-redux';
import {store} from './src/services/redux/store';
import {enableLatestRenderer} from 'react-native-maps';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import auth, {firebase} from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '235370682019-6smcubefu1dtpgkmb13egod2i7kh9n6d.apps.googleusercontent.com',
});

enableLatestRenderer();
const onGoogleSignIn = async () => {
  try {
    const {idToken} = await GoogleSignin.signIn();
    console.log('ssss google login idToken', idToken);
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log('ssss google login data', googleCredential);
    //  await auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error(error);
  }
};

export default function App() {
  return (
    <RootSiblingParent>
      <SafeAreaProvider style={{flex: 1}}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeAreaProvider>
    </RootSiblingParent>
    // <ForgotPassword/>
    // <GoogleSigninButton onPress={() => onGoogleSignIn()} />
  );
}
