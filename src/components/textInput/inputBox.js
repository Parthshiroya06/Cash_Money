/* @flow weak */

import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

//third Party Package
import MaskInput from 'react-native-mask-input';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {localize} from '@languages';
import {Colors, CommonStyles} from '@resources';

const InputBox = props => {
  //conditional Component
  const CommonInput = props.mask ? MaskInput : TextInput;

  return (
    <View style={[styles.container, props.viewStyle]}>
      <Text style={CommonStyles.textStyle(props?.size || 3, 'black', 'Inter')}>
        {localize(props.inputType).title}
      </Text>

      <CommonInput
        style={styles.textInput}
        placeholder={localize(props.inputType).placeholder}
        placeholderTextColor={Colors.lightGrey}
        {...props}
      />

      <Text style={[CommonStyles.textStyle(1.8, 'red', 'Inter')]}>
        {props.isError ? localize(props.inputType).errorText : ''}
      </Text>
    </View>
  );
};

export {InputBox};

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(88),
    //  paddingTop: responsiveHeight(1),
  },
  textInput: {
    height: responsiveHeight(6),
    marginTop: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3),
    borderRadius: responsiveHeight(0.7),
    borderWidth: 1,
    paddingVertical: responsiveWidth(2),
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.offWhite,
    ...CommonStyles.textStyle(2.2, 'black', 'Inter'),
  },
});
