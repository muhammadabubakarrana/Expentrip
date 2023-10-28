import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import {width, height, totalSize} from 'react-native-dimension';
import {
  Wrapper,
  Text,
  EmptyList,
  Buttons,
  Toasts,
  Modals,
  StatusBars,
  Spacer,
  MyLoader,
} from '../../../components';
import {appImages, appStyles, colors, routes, sizes} from '../../../services';
import randomImage from '../../../assets/images/randomImage';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import {setId} from '../../../services/redux/slice/myId';
import {getDocByKeyValue} from '../../../Backend';

function Home(props) {
  const dispatch = useDispatch();
  const {myId} = useSelector(state => state.myId);
  const {user} = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  const {navigate} = props.navigation;
  const AddTrips = () => {
    navigate(routes.addTrips);
  };
  const toggleModal = () => {
    setModal(!Modal);
  };
  const toggleTripModal = () => {
    setTripModal(!TripModal);
  };
  const openAndDelete = x => {
    toggleTripModal();
    dispatch(setId(x));
    //console.log(x);
  };

  const [TripModal, setTripModal] = useState(false);
  const [Modal, setModal] = useState(false);
  const [Trips, setTrips] = useState([]);
  const [LastName, setLastName] = useState('');
  const isFocused = useIsFocused();

  //fetching Trips
  const fetchTrips = () => {
    try {
      setLoading(true);
      // Reference to the Firestore collection
      const collectionRef = firestore().collection('Trips');

      // Query with a condition (e.g., where field equals a certain value)
      const query = collectionRef.where('userId', '==', user.uid);

      // Subscribe to the query snapshot
      const unsubscribe = query.onSnapshot(snapshot => {
        const dataArray = [];
        snapshot.forEach(doc => {
          // Add each document's data to the array
          dataArray.push({...doc.data(), id: doc.id});
        });
        setTrips(dataArray);
        setLoading(false);
      });
    } catch (error) {
      console.log('TripsError:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchTrips();
      getAllData();
    }
  }, [isFocused]);

  //getting last name
  getAllData = async () => {
    try {
      await getDocByKeyValue('users', user.uid).then(res => {
        setLastName(res.lastName);
      });
    } catch (error) {
      console.log('get All Data error', error);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete expenses associated with the trip from the Expenses collection
      const expensesQuerySnapshot = await firestore()
        .collection('Expenses')
        .where('tripsId', '==', myId)
        .get();

      expensesQuerySnapshot.forEach(async expenseDoc => {
        await expenseDoc.ref.delete();
      });

      // Delete the trip from the Trips collection
      await firestore().collection('Trips').doc(myId).delete();
      // Update the Trips state by filtering out the deleted trip
      setTrips(Trips.filter(item => item.id !== myId));
      toggleTripModal();
      Toasts.Success('Trip Deleted Successfully');
    } catch (error) {
      console.error('Error deleting trip and expenses:', error);
    }
  };

  //Handling Logout
  const handleLogout = async () => {
    try {
      console.log('logout');
      await auth().signOut();
      Toasts.Success('Loged Out');
    } catch (e) {
      console.log('got error', e);
    }
  };

  return (
    <>
      <Wrapper
        style={{
          backgroundColor: colors.appBgColor3,
        }}
        flex={1}>
        <Spacer isStatusBarHeigt />
        <StatusBars.Dark />
        <Wrapper
          flexDirectionRow
          alignItemsCenter
          justifyContentSpaceBetween
          paddingHorizontalSmall>
          <Pressable onPress={() => navigate(routes.AccountSettings)}>
            <Text isMediumTitle>Expentrip</Text>
          </Pressable>

          <TouchableOpacity onPress={toggleModal} style={styles.logoutView}>
            <Text isMedium isBoldFont>
              Logout
            </Text>
          </TouchableOpacity>
        </Wrapper>
        <Wrapper
          duration={2500}
          animation={'zoomInDown'}
          style={{backgroundColor: 'skyblue'}}
          marginVerticalSmall
          isBorderedWrapper
          alignItemsCenter>
          {/* <Image
            style={{width: totalSize(25), height: height(22)}}
            resizeMode="contain"
            source={appImages.banner}
          /> */}
          <Text isLarge>
            Welcome,
            <Text isBoldFont> {LastName}</Text>
          </Text>
        </Wrapper>
        <Wrapper
          flexDirectionRow
          alignItemsCenter
          justifyContentSpaceBetween
          paddingHorizontalSmall
          //  style={{paddingTop: sizes.statusBarHeight}}
        >
          <Text isMediumTitle isBoldFont>
            Recent Tips
          </Text>
          <TouchableOpacity onPress={AddTrips} style={styles.logoutView}>
            <Text isMedium isBoldFont>
              Add Trips
            </Text>
          </TouchableOpacity>
        </Wrapper>
        {/* Displaying Trips */}
        {/* {loading ? (
          <MyLoader isVisible={loading} />
        ) : ( */}

        <FlatList
          data={Trips}
          ListEmptyComponent={
            <EmptyList message={"You haven't recorded any trip yet."} />
          }
          horizontal={false}
          // columnWrapperStyle={{
          //   flexWrap: 'wrap',
          //   //justifyContent: 'space-between',
          // }}
          // numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Wrapper
                style={[
                  appStyles.shadow,
                  appStyles.backgroundColorWhite,
                  {borderRadius: 20},
                  //sizes.ModalRadius,
                ]}
                paddingHorizontalSmall
                alignItemsCenter
                marginHorizontalSmall
                paddingVerticalSmall
                marginVerticalSmall>
                <Wrapper
                  // style={{flexWrap: 'wrap'}}
                  // justifyContentSpaceBetween
                  flexDirectionRow>
                  <Buttons.ColoredSmall
                    buttonStyle={{
                      paddingHorizontal: width(10),
                    }}
                    onPress={() => navigate(routes.tripExpense, {...item})}
                    text={'View'}
                  />

                  <Buttons.ColoredSmall
                    buttonStyle={{
                      paddingHorizontal: width(10),
                      backgroundColor: 'red',
                      marginLeft: width(2),
                    }}
                    onPress={() => openAndDelete(item.id)}
                    text={'Delete'}
                  />
                </Wrapper>
                <Image
                  style={{width: width(50), height: height(25)}}
                  source={randomImage()}
                  resizeMode="contain"
                />
                <Text isMediumTitle>{item.place}</Text>
                <Text isMedium>{item.country}</Text>
              </Wrapper>
            );
          }}
        />

        {/* )} */}
      </Wrapper>

      {/* 1st Modal */}
      <Modals.AlertModal
        dontShake
        tittleStyle={[appStyles.textLarge, appStyles.fontBold]}
        isVisible={Modal}
        toggleModal={toggleModal}
        title="Are You want to Logout?"
        onPress={toggleModal}
        onPress1={handleLogout}
        t1={'Logout'}
      />
      {/* 2nd Modal */}
      <Modals.AlertModal
        tittleStyle={[
          appStyles.textLarge,
          appStyles.fontBold,
          {textAlign: 'center'},
        ]}
        isVisible={TripModal}
        toggleModal={toggleTripModal}
        title="Expenses Related to this Trip will also be deleted."
        onPress={() => toggleTripModal()}
        onPress1={() => handleDelete()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  logoutView: {
    backgroundColor: 'white',
    borderRadius: 30,
    ...appStyles.paddingHorizontalSmall,
    ...appStyles.paddingVerticalTiny,
  },
});

export default Home;
