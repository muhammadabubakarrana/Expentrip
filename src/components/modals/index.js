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
import {colors, sizes, appStyles, appImages} from '../../services';
import {Buttons, Spacer, Wrapper, Text, Images} from '../../components';
import Modal from 'react-native-modal';
import {styles} from './styles';
import * as Lines from '../lines';

export const Swipable = ({
  children,
  title,
  isVisible,
  toggleModal,
  footerFlex,
  headerFlex,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={toggleModal}
      style={{margin: 0}}
      // backdropOpacity={0}
      onBackdropPress={toggleModal}>
      <Wrapper flex={1}>
        <Wrapper flex={headerFlex ? headerFlex : 1.5} />
        <Wrapper
          flex={footerFlex ? footerFlex : 8.5}
          style={[styles.swipableModalFooter]}>
          {children}
          <Wrapper style={[styles.barContainer]}>
            <Wrapper style={[appStyles.center]}>
              <TouchableOpacity onPress={toggleModal}>
                <Lines.Horizontal
                  height={4}
                  width={width(15)}
                  style={{borderRadius: 5}}
                  color={colors.appBgColor3}
                />
              </TouchableOpacity>
              <Spacer isBasic />
              <Text isTinyTitle>{title}</Text>
            </Wrapper>
          </Wrapper>
          <Wrapper
            isAbsolute
            style={[
              {top: sizes.baseMargin * 1.5, left: sizes.marginHorizontal},
            ]}>
            <Icon name="close" />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Modal>
  );
};

export const AlertModal = ({
  onPress,
  onPress1,
  title,
  isVisible,
  toggleModal,
  tittleStyle,
  t1,
  dontShake,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="up"
      onSwipeComplete={toggleModal}
      onBackdropPress={toggleModal}>
      <Wrapper
        animation={dontShake ? null : 'shake'}
        duration={3000}
        style={styles.modal}
        justifyContentCenter
        alignItemsCenter>
        <Text style={{color: 'red'}} isBoldFont isSmallTitle>
          Alert!
        </Text>
        <Spacer isTiny />
        <Text style={tittleStyle} isRegular>
          {title}
        </Text>
        <Spacer isBasic />
        <Wrapper flexDirectionRow>
          <Buttons.ColoredSmall
            textStyle={{...appStyles.ButtonMedium, color: 'white'}}
            onPress={onPress}
            text={'Cancel'}
          />

          <Buttons.ColoredSmall
            onPress={onPress1}
            textStyle={{...appStyles.ButtonMedium, color: 'white'}}
            buttonStyle={{backgroundColor: 'red', marginLeft: width(5)}}
            text={t1 ? t1 : 'Delete'}
          />
        </Wrapper>
      </Wrapper>
    </Modal>
  );
};

export const Loader = ({
  isVisible,
  //toggleModal,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="up"
      // onSwipeComplete={toggleModal}
      // onBackdropPress={toggleModal}
    >
      <Wrapper
        style={{
          width: '20%',
          backgroundColor: colors.white,
          alignSelf: 'center',
          borderRadius: width(5),
          paddingVertical: height(2),
          paddingHorizontal: height(2),
        }}
        justifyContentCenter
        alignItemsCenter>
        <ActivityIndicator size={totalSize(5)} />
      </Wrapper>
    </Modal>
  );
};

export const Done = ({
  isVisible,
  //toggleModal,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="up"
      // onSwipeComplete={toggleModal}
      // onBackdropPress={toggleModal}
    >
      <Wrapper
        style={{
          width: 'auto',
          backgroundColor: colors.white,
          alignSelf: 'center',
          borderRadius: width(5),
          paddingVertical: height(2),
          paddingHorizontal: height(2),
        }}
        justifyContentCenter
        alignItemsCenter>
        <Images.Round source={appImages.checkmark} />
        <Text isTinyTitle>Done!</Text>
      </Wrapper>
    </Modal>
  );
};
