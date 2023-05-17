import {StyleSheet} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {Colors, CommonStyles} from '@resources';
const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.screenBackground,
  },
  itemSepratorStyle: {
    height: responsiveHeight(0.2),
    backgroundColor: Colors.lightGrey,
  },

  imageStyle: (color, right = 0, size = 3) => {
    return {
      tintColor: Colors[color],
      marginRight: responsiveWidth(right),
      resizeMode: 'contain',
      ...CommonStyles.squareLayout(size),
    };
  },

  flotButton: {
    position: 'absolute',
    right: responsiveWidth(2),
    bottom: responsiveHeight(2),
  },

  swipeImageButtonStyle: {
    alignItems: 'center',
    width: responsiveWidth(12),
    justifyContent: 'center',
  },

  swipeContiner: {
    backgroundColor: Colors.lightGrey,
    flexDirection: 'row-reverse',
    paddingHorizontal: responsiveWidth(1.5),
    borderRadius: responsiveHeight(3),
    marginVertical: responsiveHeight(1),
    marginHorizontal: responsiveWidth(2),
  },
});

export default styles;
