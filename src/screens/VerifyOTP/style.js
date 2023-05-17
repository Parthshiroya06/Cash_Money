import {StyleSheet} from 'react-native';
import {Colors, CommonStyles} from '@resources';

import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  wrapView: {alignItems: 'center', justifyContent: 'space-between'},
  imageButton: {
    backgroundColor: Colors.screenBackground,
  },
  inputTextMainView: {
    marginTop: responsiveHeight(12),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: responsiveWidth(85),
  },
  textInputView: {
    height: responsiveHeight(7.5),
    width: responsiveWidth(10),
    justifyContent: 'center',
    elevation: 4,
    backgroundColor: Colors.screenBackground,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  buttonStyle: {
    marginTop: responsiveHeight(10),
    backgroundColor: Colors.red,
    width: responsiveWidth(88),
  },
  commonTextStyle: color => {
    return {
      alignSelf: 'flex-start',
      marginLeft: responsiveWidth(7),
      marginTop: responsiveHeight(0.5),
      ...CommonStyles.textStyle(1.8, color, 'Inter200'),
    };
  },
});

export default styles;
