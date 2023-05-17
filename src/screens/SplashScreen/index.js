import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {CommonActions} from '@react-navigation/native';

import {localize} from '@languages';
import {CommonStyles} from '@resources';
import {FirebaseAuth} from '@services';

import styles from './style';

const SplashScreen = props => {
  const {navigation} = props;

  useEffect(() => {
    setTimeout(() => {
      FirebaseAuth.authVarification(auth => {
        let screen_name = 'MobileLogin';

        if (auth) {
          screen_name = 'HomeScreen';
        }

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: screen_name}],
          }),
        );
      });
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={CommonStyles.textStyle(4, 'black', 'Inter400', 'center')}>
        {localize('project_name')}
      </Text>
    </View>
  );
};

export default SplashScreen;
