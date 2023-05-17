/* @flow weak */

import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {Colors, CommonStyles} from '@resources';

const TextComponent = props => {
  return (
    <View style={styles.textComponent}>
      <Text style={[props.style]}>{props.details}</Text>
    </View>
  );
};
const TransactionDetails = props => {
  return (
    <Pressable style={styles.container(props)} onPress={props.onPress}>
      <View style={styles.rowContainer}>
        <TextComponent
          style={CommonStyles.textStyle(2.1, 'black', 'Inter400')}
          details={props.name}
        />
        <TextComponent
          style={CommonStyles.textStyle(2, 'blackTransparency', 'Inter200')}
          details={props.number}
        />
      </View>

      <TextComponent
        style={styles.textAmountStyle(Number(props.amount) > 0)}
        details={`${Number(props.amount) > 0 ? '' : '-'}₹${Number(
          props.amount.toString().replace('-', ' '),
        )}`}
      />
    </Pressable>
  );
};

export {TransactionDetails};

const styles = StyleSheet.create({
  textComponent: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: responsiveWidth(2),
  },
  textAmountStyle: props => {
    return {
      //    marginTop: responsiveHeight(0.5),
      ...CommonStyles.textStyle(
        2.1,
        props === true ? 'green' : 'red',
        'Inter400',
      ),
    };
  },

  container: props => {
    return {
      width: responsiveWidth(100),
      height: responsiveHeight(7),
      backgroundColor: Colors.screenBackground,
      justifyContent: 'space-between',
      flexDirection: 'row',
    };
  },
  rowContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});
