import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Buttons, Images, Text, Toasts, Wrapper} from '../../../components';
import {appImages, appStyles, colors, routes} from '../../../services';
import {width, height} from 'react-native-dimension';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function Welcome(props) {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '235370682019-n21f79e1e3u583mgkiecfd5qalidoh5v.apps.googleusercontent.com',
    });
  }, []);
  const [User, setUser] = useState();
  const {navigate} = props.navigation;
  const signIn = async () => {
    try {
      console.log('a');
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID
      console.log('b');
      const {idToken} = await GoogleSignin.signIn();
      console.log('c');
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log('e', error);
        // some other error happened
      }
    }
  };

  return (
    <Wrapper
      //justifyContentSpaceAround
      justifyContentSpaceEvenly
      alignItemsCenter
      isMain
      style={{backgroundColor: colors.appBgColor3}}>
      <Wrapper animation={'shake'}>
        <Image
          style={{width: width(100), height: height(45)}}
          source={appImages.welcome}
        />
      </Wrapper>
      <Text isXLTitle>Expentrip</Text>
      <Wrapper style={{width: '100%'}}>
        <Wrapper>
          <Buttons.Colored
            onPress={() => navigate(routes.signin)}
            textStyle={[
              appStyles.textLarge,
              appStyles.fontBold,
              appStyles.textWhite,
            ]}
            iconName="login"
            iconType="material-community"
            text={'Sign In'}
            animation={'zoomInDown'}
            buttonStyle={{backgroundColor: colors.green}}
          />
        </Wrapper>
        <Wrapper marginVerticalBase>
          <Buttons.Colored
            onPress={() => navigate(routes.signup)}
            textStyle={[
              appStyles.textLarge,
              appStyles.fontBold,
              appStyles.textWhite,
            ]}
            text={'Sign Up Using Email'}
            iconName="account-plus"
            iconType="material-community"
            animation={'zoomInUp'}
            buttonStyle={{backgroundColor: colors.green}}
          />
        </Wrapper>
        <Wrapper alignItemsCenter>
          <TouchableOpacity onPress={() => signIn()}>
            <Images.Round size={55} source={appImages.google} />
          </TouchableOpacity>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}
