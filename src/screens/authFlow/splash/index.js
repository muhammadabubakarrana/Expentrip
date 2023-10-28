import React, {Component} from 'react';
import {Wrapper, Text} from '../../../components';
import {appStyles, colors} from '../../../services';

function Splash() {
  return (
    <Wrapper isGradient>
      <Wrapper animation={'bounceInDown'} duration={5000} isCenter flex={1}>
        <Text alignTextCenter isXXLTitle style={{color: colors.ricePaper}}>
          Mr.ABUBAKAR'S{`\n`}Portfolio App
        </Text>
      </Wrapper>
    </Wrapper>
  );
}

export default Splash;
