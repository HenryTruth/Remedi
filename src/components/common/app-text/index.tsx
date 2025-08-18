import React from 'react';
import {Text, TextStyle} from 'react-native';
import {AppTextTypes} from './type';
import { fontFamilyWeightMap } from '../../../configs/ThemeSetup';
const AppText = ({
  text = 'text',
  color,
  styles,
  numberOfLines = 3,
  cap = false,
  allCaps = false,
  fontSize,
  fontWeight = fontFamilyWeightMap.Regular
}: AppTextTypes) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles,
        {
          textTransform: cap ? 'capitalize' : allCaps ? 'uppercase' : 'none',
          color,
          fontSize,
          fontWeight: fontWeight as TextStyle['fontWeight'],
        },
      ]}>
      {text}
    </Text>
  );
};

export default AppText;