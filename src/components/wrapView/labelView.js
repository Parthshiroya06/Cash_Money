import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {localize} from '@languages';
import {CommonStyles} from '@resources';

const TextComponent = textprops => {
  return (
    <Text
      includeFontPadding={false}
      style={styles.commonTextStyle(textprops.size, textprops.color)}>
      {textprops.massage}
    </Text>
  );
};
const LabelView = props => {
  return (
    <View style={[styles.container, props.viewStyle]}>
      <TextComponent size={1.8} massage={localize(props.inputType).title} />
      {props.children}
      {props.isError && (
        <TextComponent
          color={'red'}
          size={1.8}
          massage={localize(props.inputType).errorText}
        />
      )}
    </View>
  );
};

export {LabelView};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  commonTextStyle: (size = 2, color) => {
    return {
      padding: 0,
      lineHeight: responsiveHeight(2),
      marginLeft: responsiveWidth(1),
      ...CommonStyles.textStyle(size, color, 'Inter200'),
    };
  },
});
