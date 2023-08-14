import React, { useState } from 'react';
import {appStyles, colors, sizes} from '../../services';
import {totalSize} from 'react-native-dimension';
import * as Buttons from '../buttons';
import Wrapper from '../wrapper';

export const Primary = ({
  data,
  onPress,
  disabled,
  containerStyle,
  buttonStyle,
  textStyle,
  keyName,
}) => {
  //below line
  const [selectedChip, setSelectedChip] = useState(null);
  return (
    <Wrapper flexDirectionRow style={[containerStyle]}>
      {data.map((item, index) => {
        //up
        const chipSelected = selectedChip === item.id;
        //down

        return (

          <Buttons.ColoredSmall
            key={item.id}
            disabled={!onPress || disabled}
            //iconName={onPress && 'close'}
            //iconType="ionicon"
            iconSize={totalSize(2)}
            iconColor={colors.appTextColor1}
            //onPress={() => onPress(item, index)}
            //up
            onPress={() => {
              if (chipSelected) {
                setSelectedChip(null);
              } else {
                setSelectedChip(item.id);
                if (onPress) {
                  onPress(item, index);
                }
              }
            }}
            //down
            direction="row-reverse"
            text={keyName ? item[keyName] : item}
            buttonStyle={[
              {
                paddingHorizontal: sizes.marginHorizontal / 6,
                marginRight: sizes.marginHorizontal / 4,
                marginBottom: sizes.marginVertical / 2,
                paddingVertical: sizes.TinyMargin,
                //backgroundColor: colors.appBgColor2,
                //up
                backgroundColor: chipSelected
                  ? colors.parrot
                  : colors.white,
                //down
                borderRadius: 100,
              },
              buttonStyle,
            ]}
            textStyle={[appStyles.textSmall, textStyle]}
          />
        );
      })}
    </Wrapper>
  );
};
