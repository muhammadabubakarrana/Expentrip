import {Image} from 'react-native';
import React from 'react';
import Wrapper from './wrapper';
import Text from './text';
import {appImages, appStyles, colors} from '../services';
import {width, height} from 'react-native-dimension';

export default EmptyList = ({message}) => {
  return (
    <Wrapper
      paddingVerticalSmall
      marginVerticalLarge
      style={appStyles.shadow}
      isCardView
      alignItemsCenter
      justifyContentCenter>
      <Image
        resizeMode="contain"
        source={appImages.empty}
        style={{width: width(60), height: height(25)}}
      />
      <Text style={{color: 'red'}} alignTextCenter isBoldFont isLarge>
        {message || 'data not found'}
      </Text>
    </Wrapper>
  );
};
