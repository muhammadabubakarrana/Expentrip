import React from 'react';
import {} from 'react-native';
import Wrapper from './wrapper';
import Text from './text';
import {categoryBg} from '../services';

export default function ExpenseCard({item}) {
  return (
    <Wrapper
      style={{backgroundColor: categoryBg[item.Category]}}
      alignItemsCenter
      paddingVerticalSmall
      paddingHorizontalMedium
      flexDirectionRow
      justifyContentSpaceBetween
      isCardView
      marginVerticalTiny>
      <Wrapper>
        <Text isTinyTitle>{item.Title}</Text>
        <Text isMedium>{item.Category}</Text>
      </Wrapper>
      <Wrapper>
        <Text isLarge isBoldFont>{item.Amount}</Text>
      </Wrapper>
    </Wrapper>
  );
}
