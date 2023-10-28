import React, {useState} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {totalSize} from 'react-native-dimension';
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
import {colors, routes} from '../../../services';
import {signInWithPhone} from '../../../Backend';
import {navigate} from '../../../navigation/rootNavigation';
import auth, {firebase} from '@react-native-firebase/auth';

const PhoneVerification = () => {
  //const {choice} = props.route.params;
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState('+92');
  const [countryFlag, setCountryFlag] = useState('🇵🇰');
  const [number, setNumber] = useState('');
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const onSignUp = async () => {
    // console.log(countryCode + number);
    try {
      navigate(routes.CodeVerification);
      //firebase.initializeApp(config);
      // if (countryCode && number) {
      //   setLoader(true);
      //   console.log('number', countryCode + number);
      let codeConfirm = await auth().signInWithPhoneNumber(
        countryCode + number,
      );
      console.log('codeget', codeConfirm);
      //   setLoader(false);
      //   if (codeConfirm.token) {
      //     navigation.navigate(routes.CodeVerification, {
      //       codeConfirm: codeConfirm,
      //       phoneNumber: countryCode + number,
      //     });
      //   } else {
      //     setLoader(false);
      //     Toasts.Error('Please enter phone number');
      //     Alert.alert('request Faild' + '  ' + codeConfirm.error);
      //   }
      // }
    } catch (e) {
      console.log('signup', e);
    }
  };

  return (
    <Wrapper
      isMain
      style={{flex: 1, backgroundColor: '#F8F9F9', justifyContent: 'center'}}>
      <Wrapper marginHorizontalBase>
        <ScrollViews.KeyboardAvoiding>
          <Wrapper marginHorizontalBase>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '900',
                color: '#383838',
                textAlign: 'center',
              }}>
              Enter your phone{`\n`}to verify your{`\n`}account
            </Text>
            <Spacer isBasic />
            <Spacer isBasic />
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#FFF',
                borderColor: '#DEE1E1',
                borderWidth: 1,
                borderRadius: 8,
                paddingVertical: totalSize(1),
                paddingHorizontal: totalSize(1.4),
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setShow(!show)}
                style={{
                  justifyContent: 'center',
                  borderRightColor: '#DEE1E1',
                  borderRightWidth: 1,
                  paddingRight: totalSize(1),
                }}>
                <Text style={{fontSize: 20}}>{countryFlag}</Text>
              </TouchableOpacity>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TextInputs.Colored
                  placeholder={'03224711707'}
                  containerStyle={{marginHorizontal: 0}}
                  inputStyle={{
                    padding: 0,
                    height: 'auto',
                    backgroundColor: '#FFF',
                    paddingHorizontal: totalSize(1),
                  }}
                  //maxLength={10}
                  onChangeText={t => setNumber(t)}
                />
              </View>
            </View>
            <Spacer isBasic />
            <Spacer isBasic />
            <Buttons.Colored
              text={
                loader ? (
                  <ActivityIndicator size={'small'} color={'white'} />
                ) : (
                  'Sign Up'
                )
              }
              buttonStyle={{marginHorizontal: 0, backgroundColor: colors.green}}
              onPress={() => onSignUp()}
            />
          </Wrapper>
        </ScrollViews.KeyboardAvoiding>
      </Wrapper>
      <CountryPicker
        show={show}
        style={{
          modal: {
            height: 350,
          },
        }}
        onBackdropPress={() => setShow(false)}
        pickerButtonOnPress={item => {
          console.log('item =====> ', item.dial_code);
          setCountryCode(item.dial_code);
          setCountryFlag(item.flag);
          setShow(false);
        }}
      />
    </Wrapper>
  );
};

export default PhoneVerification;
