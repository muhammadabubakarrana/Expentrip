import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {width, height, totalSize} from 'react-native-dimension';
import {
  Wrapper,
  Text,
  EmptyList,
  Buttons,
  MyModal,
  Toasts,
} from '../../../components';
import {appImages, appStyles, colors, routes, sizes} from '../../../services';
import randomImage from '../../../assets/images/randomImage';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

function Home(props) {
  const {user} = useSelector(state => state.user);
  const {navigate} = props.navigation;
  const AddTrips = () => {
    navigate(routes.addTrips);
  };
  const toggleModal = () => {
    setModal(!Modal);
  };
  // const toggleTripModal = () => {
  //   setModal(!Modal);
  // };

  // const [TripModal, setTripModal] = useState(false);
  const [Modal, setModal] = useState(false);
  const [Trips, setTrips] = useState([]);
  const isFocused = useIsFocused();

  //fetching Trips
  const fetchTrips = () => {
    // Reference to the Firestore collection
    const collectionRef = firestore().collection('Trips');

    // Query with a condition (e.g., where field equals a certain value)
    const query = collectionRef.where('userId', '==', user.uid);

    // Subscribe to the query snapshot
    const unsubscribe = query.onSnapshot(snapshot => {
      const dataArray = [];
      snapshot.forEach((doc, index) => {
        // Add each document's data to the array

        dataArray.push({...doc.data(), id: doc.id});
      });
      setTrips(dataArray);
      console.log(dataArray);
    });
  };

  useEffect(() => {
    if (isFocused) {
      fetchTrips();
    }
  }, [isFocused]);

  // to delete trips

  const handleDelete = async tripId => {
    try {
      // Delete expenses associated with the trip from the Expenses collection
      const expensesQuerySnapshot = await firestore()
        .collection('Expenses')
        .where('tripsId', '==', tripId)
        .get();

      expensesQuerySnapshot.forEach(async expenseDoc => {
        await expenseDoc.ref.delete();
      });

      // Delete the trip from the Trips collection
      await firestore().collection('Trips').doc(tripId).delete();
      // Update the Trips state by filtering out the deleted trip
      setTrips(Trips.filter(item => item.id !== tripId));
      Toasts.Success('TRIP Deleted');
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
          paddingTop: sizes.TinyMargin,
          backgroundColor: colors.appBgColor3,
        }}
        flex={1}>
        <Wrapper
          flexDirectionRow
          alignItemsCenter
          justifyContentSpaceBetween
          paddingHorizontalSmall>
          <Text isMediumTitle>Expentrip</Text>
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
          <Image
            style={{width: totalSize(25), height: height(22)}}
            resizeMode="contain"
            source={appImages.banner}
          />
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
        <FlatList
          data={Trips}
          ListEmptyComponent={
            <EmptyList message={"You haven't recorded any trip yet."} />
          }
          // horizontal
          // numColumns={2}
          // showsVerticalScrollIndicator={false}
          // columnWrapperStyle={{justifyContent: 'space-around'}}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Wrapper
                style={[appStyles.shadowDark]}
                paddingHorizontalTiny
                //paddingHorizontalBase
                alignItemsCenter
                paddingVerticalSmall
                marginVerticalSmall
                isCardView>
                <Wrapper justifyContentSpaceBetween flexDirectionRow>
                  <Buttons.ColoredSmall
                    onPress={() => navigate(routes.tripExpense, {...item})}
                    text={'View'}
                  />

                  <Buttons.ColoredSmall
                    buttonStyle={{backgroundColor: 'red', marginLeft: 5}}
                    onPress={() => handleDelete(item.id)}
                    text={'Delete'}
                  />
                </Wrapper>
                <Image
                  style={{width: width(30), height: height(20)}}
                  source={randomImage()}
                  resizeMode="contain"
                />
                <Text isMedium isBoldFont>
                  {item.place}
                </Text>
                <Text isBoldFont>{item.country}</Text>
              </Wrapper>
            );
          }}
        />
      </Wrapper>

      {/* 1st Modal */}
      <MyModal
        tittleStyle={[appStyles.textLarge, appStyles.fontBold]}
        isVisible={Modal}
        toggleModal={toggleModal}
        title="Are You want to Logout?">
        <Wrapper flexDirectionRow>
          <Buttons.ColoredSmall
            textStyle={{...appStyles.ButtonMedium, color: 'white'}}
            onPress={toggleModal}
            text={'Cancell'}
          />

          <Buttons.ColoredSmall
            onPress={handleLogout}
            textStyle={{...appStyles.ButtonMedium, color: 'white'}}
            buttonStyle={{backgroundColor: 'red', marginLeft: width(5)}}
            text={'Logout'}
          />
        </Wrapper>
      </MyModal>
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
