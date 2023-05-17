/* @flow weak */

import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {CommonStyles} from '@resources';

import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {localize} from '@languages';

const CustomButton = ({onPress, buttonText, buttonStyle}) => (
  <Pressable style={[styles.button, buttonStyle]} onPress={onPress}>
    <Text style={CommonStyles.textStyle(2.5, 'black', 'Inter200', 'center')}>
      {localize(buttonText)}
    </Text>
  </Pressable>
);

export {CustomButton};

const styles = StyleSheet.create({
  button: {
    height: responsiveHeight(6),
    borderRadius: responsiveHeight(1),
    minWidth: responsiveWidth(48),
    //  marginBottom: responsiveHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
