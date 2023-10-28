import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {totalSize, width, height} from 'react-native-dimension';
import {
  Logos,
  Toasts,
  Icons,
  TextInputs,
  Buttons,
  ScrollViews,
  Wrapper,
  Spacer,
  Text,
} from '../../../components';
import {useNavigation} from '@react-navigation/native';
//import CustomStatusBar from '../../../components/statusBars/customStatusBar';
import {CountryPicker} from 'react-native-country-codes-picker';
import {colors, fontFamily} from '../../../services';
import {Icon} from '@rneui/base';
import {goBack} from '../../../navigation/rootNavigation';
import Toast from 'react-native-root-toast';
import auth from '@react-native-firebase/auth';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

const CodeVerification = props => {
  // const {codeConfirm, phoneNumber} = props.route.params;
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState('');
  const [countryFlag, setCountryFlag] = useState('🇨🇦');
  const [show, setShow] = useState(false);
  const input_1 = useRef(null);
  const input_2 = useRef(null);
  const input_3 = useRef(null);
  const input_4 = useRef(null);
  const input_5 = useRef(null);
  const input_6 = useRef(null);
  const [codeOne, setCodeOne] = useState('');
  const [codeTwo, setCodeTwo] = useState('');
  const [codeThree, setCodeThree] = useState('');
  const [codeFour, setCodeFour] = useState('');
  const [codeFive, setCodeFive] = useState('');
  const [codeSix, setCodeSix] = useState('');
  const [loader, setLoader] = useState(false);
  const [isloader, setIsLoader] = useState(false);
  const [verificationId, setVerificationId] =
    useState();
    //  codeConfirm.token._verificationId,
  const [count, setCount] = useState(60);

  const navigateToSpecificScreen = async () => {
    setIsLoader(true);
    // try {
    //   const credential = auth.PhoneAuthProvider.credential(
    //     verificationId,
    //     codeOne + codeTwo + codeThree + codeFour + codeFive + codeSix,
    //   );
    //   await auth()
    //     .signInWithCredential(credential)
    //     .then(async res => {
    //       console.log('users', res);
    //       // await AsyncStorage.setItem('userToken', res.user._user.uid);
    //       await firestore()
    //         .collection('users')
    //         .doc(res.user._user.uid)
    //         .set({phone: res.user._user.phoneNumber}, {merge: true})
    //         .then(res => {
    //           console.log('res', res);
    //           //  if(res){
    //           setIsLoader(false);
    //           navigation.navigate('OnBoarding');
    //           //  }
    //         })
    //         .catch(function (error) {
    //           console.error('Error writing document: ', error);
    //           setIsLoader(false);
    //         });
    //     })
    //     .catch(err => {
    //       console.log('err', err.code), setIsLoader(false);
    //       Alert.alert(err.code.slice(5));
    //     });
    //   console.log('Phone number verified successfully!');
    // } catch (error) {
    //   console.error('Error verifying OTP:', error);
    //   // Alert.alert(error)
    //   setIsLoader(false);
    //   // Handle the error here (e.g., display an error message to the user)
    // }
  };

  const ResendCode = async () => {
    setLoader(true);

    // try {
    //   await auth()
    //     .signInWithPhoneNumber(phoneNumber)
    //     .then(res => {
    //       console.log(' confirmation resend', res);
    //       setVerificationId(res._verificationId);
    //       Alert.alert('OTP send successfully');
    //       setLoader(false);
    //     })
    //     .catch(err => {
    //       console.log('err', err), Alert.alert(err.code);
    //       setLoader(false);
    //     });
    // } catch (error) {
    //   console.error('Error resending OTP:', error);
    //   setLoader(false);

    //   // Handle the error here (e.g., display an error message to the user)
    // }
  };

  const interval = 1000; // 1 second

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (count === 0) {
        clearInterval(countdownInterval); // Stop the countdown when it reaches 0
        console.log('Countdown is over!');
      } else {
        setCount(count - 1); // Update the state variable
      }
    }, interval);

    return () => {
      clearInterval(countdownInterval); // Clean up the interval when the component unmounts
    };
  }, [count]);

  return (
    <Wrapper
      isMain
      style={{
        //flex: 1,
        backgroundColor: colors.appBgColor4,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <Spacer isHeaderHeight />
      <Wrapper flex={1} justifyContentCenter marginHorizontalBase>
        {/* Back */}
        <TouchableOpacity
          style={{
            marginVertical: width(2),
            backgroundColor: colors.snow,
            borderRadius: 100,
            alignItems: 'center',
            width: 45,
            height: 45,
            justifyContent: 'center',
            position: 'absolute',
            top: 20,
            left: 15,
          }}
          onPress={goBack}>
          <Icon
            size={totalSize(3.5)}
            type="material-icons"
            name="keyboard-backspace"
          />
        </TouchableOpacity>
        <Wrapper marginHorizontalBase alignItemsCenter>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '900',
              color: '#383838',
              textAlign: 'center',
            }}>
            Enter Verification{'\n'}Code
          </Text>
          <Spacer isBasic />
          <Spacer isBasic />
          <Text
            style={{
              color: '#383838',
              fontSize: 16,
              fontWeight: '400',
              textAlign: 'center',
              lineHeight: 22.4,
            }}>
            Please check your messages for your{'\n'}verification code
          </Text>

          <Spacer isDoubleBase />
          <Wrapper flexDirectionRow justifyContentCenter alignItemsCenter>
            <TextInput
              ref={input_1}
              maxLength={1}
              keyboardType={'number-pad'}
              value={codeOne}
              style={[styles.inputStyle, {marginLeft: 0}]}
              onChangeText={val => {
                setCodeOne(val);
                if (val != '') {
                  input_2.current.focus();
                }
              }}
            />
            <TextInput
              ref={input_2}
              maxLength={1}
              keyboardType={'number-pad'}
              value={codeTwo}
              style={styles.inputStyle}
              onChangeText={val => {
                setCodeTwo(val);
                if (val != '') {
                  input_3.current.focus();
                }
              }}
            />
            <TextInput
              ref={input_3}
              maxLength={1}
              keyboardType={'number-pad'}
              value={codeThree}
              style={styles.inputStyle}
              onChangeText={val => {
                setCodeThree(val);
                if (val != '') {
                  input_4.current.focus();
                }
              }}
            />
            <TextInput
              ref={input_4}
              maxLength={1}
              keyboardType={'number-pad'}
              value={codeFour}
              style={styles.inputStyle}
              onChangeText={val => {
                setCodeFour(val);
                if (val != '') {
                  input_5.current.focus();
                }
              }}
            />
            <TextInput
              ref={input_5}
              maxLength={1}
              keyboardType={'number-pad'}
              value={codeFive}
              style={styles.inputStyle}
              onChangeText={val => {
                setCodeFive(val);
                if (val != '') {
                  input_6.current.focus();
                }
              }}
            />
            <TextInput
              ref={input_6}
              maxLength={1}
              keyboardType={'number-pad'}
              value={codeSix}
              style={styles.inputStyle}
              onChangeText={val => {
                setCodeSix(val);
              }}
            />
          </Wrapper>
          <Spacer isDoubleBase />
          <View style={{width: '100%'}}>
            <Buttons.Colored
              text={
                isloader ? (
                  <ActivityIndicator size={'small'} color={'white'} />
                ) : (
                  'Confirm Code'
                )
              }
              buttonStyle={{marginHorizontal: 0}}
              onPress={() => navigateToSpecificScreen()}
            />
          </View>
          <Spacer isBasic />
          <Text
            onPress={() => ResendCode()}
            style={{
              fontSize: 14,
              fontWeight: '400',
              textAlign: 'center',
            }}>
            <Text style={{color: '#383838'}}>Didn’t get it?</Text>
            {count !== 0 ? (
              <Text style={{fontWeight: '800', color: '#383838'}}>
                {'   ' + count}
              </Text>
            ) : (
              <>
                {loader ? (
                  <ActivityIndicator size={'small'} color={'black'} />
                ) : (
                  <Text style={{fontWeight: '800', color: '#383838'}}>
                    {'  Resend Code'}
                  </Text>
                )}
              </>
            )}
          </Text>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000000',
    fontFamily: fontFamily.appTextRegular,
    fontWeight: '400',
    fontSize: 14,
    marginLeft: totalSize(0.8),
    textAlign: 'center',
    width: 48,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEE1E1',
    borderRadius: 8,
  },
});

export default CodeVerification;
