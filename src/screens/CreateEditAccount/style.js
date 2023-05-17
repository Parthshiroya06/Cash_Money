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

  renderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(100),
    height: responsiveHeight(8.5),
  },
  contactsMainView: (mTop = 0) => {
    return {
      marginTop: responsiveHeight(mTop),
      height: responsiveHeight(12),
    };
  },

  contactListStyle: {
    justifyContent: 'space-around',
    width: responsiveWidth(80),
    height: responsiveHeight(7.5),
  },
  shortNameStyle: (width, color) => {
    return {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      backgroundColor: Colors[color],
      marginHorizontal: responsiveWidth(2),
      width: responsiveWidth(width),
      height: responsiveHeight(7),
      borderRadius: responsiveHeight(7) / 2,
    };
  },
  headerTextStyle: {
    marginLeft: responsiveWidth(2),
    ...CommonStyles.textStyle(2.5, 'black', 'Inter400'),
  },

  modelStyle: {
    borderTopRightRadius: responsiveHeight(2),
    borderTopLeftRadius: responsiveHeight(2),
    shadowColor: Colors.black,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 15,
  },
  stickyHeader: {
    width: responsiveWidth(100),
    alignItems: 'center',
  },

  containerStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  contactsStyle: {
    borderWidth: 1,
    flexDirection: 'row',
    marginVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(3),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: responsiveHeight(0.7),

    backgroundColor: Colors.offWhite,
    borderColor: Colors.lightGrey,
    height: responsiveHeight(6.5),
    width: responsiveWidth(88),
  },

  buttonStyle: {
    marginTop: responsiveHeight(39),
    backgroundColor: Colors.red,
    width: responsiveWidth(88),
  },
  itemSepratorStyle: {
    height: responsiveHeight(0.2),
    backgroundColor: Colors.lightGrey,
  },
  sheetTextStyle: width => {
    return {
      width: responsiveWidth(width),
      height: responsiveHeight(6),
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginLeft: responsiveWidth(2),
      borderRadius: responsiveHeight(0.7),
      paddingVertical: responsiveWidth(2),
      borderColor: Colors.lightGrey,
      ...CommonStyles.textStyle(2.2, 'black', 'Inter', 'left'),
    };
  },
  modelSheetView: {
    borderWidth: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(6),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.offWhite,
  },

  IconStyle: (color = 'black') => {
    return {
      tintColor: Colors[color],
      resizeMode: 'contain',
      ...CommonStyles.squareLayout(4.5),
    };
  },
  emptyView: {
    height: responsiveHeight(30),
    justifyContent: 'center',
  },
});

export default styles;
