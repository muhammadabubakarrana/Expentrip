import React from 'react';
import {TouchableOpacity} from 'react-native';
import Wrapper from './wrapper';
import Text from './text';
import {categoryBg} from '../services';
import {Icon} from '@rneui/base';
import {totalSize} from 'react-native-dimension';

export default function ExpenseCard({item, onPress, key}) {
  return (
    <Wrapper
      key={key}
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
        <TouchableOpacity onPress={onPress}>
          <Icon
            type={'material-community'}
            name="trash-can-outline"
            size={totalSize(3.5)}
          />
        </TouchableOpacity>
      </Wrapper>
      <Wrapper>
        <Text isLarge isBoldFont>
          {item.Amount}
        </Text>
      </Wrapper>
    </Wrapper>
  );
}
