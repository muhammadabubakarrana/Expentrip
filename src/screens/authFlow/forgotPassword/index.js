import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Buttons,
  Toasts,
  Text,
  TextInputs,
  Wrapper,
  Icons,
} from '../../../components';
import {appImages, colors, registerSchema} from '../../../services';
import {width, height, totalSize} from 'react-native-dimension';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as yup from 'yup';
import {goBack} from '../../../navigation/rootNavigation';

const Schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(Schema),
  });

  const onSubmit = async ({email}) => {
    try {
      await auth().sendPasswordResetEmail(email);
      Toasts.Success(`Link Sent to ${email}`);
      // console.log('aaaaaaa', email);
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        Toasts.Error(
          'There is no user record corresponding to this identifier. The user may have been deleted.',
        );
      } else {
        Toasts.Error('Error', e);
      }
      console.log('abubakar', e);
    }
  };

  return (
    <Wrapper isMain style={{backgroundColor: colors.bloodOrange}}>
      <Wrapper marginHorizontalBase style={styles.Back}>
        <TouchableOpacity onPress={goBack}>
          <Icons.Back />
        </TouchableOpacity>
      </Wrapper>
      <Image
        style={{width: width(80), height: width(60), alignSelf: 'center'}}
        source={appImages.elevenpng}
      />
      <Wrapper paddingHorizontalSmall style={styles.Card}>
        <Text alignTextCenter isMediumTitle>
          Forgot Password?
        </Text>
        <Text alignTextCenter isLarge>
          Enter the email address associated with your account and we'll send
          you a password reset link.
        </Text>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <TextInputs.Colored
              onChangeText={onChange}
              value={value}
              inputContainerStyle={{backgroundColor: colors.appBgColor3}}
              placeholder="Email"
              iconNameRight="at-sign"
              iconTypeRight="feather"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text isLarge style={{color: 'red'}} alignTextCenter>
            Email is required.
          </Text>
        )}

        <Buttons.Colored
          onPress={handleSubmit(onSubmit)}
          buttonColor={colors.green}
          text={'Send Link'}
        />
      </Wrapper>
    </Wrapper>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  Card: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.snow,
    borderTopRightRadius: totalSize(5),
    borderTopLeftRadius: totalSize(5),
    width: '100%',
    justifyContent: 'space-evenly',
    height: height(50),
    // alignItems: 'center',
  },
  Back: {
    backgroundColor: colors.appBgColor2,
    borderRadius: width(5),
    padding: width(1),
    alignSelf: 'flex-start',
    marginTop: height(2),
  },
});
