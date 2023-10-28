import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Buttons, Images, Text, Toasts, Wrapper} from '../../../components';
import {appImages, appStyles, colors, routes} from '../../../services';
import {width, height} from 'react-native-dimension';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

export default function Welcome(props) {
  GoogleSignin.configure({
    webClientId:
      '235370682019-lm7jmfn8k670ag2prggpc55jkka7u3fm.apps.googleusercontent.com',
  });
  // const SingInGoogle = async () => {
  //   //setLoader(true)
  //   try {
  //     const {idToken} = await GoogleSignin.signIn();
  //     console.log('ssss google login idToken', idToken);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   // try {
  //   //   const {idToken} = await GoogleSignin.signIn();
  //   //   console.log('ssss google login idToken', idToken);
  //   //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //   //   console.log('ssss google login data', googleCredential);
  //   //   await auth().signInWithCredential(googleCredential);
  //   //   //navigate(routes.app);
  //   // } catch (e) {
  //   //   console.log('Abubakar', e);
  //   // }
  // };
  const {navigate} = props.navigation;

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
        <Wrapper>
          <Buttons.Colored
            onPress={() => navigate(routes.PhoneVerification)}
            textStyle={[
              appStyles.textLarge,
              appStyles.fontBold,
              appStyles.textWhite,
            ]}
            text={'Sign Up Using Phone'}
            iconName="account-plus"
            iconType="material-community"
            animation={'zoomInUp'}
            buttonStyle={{backgroundColor: colors.green}}
          />
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}
