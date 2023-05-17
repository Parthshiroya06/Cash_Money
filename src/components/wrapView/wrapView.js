/* @flow weak */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRoute} from '@react-navigation/native';

import {localize} from '@languages';
import {Colors, CommonStyles} from '@resources';

const WrapView = props => {
  const route = useRoute();

  return (
    <KeyboardAwareScrollView
      bounces={false}
      contentContainerStyle={props.contentContainerStyle}
      style={[styles.container, props.style]}
      stickyFooter={props.stickyFooter}
      {...props}>
      {props.isTitle && (
        <Text style={CommonStyles.textStyle(4, 'black', 'Inter400', 'center')}>
          {localize(route.params ? route.params?.name : route.name)}
        </Text>
      )}
      {props.children}
    </KeyboardAwareScrollView>
  );
};

export default WrapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
});
