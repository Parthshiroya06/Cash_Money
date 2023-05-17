import {StyleSheet} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {FontFamily} from './fonts';
import {Colors} from './colors';

export const CommonStyles = StyleSheet.create({
  textStyle: (size = 10, color = 'black', fonts = 'Inter', textAlign) => ({
    color: Colors[color],
    fontFamily: FontFamily[fonts],
    fontSize: responsiveFontSize(size),
    textAlign: textAlign,
  }),

  squareLayout: (size, fromWidth = false) => ({
    height: fromWidth ? responsiveWidth(size) : responsiveHeight(size),
    aspectRatio: 1,
  }),
});
