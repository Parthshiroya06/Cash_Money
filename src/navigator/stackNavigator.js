/* @flow weak */

import React from 'react';
import {Image, Platform, Pressable, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {responsiveWidth} from 'react-native-responsive-dimensions';

import {images} from '@assets';
import {localize} from '@languages';

import {Colors, CommonStyles} from '@resources';
//import from screens
import * as Screen from '@screens';

const Stack = createStackNavigator();

const StackNavigator = props => {
  const commonHeader = ({navigation, route}) => {
    return {
      headerShown: true,
      headerTitleAlign: 'center',
      headerBackVisible: false,
      animation: 'simple_push',
      headerTitle: route.params ? route.params?.name : localize(route.name),
      headerTitleStyle: {...CommonStyles.textStyle(3, 'blue', 'Inter400')},
      headerStyle: {
        backgroundColor: Colors.screenBackground,
      },
      headerLeft: () => {
        return (
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={images.back_arrow}
              style={[styles.headerLeftStyle]}
            />
          </Pressable>
        );
      },
    };
  };
  //initialParams
  const _addScreen = (name, extraprops = {}) => {
    return (
      <Stack.Screen name={name} component={Screen[name]} {...extraprops} />
    );
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gesturesEnabled: false,
          animationEnabled: Platform.OS === 'ios' ? false : undefined,
        }}
        initialRouteName={'SplashScreen'}>
        {_addScreen('SplashScreen')}
        {_addScreen('MobileLogin')}

        <Stack.Group screenOptions={commonHeader}>
          {_addScreen('VerifyOTP')}
          {_addScreen('HomeScreen')}
          {_addScreen('CreateEditAccount')}
          {_addScreen('TransactionHistory')}
          {_addScreen('AddTransaction')}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  headerLeftStyle: {
    resizeMode: 'contain',
    marginLeft: responsiveWidth(2),
    ...CommonStyles.squareLayout(2.5),
  },
});
