/* @flow weak */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {localize} from '@languages';
import {CommonStyles} from '@resources';

const EmptyView = props => (
  <View style={[styles.container, props.style]}>
    <Text style={CommonStyles.textStyle(2.2, 'black', 'Inter200', 'center')}>
      {localize(props.empty_massage)}
    </Text>
  </View>
);

export {EmptyView};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: responsiveWidth(6),
  },
});
