import {StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '../../../components/wrapper';
import {
  Buttons,
  Chips,
  Headers,
  ScrollViews,
  TextInputs,
  Toasts,
  Text,
  Spacer,
  ShowToast,
  MyLoader,
} from '../../../components';
import {appImages, appStyles, categories, colors} from '../../../services';
import {width, height, totalSize} from 'react-native-dimension';
import firestore from '@react-native-firebase/firestore';
import {goBack} from '../../../navigation/rootNavigation';

function AddExpense(props) {
  const {id} = props.route.params;
  // const {id} = props.route.paramas;
  const [Title, setTitle] = useState('');
  const [Amount, setAmount] = useState('');
  const [Category, setCategory] = useState('');
  const [Loading, setLoading] = useState(false);
  // const {navigate} = props.navigation;

  const handleAddExpense = async () => {
    if (Title && Amount && Category) {
      setLoading(true);
      const res = await firestore().collection('Expenses').doc().set({
        Title,
        Amount,
        Category,
        tripsId: id,
      });
      setLoading(false);
      goBack();
      // navigate(routes.home);
      Toasts.Success('Expense ADDED');
    } else {
      Toasts.Error('Please fill all boxes');
    }
  };
  //up
  const data = [
    {id: 0, name: 'Food'},
    {id: 1, name: 'Shopping'},
    {id: 2, name: 'Entertainment'},
    {id: 3, name: 'Commute'},
    {id: 4, name: 'other'},
  ];

  const handleChipPress = (selectedItem, index) => {
    // console.log('Selected item:', selectedItem.name);
    setCategory(selectedItem.name);
  };

  // const check = () => {
  //   console.log('abu id', id);
  //   //setCategory(selectedItem);
  // };
  // //down

  return (
    <>
      <Headers.Primary
        auth
        containerStyle={styles.headerContainer}
        leftContainerStyle={styles.back}
        showBackArrow
        title={'Add Expense'}
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
            <Text isSmallTitle>For What?</Text>
            <Spacer isSmall />
            <TextInputs.Bordered
              value={Title}
              onChangeText={value => setTitle(value)}
              containerStyle={styles.input}
            />
            <Spacer isBasic />
            <Text isSmallTitle>How Much?</Text>
            <Spacer isSmall />
            <TextInputs.Bordered
              keyboardType={'numeric'}
              value={Amount}
              onChangeText={value => setAmount(value)}
              containerStyle={styles.input}
            />
            <Spacer isTiny />
            <Text isSmallTitle>Category?</Text>
            <Spacer isSmall />
            <Wrapper>
              {/* up */}
              <Chips.Primary
                containerStyle={styles.chipContainer}
                data={data}
                onPress={handleChipPress}
                keyName={'name'}
                textStyle={[appStyles.textMedium, appStyles.fontMedium]}
              />
              {/* down */}

              {/* <Chips.Primary
                onPress={value => setColor(value.label)}
                containerStyle={styles.chipContainer}
                buttonStyle={[
                  appStyles.backgroundColorWhite,
                  appStyles.paddingHorizontalTiny,
                ]}
                textStyle={appStyles.textMedium}
                data={categories}
                keyName={'label'}
              /> */}
            </Wrapper>
          </Wrapper>
          <Spacer isDoubleBase />
          <Spacer isDoubleBase />
          <Wrapper style={[{...styles.bottom}, appStyles.marginVerticalBase]}>
            {Loading ? (
              <MyLoader isVisible={Loading} />
            ) : (
              <Buttons.Colored
                onPress={handleAddExpense}
                buttonStyle={styles.btn}
                text={'Add Expense'}
              />
            )}
          </Wrapper>
        </ScrollViews.KeyboardAvoiding>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  back: {
    height: height(5),
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
  btn: {
    backgroundColor: colors.green,
  },
  chipContainer: {
    flexWrap: 'wrap',
  },
});

export default AddExpense;
