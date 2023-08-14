import React from 'react';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Spacer from './spacer';
import Wrapper from "./wrapper";
import Text from "./text";
import {appStyles, colors, sizes} from '../services';

export const MyLoader = ({isVisible}) => {
  return (
    <>
      {isVisible ? (
        // <Wrapper
        //   isAbsoluteFill
        //   animation="fadeIn"
        //   style={[
        //     {
        //       justifyContent: 'center',
        //       top: 0,
        //       right: 0,
        //       bottom: 0,
        //       left: 0,
        //       backgroundColor: colors.appBgColor1 + 'BF',
        //     },
        //   ]}>
        //   <Wrapper style={[appStyles.center, {backgroundColor: 'transparent'}]}>
            <UIActivityIndicator
              color={colors.appColor1}
              size={sizes.icons.xxl}
            />
          //   <Spacer isBasic />
          //   <Text isRegular>Loading</Text>
          // </Wrapper>
       // </Wrapper>
      ) : null}
    </>
  );
};
