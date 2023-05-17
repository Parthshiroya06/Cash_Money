import React, {useEffect, useRef} from 'react';
import {Alert, View, Image, FlatList, Pressable} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useDispatch, useSelector} from 'react-redux';

import {saveUserData} from '@actions';
import {images} from '@assets';
import {TransactionDetails, EmptyView} from '@components';
import {localize} from '@languages';
import {FirebaseAuth, Firestore} from '@services';

import styles from './style';

const HomeScreen = props => {
  const {navigation} = props;
  const {userData} = useSelector(state => state.userData);

  console.log('userData >>>>>>', userData.user?.uid);
  let swiperRef = useRef([]);
  let select_swiper;

  const dammy_array = [
    100, 152, 2125, -5465, 152, 7852, -24, 142, 488, -899, -9, -15, 75, 795,
    1458, -78,
  ];

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {},
      headerRight: () => {
        return (
          <Pressable onPress={() => removeAlert()}>
            <Image
              source={images.logout_icon}
              style={styles.imageStyle('black', 4)}
            />
          </Pressable>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (select_swiper) {
        select_swiper.close();
      }
    });
    return unsubscribe;
  }, [navigation, select_swiper]);

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = () => {
    Firestore.collections('users').then(docs => {
      docs
        .doc(`${userData.user.uid}`)
        .collection('connections')
        .get()
        .then(querySnapshot => console.log('User exists: ', querySnapshot));
    });
  };
  const removeAlert = () => {
    Alert.alert(localize('logout'), localize('logout_message'), [
      {
        text: localize('cancel'),
      },
      {
        text: localize('logout'),
        onPress: () => FirebaseAuth.signout(),
      },
    ]);
  };

  const moveHistoryScreen = () => {
    return navigation.navigate('TransactionHistory', {name: 'Account Name'});
  };

  const _renderRightAction = () => {
    return (
      <View style={styles.swipeContiner}>
        <Pressable
          style={[styles.swipeImageButtonStyle]}
          onPress={() => {
            alert('work on progress');
          }}>
          <Image source={images.delete_icon} style={styles.imageStyle('red')} />
        </Pressable>
        <Pressable
          style={[styles.swipeImageButtonStyle]}
          onPress={() => {
            navigation.navigate('CreateEditAccount', {name: 'edit_title'});
          }}>
          <Image source={images.edit_icon} style={styles.imageStyle('green')} />
        </Pressable>
      </View>
    );
  };

  const _renderView = ({item, index}) => {
    return (
      <Swipeable
        key={index}
        overshootRight={false}
        ref={refs => (swiperRef.current[index] = refs)}
        onSwipeableRightWillOpen={() => {
          if (select_swiper) {
            if (select_swiper !== swiperRef.current[index]) {
              select_swiper.close();
            }
          }
          select_swiper = swiperRef.current[index];
        }}
        onSwipeableRightOpen={() => (select_swiper = swiperRef.current[index])}
        renderRightActions={_renderRightAction}>
        <TransactionDetails
          onPress={() => moveHistoryScreen()}
          key={index}
          index={index}
          name={'Parth Shiroya'}
          number={9904290449}
          amount={item}
        />
      </Swipeable>
    );
  };

  return (
    <>
      <FlatList
        style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={dammy_array}
        renderItem={_renderView}
        keyExtractor={(item, index) => `account_${index}`}
        removeClippedSubviews={true}
        contentContainerStyle={styles.containerStyle}
        ItemSeparatorComponent={() => <View style={styles.itemSepratorStyle} />}
        ListEmptyComponent={() => <EmptyView empty_massage={'empty_view'} />}
      />

      <Pressable
        style={styles.flotButton}
        onPress={() => {
          navigation.navigate('CreateEditAccount', {name: 'create_title'});
        }}>
        <Image
          source={images.add_icon}
          style={styles.imageStyle('white', 0, 7.5)}
        />
      </Pressable>
    </>
  );
};

export default HomeScreen;
