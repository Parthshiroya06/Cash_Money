import {StyleSheet} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {Colors, CommonStyles} from '@resources';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  scrollContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(35),
  },
  flagStyle: {
    width: responsiveWidth(12),
    height: responsiveHeight(4),
  },
  buttonStyle: {
    marginTop: responsiveHeight(1),
    backgroundColor: Colors.red,
    width: responsiveWidth(88),
  },

  textContainer: {
    width: responsiveWidth(72),
    marginTop: responsiveHeight(0.2),
    borderWidth: 1,
    maxLength: 13,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.offWhite,
    paddingHorizontal: responsiveWidth(3),
    borderRadius: responsiveHeight(0.7),
    height: responsiveHeight(6),
    ...CommonStyles.textStyle(2, 'black', 'Inter200'),
  },
  inputView: {
    borderColor: Colors.black,
    width: responsiveWidth(88),
    paddingTop: responsiveHeight(1),
    marginVertical: responsiveHeight(1),
  },
  common_textStyle: (size = 2, color) => {
    return {
      marginLeft: responsiveWidth(15),
      ...CommonStyles.textStyle(size, color, 'Inter200'),
    };
  },
});

export default styles;
