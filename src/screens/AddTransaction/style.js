import {StyleSheet} from 'react-native';

import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {Colors, CommonStyles} from '@resources';

const styles = StyleSheet.create({
  wrapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioButtonView: {
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
    width: responsiveWidth(88),
    height: responsiveHeight(12),
  },

  dateAmountWrapStyle: {
    alignSelf: 'center',
    width: responsiveWidth(88),
    height: responsiveHeight(12),
    marginTop: responsiveHeight(1),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dateContainer: margin => {
    return {
      justifyContent: 'center',
      height: responsiveHeight(6),
      width: responsiveWidth(42),
      borderWidth: 1,
      borderRadius: responsiveWidth(1.5),
      paddingLeft: responsiveWidth(margin),
      marginVertical: responsiveHeight(0.2),
      borderColor: Colors.lightGrey,
      backgroundColor: Colors.offWhite,
    };
  },
  commonTextStyle: (size = 2, color) => {
    return {
      ...CommonStyles.textStyle(size, color, 'Inter200'),
    };
  },
  maskInput: {
    width: responsiveWidth(42),
    height: responsiveHeight(6),
    padding: responsiveWidth(2),
    borderRadius: responsiveHeight(0.7),
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.offWhite,
    ...CommonStyles.textStyle(2.2, 'black', 'Inter'),
  },
  buttonStyle: {
    backgroundColor: Colors.red,
    marginTop: responsiveHeight(36),
    width: responsiveWidth(88),
  },
});

export default styles;
