import React, {useEffect, useState, useMemo, useRef, useCallback} from 'react';
import {View, Image, Platform, Text, Pressable} from 'react-native';

//third Party Package
import {useStateWithCallbackLazy} from 'use-state-with-callback';
import Contacts from 'react-native-contacts';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';

import {saveUserData} from '@actions';
import {colors_array, redTypes} from '@constants';
import {images} from '@assets';
import {
  CustomButton,
  LabelView,
  WrapView,
  InputBox,
  EmptyView,
} from '@components';
import {localize} from '@languages';
import {attributes, CommonStyles} from '@resources';
import {Firestore, Permission} from '@services';
import {isEmpty, checkLength} from '@utils';

import styles from './style';

const common_obj = {
  value: '',
  isError: false,
};

const main_stateObj = {
  name: '',
  number: common_obj,
  balance: common_obj,
};

const CreateEditAccount = props => {
  const {navigation, route} = props;

  const {dismissAll} = useBottomSheetModal();
  const {userData} = useSelector(state => state.userData);

  console.log('userData >>>>>>', userData.user?.uid);
  const check_platform = Platform.OS === 'ios';

  const [input, setInputs] = useStateWithCallbackLazy(main_stateObj);
  const [contacts, setContacts] = useStateWithCallbackLazy([]);
  const [isFocus, setFocus] = useState(true);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: localize(route.params?.name),
    });
    contactAll();
  }, [navigation, contactAll, route]);

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['100%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const checkValidation = item => {
    return new Promise((resolve, reject) => {
      const state_object = {...input};
      switch (item) {
        case 1:
          if (!checkLength(input.balance)) {
            state_object.balance = {
              ...state_object.balance,
              isError: true,
            };
          }
        case 0:
          if (!isEmpty(input.number.value)) {
            state_object.number = {
              ...state_object.number,
              isError: true,
            };
          }

        default:
          setInputs(state_object, () => resolve(state_object));
          break;
      }
    });
  };

  const onSubmit = () => {
    checkValidation(1).then(state => {
      const {number, balance} = state;
      console.log(number);
      if (!number.isError && !balance.isError) {
        // Firestore.collections('users').then(docs => {
        //   docs
        //     .doc(`${userData.user.uid}`)
        //     .collection('connections')
        //     .get()
        //     .then(querySnapshot => console.log('User exists: ', querySnapshot));
        // });
        return navigation.goBack();
      }
    });
  };

  const contactAll = useCallback(() => {
    return new Promise((resolve, reject) => {
      try {
        return Permission.requestContactAccess().then(async () => {
          await Contacts.getAll().then(_contacts => {
            let temp_array = [];

            for (var [index, value] of _contacts.entries()) {
              let temp_obj = {name: '', contact: 0};
              let cont_num = value.phoneNumbers[0]?.number.replace(
                /[^\d]/g,
                '',
              );
              temp_obj.name = value?.givenName;
              temp_obj.contact = cont_num;
              temp_array.push(temp_obj);
            }

            const filter_array = temp_array.filter(
              item => isEmpty(item.name) && Number(item.contact) > 0,
            );

            Promise.all(filter_array).then(resolve_number => {
              setFilteredDataSource(resolve_number);
              setContacts(resolve_number, () => {
                resolve();
              });
            });
          });
        });
      } catch (e) {
        console.log('Permission desnindsfsdf >>>>>', e);
        reject(e);
      }
    });
  }, [contacts, filteredDataSource]);

  const searchFilterFunction = text => {
    if (text) {
      const newData = contacts.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : '';
        const itemData2 = item.contact
          ? item.contact.replace(/[^\d]/g, '')
          : '';
        const textData = text.toUpperCase();

        return (
          itemData.indexOf(textData) > -1 || itemData2.indexOf(textData) > -1
        );
      });

      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource(contacts);
    }
  };

  const _renderView = ({item, index}) => {
    return (
      <Pressable
        style={styles.renderStyle}
        onPress={() => {
          setInputs(
            {
              ...input,
              name: item.name,
              number: {value: item.contact, isError: false},
            },
            () => {
              dismissAll();
            },
          );
        }}>
        <View
          style={styles.shortNameStyle(
            check_platform ? 15 : 13,
            colors_array[index % 10],
          )}>
          <Text
            style={CommonStyles.textStyle(3, 'screenBackground', 'Inter200')}>
            {item?.name?.toUpperCase().trim().slice(0, 1)}
          </Text>
        </View>
        <View style={styles.contactListStyle}>
          <Text style={CommonStyles.textStyle(2.2, 'black', 'Inter400')}>
            {item.name}
          </Text>
          <Text style={CommonStyles.textStyle(2, 'black', 'Inter200')}>
            {item.contact}
          </Text>
        </View>
      </Pressable>
    );
  };

  const _renderBottomModel = () => {
    return (
      <BottomSheetModal
        backgroundStyle={styles.modelStyle}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        keyboardBehavior={check_platform ? 'extend' : 'interactive'}
        keyboardBlurBehavior={'none'}
        android_keyboardInputMode={'adjustResize'}>
        <BottomSheetView style={styles.stickyHeader}>
          <Text style={styles.headerTextStyle}>{localize('contact_list')}</Text>
        </BottomSheetView>
        <BottomSheetView style={styles.modelSheetView}>
          <BottomSheetTextInput
            placeholder={localize('search_contact')}
            style={styles.sheetTextStyle(isFocus ? 85 : 100)}
            onChangeText={text => searchFilterFunction(text)}
            onBlur={() => setFocus(true)}
            onFocus={() => setFocus(false)}
          />
          {isFocus && (
            <Image
              source={images.search_icon}
              style={styles.IconStyle('lightGrey', 1.5)}
            />
          )}
        </BottomSheetView>
        <BottomSheetFlatList
          style={{flex: 1}}
          contentContainerStyle={[styles.containerStyle]}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={filteredDataSource}
          renderItem={_renderView}
          maxToRenderPerBatch={10}
          onEndReachedThreshold={0.001}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSepratorStyle} />
          )}
          ListEmptyComponent={() => (
            <EmptyView
              style={styles.emptyView}
              empty_massage={'empty_contact_list'}
            />
          )}
          keyExtractor={(item, index) => `contact_${item.contact + index}`}
        />
      </BottomSheetModal>
    );
  };

  return (
    <WrapView
      isTitle={false}
      keyboardDismissMode={'on-drag'}
      contentContainerStyle={[styles.wrapContainer]}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}>
      <View style={styles.contactsMainView(2)}>
        <LabelView isError={input.number.isError} inputType={'input_number'}>
          <View style={styles.contactsStyle}>
            <Text
              style={CommonStyles.textStyle(
                2.2,
                input.number?.value ? 'black' : 'lightGrey',
                'Inter200',
                'left',
              )}>
              {input.number?.value
                ? input.number.value
                : localize('click_for_contact')}
            </Text>
            <Pressable
              onPress={() => {
                handlePresentModalPress();
              }}>
              <Image
                source={images.contact_icon}
                style={styles.IconStyle('black')}
              />
            </Pressable>
          </View>
        </LabelView>
      </View>
      <View style={styles.contactsMainView()}>
        <InputBox
          editable={false}
          inputType={'select_name'}
          size={2}
          value={input.name}
          isError={true}
        />
      </View>
      <View style={styles.contactsMainView(1)}>
        <InputBox
          inputType={'amount_details'}
          value={input.balance.value}
          onSubmitEditing={() => checkValidation(1)}
          size={2}
          onBlur={() => checkValidation(1)}
          onFocus={() =>
            setInputs(
              {...input, balance: {...input.balance, isError: false}},
              () => checkValidation(0),
            )
          }
          onChangeText={(masked, unmasked) =>
            setInputs({...input, balance: {value: unmasked, isError: false}})
          }
          isError={input.balance.isError}
          {...attributes.amount}
        />
      </View>
      <CustomButton
        onPress={onSubmit}
        buttonText={route.params.name}
        buttonStyle={styles.buttonStyle}
      />

      {_renderBottomModel()}
    </WrapView>
  );
};

export default CreateEditAccount;
