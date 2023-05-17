/* @flow weak */

import React, {useCallback, useMemo, useRef} from 'react';
import {View, StatusBar, Text, SafeAreaView, StyleSheet} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@store';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors} from '@resources';
import {StackNavigator} from '@navigator';

const App = props => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            animated={true}
            translucent
            barStyle={'dark-content'}
            backgroundColor={Colors.screenBackground}
          />
          <GestureHandlerRootView style={styles.container}>
            <BottomSheetModalProvider>
              <StackNavigator />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
});
