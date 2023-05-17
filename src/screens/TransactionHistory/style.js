import {StyleSheet} from 'react-native';

import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {Colors, CommonStyles} from '@resources';

const styles = StyleSheet.create({
  containerFlatlist: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.screenBackground,
  },
  itemSepratorStyle: {
    height: responsiveHeight(0.2),
    backgroundColor: Colors.lightGrey,
  },
  flotButton: {
    position: 'absolute',
    right: responsiveWidth(2),
    bottom: responsiveHeight(2),
  },
  flotImage: {
    resizeMode: 'contain',
    marginLeft: responsiveWidth(2),
    ...CommonStyles.squareLayout(7.5),
  },
});

export default styles;
