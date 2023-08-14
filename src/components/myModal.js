import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ViewPropTypes,
  FlatList,
} from 'react-native';
import {Icon} from '@rneui/base';
import {height, totalSize, width} from 'react-native-dimension';
//import {colors, sizes, appStyles} from '../../services';
import Modal from 'react-native-modal';
// import {styles} from './styles';
import * as Lines from './lines';
//import * as Spacer from './spacer';
import Text from './text';
// import * as Lines from '../lines';
import Wrapper from './wrapper';
import {colors, sizes, appStyles} from '../services';
import Spacer from './spacer';
// import Text from '../text';
// import * as  Spacer from '../spacer';

export const MyModal = ({
  children,
  title,
  isVisible,
  toggleModal,
  tittleStyle,
  footerFlex,
  headerFlex,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="up"
      onSwipeComplete={toggleModal}
      onBackdropPress={toggleModal}>
      <Wrapper animation={"shake"} duration={3000} style={styles.modal} justifyContentCenter alignItemsCenter >
      <Text style={tittleStyle} isRegular>{title}</Text>
      <Spacer isBasic />
      {children}
      </Wrapper>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    borderRadius: 32,
    paddingVertical: 20,
    paddingHorizontal: 20,
   // width: "80%",
   // height: "50%",
    shadowColor: "black",
    shadowOffset: {
        width: 0,
        height: 0
    },
    shadowRadius: 6,
    elevation: 5,
    shadowOpacity: 1,
    height: 'auto',
},
  professionsCard: {
    //borderColor:colors.appBgColor3,
    marginBottom: sizes.marginBottom,
  },
  selectedProfessionsCard: {
    // borderColor:colors.appTextColor1,
    backgroundColor: colors.appBgColor2,
    marginBottom: sizes.marginBottom,
  },

  ////SwipableModal
  swipableModalFooter: {
    backgroundColor: colors.appBgColor1,
    borderTopLeftRadius: sizes.cardRadius,
    borderTopRightRadius: sizes.cardRadius,
    paddingTop: sizes.baseMargin,
    ...appStyles.shadowDark,
  },
  barContainer: {
    top: sizes.TinyMargin,
    alignSelf: 'center',
  },
  //EnterValueModalPrimaryCard
  enterValueModalPrimaryCard: {
    backgroundColor: colors.appBgColor1,
    borderRadius: sizes.modalRadius,
    padding: sizes.baseMargin,
    marginHorizontal: sizes.marginHorizontal * 2,
    ...appStyles.shadow,
  },
});
