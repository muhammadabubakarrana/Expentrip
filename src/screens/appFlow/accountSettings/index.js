import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
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
  Images,
  Modals,
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
import {getDocByKeyValue, updateField} from '../../../Backend';
import {accountSettings} from '../../../services/validations';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {goBack} from '../../../navigation/rootNavigation';

const AccountSettings = props => {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const {navigate} = props.navigation;
  const {user} = useSelector(state => state.user);
  const isFocused = useIsFocused();

  getAllData = async () => {
    try {
      await getDocByKeyValue('users', user.uid).then(res => {
        // res.map(item => {
        setFirstname(res.firstName);
        setLastName(res.lastName);
        setEmail(res.email);
        //console.log('item data', res);
        // });
      });
    } catch (error) {
      console.log('get All Data error', error);
    }
  };
  useEffect(() => {
    if (isFocused) {
      getAllData();
    }
  }, [props, isFocused]);

  const onSubmit = async () => {
    try {
      setShowLoader(true);
      updateField('users', user.uid, 'firstName', firstName).then(res => {
        updateField('users', user.uid, 'lastName', lastName).then(res => {
          updateField('users', user.uid, 'email', email).then(res => {
            setShowLoader(false);
          });
        });
      });

      console.log(email, firstName, lastName);
      // goBack;
      //navigate(routes.signin);

      Toasts.Success('UPDATED');
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <Wrapper isMain style={{backgroundColor: colors.appBgColor3}}>
      <Spacer isStatusBarHeigt />
      <Spacer isBasic />

      <ScrollViews.KeyboardAvoiding>
        <Wrapper flexDirectionRow alignItemsCenter>
          <Wrapper marginHorizontalBase style={styles.Back}>
            <TouchableOpacity onPress={goBack}>
              <Icons.Back />
            </TouchableOpacity>
          </Wrapper>

          <Text isMediumTitle style={{marginLeft: width(7)}}>
            Account Settings
          </Text>
        </Wrapper>
        <Spacer isDoubleBase />
        <Wrapper marginHorizontalBase>
          <Wrapper marginHorizontalBase flexDirectionRow alignItemsCenter>
            <Wrapper flex={1}>
              <TextInputs.Colored
                inputContainerStyle={{backgroundColor: colors.white}}
                placeholder="First Name"
                iconName="account"
                iconType="material-community"
                containerStyle={{marginHorizontal: 0}}
                onChangeText={val => setFirstname(val)}
                value={firstName}
              />
            </Wrapper>
            <Wrapper flex={0.1} />
            <Wrapper flex={1}>
              <TextInputs.Colored
                inputContainerStyle={{backgroundColor: colors.white}}
                placeholder="Last Name"
                iconName="account"
                iconType="material-community"
                containerStyle={{marginHorizontal: 0}}
                onChangeText={val => setLastName(val)}
                value={lastName}
              />
            </Wrapper>
          </Wrapper>

          <Spacer isBasic />

          <TextInputs.Colored
            onChangeText={val => setEmail(val)}
            value={email}
            inputContainerStyle={{backgroundColor: colors.white}}
            placeholder="Email"
            iconNameRight="at-sign"
            iconTypeRight="feather"
          />

          <Spacer isBasic />

          {/* <Controller
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
          </Wrapper> */}
          <Spacer isDoubleBase />

          <Buttons.Colored
            //onPress={goBack}
            onPress={onSubmit}
            buttonColor={colors.green}
            text="Update"
            iconName="update"
            iconType="material-community"
          />
        </Wrapper>
        <Spacer isBasic />
      </ScrollViews.KeyboardAvoiding>
      <Modals.Loader isVisible={showLoader} />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  Back: {
    backgroundColor: colors.appBgColor2,
    borderRadius: width(5),
    padding: width(2),
    alignSelf: 'flex-start',
  },
});

export default AccountSettings;
