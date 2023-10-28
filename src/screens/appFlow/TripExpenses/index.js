import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {width, height, totalSize} from 'react-native-dimension';
import {
  Wrapper,
  Text,
  EmptyList,
  ExpenseCard,
  Spacer,
  Icons,
  StatusBars,
  Modals,
  Toasts,
  MyLoader,
} from '../../../components';
import {appImages, appStyles, colors, routes, sizes} from '../../../services';
import {goBack} from '../../../navigation/rootNavigation';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setExpenseId} from '../../../services/redux/slice/expenseId';
import {FetchExpenses, FetchMoreExpenses} from '../../../Backend';

function TripExpenses(props) {
  const {id, place, country} = props.route.params;
  const {navigate} = props.navigation;
  const [ExpensesModal, setExpensesModal] = useState(false);
  const [Posts, setPosts] = useState(new Array());
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setloadingTwo] = useState(false);
  const [startAfter, setstartAfter] = useState(Object);
  const [lastDocument, setLastDocument] = useState(false);
  const dispatch = useDispatch();
  const {expenseId} = useSelector(state => state.expenseId);
  const isFocused = useIsFocused();
  const openAndDelete = x => {
    toggleExpensesModal();
    dispatch(setExpenseId(x));
  };
  const toggleExpensesModal = () => {
    setExpensesModal(!ExpensesModal);
  };

  // const fetchExpenses = async () => {
  //   try {
  //     setLoading(true);
  //     const dataArray = [];

  //     let querySnapshot = await firestore()
  //       .collection('Expenses')
  //       .where('tripsId', '==', id)
  //       .limit(6)
  //       .get();
  //     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  //     querySnapshot.forEach(doc => {
  //       dataArray.push({...doc.data(), id: doc.id});
  //     });
  //     //console.log(lastVisible);
  //     setExpenses(dataArray);
  //     setstartAfter(lastVisible);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Rana Sheraz Ali', error);
  //   }
  //   // finally {
  //   //   setLoading(false);
  //   // }
  // };

  // const fetchMoreExpenses = async () => {
  //   try {
  //     //    if (!lastDocument) {
  //     //  setLoading(true);
  //     const dataArray = [];

  //     let querySnapshot = await firestore()
  //       .collection('Expenses')
  //       .where('tripsId', '==', id)
  //       .startAfter(startAfter)
  //       .limit(2)
  //       .get();
  //     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  //     querySnapshot.forEach(doc => {
  //       dataArray.push({...doc.data(), id: doc.id});
  //     });
  //     //console.log(dataArray);
  //     setExpenses([...Expenses, ...dataArray]);
  //     // setstartAfter(lastVisible);
  //     dataArray.length === 0 ? setLastDocument(true) : setLastDocument(false);
  //     // }
  //   } catch (error) {
  //     console.error('Muhammad ABubakar', error);
  //   }
  //   // finally {
  //   //   setLoading(false);
  //   // }
  // };

  //Original
  // const fetchExpenses = () => {
  //   // Reference to the Firestore collection
  //   const collectionRef = firestore()
  //     .collection('Expenses')
  //     .where('tripsId', '==', id)
  //     .onSnapshot(snapshot => {
  //       const dataArray = [];
  //       snapshot.forEach((doc, index) => {
  //         // Add each document's data to the array
  //         // console.log(dataArray);
  //         dataArray.push({...doc.data(), id: doc.id});
  //       });
  //       setExpenses(dataArray);
  //     });
  // };

  useEffect(() => {
    if (isFocused) {
      getExpenses();
    }
  }, [isFocused]);

  async function getExpenses() {
    setLoading(true);
    const postsData = await FetchExpenses(id);
    setPosts(postsData.posts);
    setstartAfter(postsData.lastVisible);
    setLoading(false);
  }
  // async function getMoreExpenses() {
  //
  //   // try {
  //   setloadingTwo(true);
  //   const postsData = await FetchMoreExpenses(id, startAfter);
  //   setPosts([...Posts, ...postsData.posts]);
  //   setstartAfter(postsData.lastVisible);
  //   setloadingTwo(false);
  //   // } catch (error) {
  //   //   console.log('home', error);
  //   // }
  // }

  const handleDeleteExpense = async () => {
    try {
      // Delete the trip from the Trips collection
      await firestore().collection('Expenses').doc(expenseId).delete();
      // Update the Trips state by filtering out the deleted trip
      setPosts(Posts.filter(item => item.id !== expenseId));
      toggleExpensesModal();
      Toasts.Success('Expense Deleted Successfully');
    } catch (error) {
      console.error('Error deleting trip and expenses:', error);
    }
  };

  return (
    <>
      <Wrapper
        style={{
          backgroundColor: colors.appBgColor3,
        }}
        isMain>
        <Spacer isStatusBarHeigt />
        <StatusBars.Dark />
        <Wrapper paddingHorizontalBase flexDirectionRow alignItemsCenter>
          <Wrapper>
            <Icons.Back
              onPress={goBack}
              size={totalSize(4)}
              style={{backgroundColor: colors.white, borderRadius: 25}}
            />
          </Wrapper>
          <Wrapper style={{marginLeft: width(30)}}>
            <Text isMediumTitle alignTextCenter>
              {place}
            </Text>
            <Text isMedium isBoldFont alignTextCenter>
              {country}
            </Text>
          </Wrapper>
        </Wrapper>
        <Wrapper
          duration={2500}
          animation={'zoomIn'}
          marginVerticalZero
          isBorderedWrapper
          alignItemsCenter>
          <Image
            style={{width: width(80), height: height(35)}}
            resizeMode="contain"
            source={appImages.sevenpng}
          />
        </Wrapper>
        <Wrapper
          flexDirectionRow
          alignItemsCenter
          justifyContentSpaceBetween
          paddingHorizontalSmall>
          <Text isMediumTitle isBoldFont>
            Expenses
          </Text>
          <TouchableOpacity
            onPress={() => navigate(routes.addExpense, {id, place, country})}
            style={styles.logoutView}>
            <Text isMedium isBoldFont>
              Add Expenses
            </Text>
          </TouchableOpacity>
        </Wrapper>
        <Spacer isSmall />

        {loading ? (
          <MyLoader isVisible={loading} />
        ) : (
          <FlatList
            ListFooterComponent={() =>
              loadingTwo && <MyLoader isVisible={loadingTwo} />
            }
            // onEndReached={getMoreExpenses}
            onEndReachedThreshold={0.01}
            scrollEventThrottle={150}
            data={Posts}
            ListEmptyComponent={
              <EmptyList message={"You haven't recorded Expenses yet."} />
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item, key}) => {
              return (
                <ExpenseCard
                  key={key}
                  item={item}
                  onPress={() => openAndDelete(item.id)}
                />
              );
            }}
          />
        )}
      </Wrapper>

      {/* Modal */}
      <Modals.AlertModal
        tittleStyle={[
          appStyles.textLarge,
          appStyles.fontBold,
          {textAlign: 'center'},
        ]}
        isVisible={ExpensesModal}
        toggleModal={toggleExpensesModal}
        title="Do you want to delete Expense?"
        onPress={() => toggleExpensesModal()}
        onPress1={() => handleDeleteExpense()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  logoutView: {
    backgroundColor: colors.white,
    borderRadius: 30,
    ...appStyles.paddingHorizontalSmall,
    ...appStyles.paddingVerticalTiny,
  },
  back: {
    height: height(5), //height(5),
    width: width(5),
    backgroundColor: colors.white,
    borderRadius: totalSize(5 / 2),
  },
  headerContainer: {
    backgroundColor: colors.appBgColor3,
  },
});

export default TripExpenses;
