import {StyleSheet, Dimensions, KeyboardAvoidingView} from 'react-native';
import React, {useState, useEffect} from 'react';
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
  StatusBars,
  Map,
  Modals,
} from '../../../components';
import {appImages, appStyles, colors, routes, sizes} from '../../../services';
import {width, height, totalSize} from 'react-native-dimension';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {goBack} from '../../../navigation/rootNavigation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import useKeyboard from '../../../services/hooks/useKeyboard';
//import Geolocation from '@react-native-community/geolocation';
//import {UseKeyboard} from '../../../services/hooks';
//import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function AddTrips(props) {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [Loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({});

  const keyboardStatus = useKeyboard();

  const handleSelectLocation = location => {
    setSelectedLocation(location);
  };
  // const handleCurrentLocation = location => {
  //   setCurrentLocation(location);
  // };
  //const {navigate} = props.navigation;
  const {user} = useSelector(state => state.user);

  const handleAddTrip = async () => {
    if (country) {
      setLoading(true);
      const res = await firestore().collection('Trips').doc().set({
        //  place,
        country,
        userId: user.uid,
      });

      goBack();
      setLoading(false);
      Toasts.Success('TRIP ADDED');
    } else {
      Toasts.Error('EMPTY BOXES');
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   GetCurrentLocation();
  // }, []);

  // const GetCurrentLocation = () => {
  //   Geolocation.getCurrentPosition(async info => {
  //     setCurrentLocation({
  //       latitude: info.coords.latitude,
  //       longitude: info.coords.longitude,
  //       //title: info.coords.
  //     });
  //     console.log('current location', info);
  //   });
  // };

  return (
    <>
      <Spacer isStatusBarHeigt />
      <StatusBars.Dark />
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
        <KeyboardAvoidingView style={{flex: 1}}>
          {/* <ScrollViews.KeyboardAvoiding> */}
          {/* <Wrapper alignItemsCenter duration={3000} animation={'fadeInDown'}>
            <Image
              style={{height: height(35), width: width(70)}}
              resizeMode="contain"
              source={appImages.fourpng}
            />
          </Wrapper> */}
          <Wrapper>
            <Wrapper marginHorizontalSmall>
              <Text isMediumTitle>Where on Earth?</Text>
            </Wrapper>
            <Spacer isBasic />
            <Wrapper
              style={{
                width: '100%',
                height: Dimensions.get('window').height, // / 100,
              }}>
              <Map
                currentLocation={currentLocation}
                selectedLocation={selectedLocation}
              />

              <GooglePlacesAutocomplete
                placeholderTextColor={colors.lightGray}
                styles={{
                  textInputContainer: {
                    width: width(95),
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                  },
                  textInput: {
                    marginTop: height(1),
                    height: height(6),
                    borderRadius: height(4),
                    color: colors.black,
                    fontSize: height(2.2),
                    //alignSelf: 'center',
                    marginLeft: height(1),
                  },
                  predefinedPlacesDescription: {
                    color: colors.black,
                  },
                }}
                placeholder="Search a Location..."
                autoCapitalize="none"
                autoCorrect={false}
                fetchDetails={true}
                onChangeText={value => setCountry(value)}
                onPress={(data, details = null) => {
                  setCountry(data.description);
                  handleSelectLocation({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    title: details.name,
                  });
                }}
                query={{
                  key: 'AIzaSyChf7O0VA3FqfcWmKKOloO_fymfmUN06EA',
                  language: 'en',
                }}
              />
            </Wrapper>
          </Wrapper>
          <Spacer isDoubleBase />
          <Spacer isDoubleBase />
          {/* <Wrapper style={{position: 'absolute', bottom: 70, width: '100%'}}>
            <Buttons.Colored
              onPress={GetCurrentLocation}
              buttonStyle={{backgroundColor: colors.green}}
              text={'GetCurrentLocation'}
            />
          </Wrapper> */}

          {!keyboardStatus && (
            <Wrapper style={styles.bottom}>
              <Buttons.Colored
                onPress={handleAddTrip}
                buttonStyle={{backgroundColor: colors.green}}
                text={'Add Trip'}
              />
            </Wrapper>
          )}
        </KeyboardAvoidingView>
        <Modals.Loader isVisible={Loading} />
        {/* </ScrollViews.KeyboardAvoiding> */}
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
    bottom: 20,
    width: '100%',
  },
});
