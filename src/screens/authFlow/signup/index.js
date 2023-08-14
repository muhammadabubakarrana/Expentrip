import React, {Component, useState} from 'react';
import {View, Image} from 'react-native';
import {height, width, totalSize} from 'react-native-dimension';
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
} from '../../../components';
import {
  appImages,
  appStyles,
  colors,
  registerSchema,
  routes,
} from '../../../services';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function Signup(props) {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const {navigate} = props.navigation;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async ({email, password, firstName, lastName}) => {
    try {
      setShowLoader(true);
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const res = await firestore().collection('users').doc(user.uid).set({
        firstName,
        lastName,
        email,
        password,
      });
      console.log('res', res);
      navigate(routes.signin);
      setShowLoader(false);
      Toasts.Success('Success');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <Wrapper isMain style={{backgroundColor: colors.appBgColor3}}>
        <ScrollViews.KeyboardAvoiding>
          <Spacer isBasic />
          <Wrapper alignItemsCenter>
            <Image
              style={{width: width(70), height: height(30)}}
              resizeMode="cover"
              source={appImages.signup}
            />
            <Spacer isDoubleBase />
          </Wrapper>
          <Spacer isBasic />
          <Wrapper marginHorizontalBase>
            <Wrapper marginHorizontalBase flexDirectionRow alignItemsCenter>
              <Wrapper flex={1}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInputs.Colored
                      inputContainerStyle={{backgroundColor: colors.white}}
                      placeholder="First Name"
                      iconName="account"
                      iconType="material-community"
                      containerStyle={{marginHorizontal: 0}}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="firstName"
                />
                {errors.firstName && (
                  <Text isBasic style={{color: 'red'}} alignTextCenter>
                    This is required.
                  </Text>
                )}
              </Wrapper>
              <Wrapper flex={0.1} />
              <Wrapper flex={1}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInputs.Colored
                      inputContainerStyle={{backgroundColor: colors.white}}
                      placeholder="Last Name"
                      iconName="account"
                      iconType="material-community"
                      containerStyle={{marginHorizontal: 0}}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="lastName"
                />
                {errors.lastName && (
                  <Text isBasic style={{color: 'red'}} alignTextCenter>
                    This is required.
                  </Text>
                )}
              </Wrapper>
            </Wrapper>

            <Spacer isBasic />

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
                <Text style={{color: 'red'}} isBasic>
                  {errors.password.message}
                </Text>
              )}
            </Wrapper>
            <Spacer isDoubleBase />
            {showLoader ? (
              <MyLoader isVisible={showLoader}/>
            ) : (
              <Buttons.Colored
                onPress={handleSubmit(onSubmit)}
                buttonColor={colors.green}
                text="Sign Up Now"
                iconName="account-plus"
                iconType="material-community"
              />
            )}
          </Wrapper>
          <Spacer isBasic />
          <Wrapper alignItemsCenter>
            <Icons.WithText
              textStyle={[appStyles.textMedium, appStyles.fontBold]}
              iconSize={totalSize(3)}
              text="Already have an account, Sign In"
              iconName="arrow-left"
              onPress={() => navigate(routes.signin)}
            />
          </Wrapper>
        </ScrollViews.KeyboardAvoiding>
      </Wrapper>
    </>
  );
}

export default Signup;
