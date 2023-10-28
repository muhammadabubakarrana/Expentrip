import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {totalSize, width, height} from 'react-native-dimension';
import {
  Toasts,
  Icons,
  TextInputs,
  Buttons,
  ScrollViews,
  Wrapper,
  Spacer,
  Text,
  MyLoader,
  Images,
} from '../../../components';
import {
  appImages,
  appStyles,
  colors,
  loginSchema,
  routes,
} from '../../../services';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

function Signin(props) {
  const [showLoader, setShowLoader] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [user, setUser] = useState(false);

  const {navigate} = props.navigation;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSignIn = async ({email, password}) => {
    try {
      setShowLoader(true);
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      const res = await firestore().collection('users').doc(user.uid).get();
      if (res.exists) {
        setShowLoader(false);
        navigate(routes.app);
        Toasts.Success('Signed In');
        console.log('Valid');
      }
    } catch (myError) {
      setShowLoader(false);
      if (myError.code === 'auth/wrong-password') {
        Toasts.Error('Wrong Password');
      } else if (myError.code === 'auth/invalid-email') {
        Toasts.Error('invalid-email');
      } else if (myError.code === 'auth/user-not-found') {
        Toasts.Error('Email not Found');
      } else {
        Toasts.Error('Invalid credentials');
        console.log(myError);
      }
    }
  };

  return (
    <>
      <Wrapper isMain style={{backgroundColor: colors.appBgColor3}}>
        <ScrollViews.KeyboardAvoiding>
          <Spacer isBasic />
          <Wrapper alignItemsCenter>
            {/* <Logos.Primary
            size={totalSize(25)}
          /> */}
            <Image
              style={{width: width(70), height: height(30)}}
              resizeMode="cover"
              source={appImages.login}
            />
            <Spacer isDoubleBase />
          </Wrapper>
          <Spacer isBasic />
          <Wrapper marginHorizontalBase>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInputs.Colored
                  onChangeText={onChange}
                  value={value}
                  inputContainerStyle={{backgroundColor: colors.white}}
                  placeholder="Email"
                  iconNameRight="at-sign"
                  iconTypeRight="feather"
                  iconColorRight={colors.appColor9}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text isBasic style={{color: 'red'}} alignTextCenter>
                Email is required.
              </Text>
            )}

            <Spacer isBasic />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInputs.Colored
                  value={value}
                  onChangeText={onChange}
                  placeholder="Password"
                  iconColorRight={
                    isPasswordVisible ? colors.appColor9 : colors.appColor9
                  }
                  iconName="lock"
                  secureTextEntry={!isPasswordVisible}
                  iconNameRight={isPasswordVisible ? 'eye' : 'eye-off'}
                  iconTypeRight={'feather'}
                  onPressIconRight={() =>
                    setPasswordVisibility(!isPasswordVisible)
                  }
                />
              )}
              name="password"
            />
            <Wrapper marginHorizontalLarge alignItemsFlexStart>
              {errors.password && (
                <Text isBasic style={{color: 'red'}}>
                  {errors.password.message}
                </Text>
              )}
            </Wrapper>
            <Wrapper marginVerticalBase>
              <Text
                onPress={() => navigate(routes.forgotPassword)}
                alignTextCenter
                isLarge
                isBoldFont
                style={{color: 'green'}}>
                Forgot Password?
              </Text>
            </Wrapper>

            {showLoader ? (
              <MyLoader isVisible={showLoader} />
            ) : (
              <Buttons.Colored
                buttonColor={colors.green}
                text="Sign In"
                iconName="login"
                iconType="material-community"
                onPress={handleSubmit(onSignIn)}
              />
            )}
          </Wrapper>
          <Spacer isBasic />
          <Wrapper alignItemsCenter>
            <Icons.WithText
              textStyle={[appStyles.textMedium, appStyles.fontBold]}
              iconSize={totalSize(3)}
              text="Register Now"
              iconName="arrow-right"
              direction="row-reverse"
              onPress={() => navigate(routes.signup)}
            />
          </Wrapper>
        </ScrollViews.KeyboardAvoiding>
      </Wrapper>
    </>
  );
}

export default Signin;
