import React, { useEffect, useState } from 'react';
import {
  Platform,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {width, height, totalSize} from 'react-native-dimension';
import {
  Wrapper,
  Text,
  Headers,
  EmptyList,
  ExpenseCard,
  Spacer,
  Icons,
} from '../../../components';
import {appImages, appStyles, colors, routes, sizes} from '../../../services';
import {goBack} from '../../../navigation/rootNavigation';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

const items = [
  {id: 1, title: 'Gujrat', amount: '$10', category: 'Food'},
  {id: 2, title: 'Mecca', amount: '$520', category: 'Shopping'},
  {id: 3, title: 'Kabul', amount: '$60', category: 'Entertainment'},
  {id: 4, title: 'haram', amount: '$7026', category: 'other'},
  {id: 5, title: 'haram', amount: '$7026', category: 'Commute'},
  {id: 6, title: 'haram', amount: '$7026', category: 'other'},
  {id: 7, title: 'haram', amount: '$7026', category: 'Commute'},
];

function TripExpenses(props) {
  const {id, place, country} = props.route.params;
  const {navigate} = props.navigation;

  const [Expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused();
  const fetchExpenses = () => {
    // Reference to the Firestore collection
    const collectionRef = firestore().collection('Expenses');

    // Query with a condition (e.g., where field equals a certain value)
    const query = collectionRef.where('tripsId', '==',id);

    // Subscribe to the query snapshot
    const unsubscribe = query.onSnapshot(snapshot => {
      const dataArray = [];
      snapshot.forEach((doc, index) => {
        // Add each document's data to the array
        console.log(dataArray);
        dataArray.push({...doc.data(), id: doc.id});
      });
      setExpenses(dataArray);
    });

    // Clean up the subscription when the component unmounts
    //  return () => unsubscribe();
  };

  useEffect(() => {
    if (isFocused) {fetchExpenses()};
  }, [isFocused]);

  return (
    <>
      <Wrapper
        style={{
          backgroundColor: colors.appBgColor3,
        }}
        isMain>
        <Wrapper
          paddingHorizontalBase
          style={{paddingTop: sizes.baseMargin}}
          flexDirectionRow
          alignItemsCenter>
          <Wrapper>
            <Icons.Back
              onPress={goBack}
              size={totalSize(4)}
              style={{backgroundColor: colors.white, borderRadius: 25}}
            />
          </Wrapper>
          <Wrapper style={{marginLeft: width(25)}}>
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
          //isCardView
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
          <TouchableOpacity onPress={()=>  navigate(routes.addExpense, {id, place, country})} style={styles.logoutView}>
            <Text isMedium isBoldFont>
              Add Expenses
            </Text>
          </TouchableOpacity>
        </Wrapper>
        <Spacer isSmall />
        <FlatList
          data={Expenses}
          ListEmptyComponent={
            <EmptyList message={"You haven't recorded Expenses yet."} />
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <ExpenseCard item={item} />;
          }}
        />
      </Wrapper>
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