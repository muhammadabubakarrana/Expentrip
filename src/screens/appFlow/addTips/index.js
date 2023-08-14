import {StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '../../../components/wrapper';
import {
  Buttons,
  Headers,
  ScrollViews,
  TextInputs,
  Toasts,
  Text,
  Spacer,
  MyLoader,
} from '../../../components';
import {appImages, appStyles, colors, routes, sizes} from '../../../services';
import {width, height, totalSize} from 'react-native-dimension';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {goBack} from '../../../navigation/rootNavigation';

export default function AddTrips(props) {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [Loading, setLoading] = useState(false);

  //const {navigate} = props.navigation;
  const {user} = useSelector(state => state.user);

  const handleAddTrip = async () => {
    if (place && country) {
      setLoading(true);

      const res = await firestore().collection('Trips').doc().set({
        place,
        country,
        userId: user.uid,
      });

      setLoading(false);
      goBack();
      Toasts.Success('TRIP ADDED');
    } else {
      Toasts.Error('EMPTY BOXES');
    }
  };

  return (
    <>
      <Headers.Primary
        auth
        containerStyle={styles.headerContainer}
        leftContainerStyle={styles.back}
        showBackArrow
        title={'Add Trips'}
      />
      <Wrapper
        //marginVerticalBase
        style={{
          backgroundColor: colors.appBgColor2,
        }}
        isMain>
        <ScrollViews.KeyboardAvoiding>
          <Wrapper alignItemsCenter duration={3000} animation={'fadeInDown'}>
            <Image
              style={{height: height(35), width: width(70)}}
              resizeMode="contain"
              source={appImages.fourpng}
            />
          </Wrapper>
          <Wrapper marginHorizontalSmall>
            <Text isSmallTitle>Where on Earth?</Text>
            <Spacer isSmall />
            <TextInputs.Bordered
              value={place}
              onChangeText={value => setPlace(value)}
              containerStyle={styles.input}
            />
            <Spacer isBasic />
            <Text isSmallTitle>Which Country?</Text>
            <Spacer isSmall />
            <TextInputs.Bordered
              value={country}
              onChangeText={value => setCountry(value)}
              containerStyle={styles.input}
            />
          </Wrapper>
          <Spacer isDoubleBase />
          <Spacer isDoubleBase />
          {Loading ? (
            <MyLoader isVisible={Loading} />
          ) : (
            <Wrapper style={styles.bottom}>
              <Buttons.Colored
                onPress={handleAddTrip}
                buttonStyle={{backgroundColor: colors.green}}
                text={'Add Trip'}
              />
            </Wrapper>
          )}
        </ScrollViews.KeyboardAvoiding>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  back: {
    height: height(5), //height(5),
    width: width(5),
    backgroundColor: colors.appColor3,
    borderRadius: totalSize(5 / 2),
  },
  headerContainer: {
    backgroundColor: colors.appBgColor2,
  },
  input: {
    backgroundColor: colors.white,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
