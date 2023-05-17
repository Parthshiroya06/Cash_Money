import React, {useEffect, useState, useRef} from 'react';
import {View, Pressable, Text} from 'react-native';

//third Party Package

import {useStateWithCallbackLazy} from 'use-state-with-callback';
import MaskInput from 'react-native-mask-input';
import {useDispatch, useSelector} from 'react-redux';

import {saveUserData} from '@actions';
import {redTypes} from '@constants';
import {CustomButton, WrapView} from '@components';
import {CommonStyles} from '@resources';
import {localize} from '@languages';
import {FirebaseAuth, Firestore} from '@services';

import styles from './style';

const VerifyOTP = props => {
  const {navigation, route} = props;

  const dispatch = useDispatch();
  const {userData, number} = useSelector(state => state.userData);

  const [input, setInputs] = useStateWithCallbackLazy(new Array(6).fill());
  const [confirm, setConfirm] = useState(userData);
  const [isError, setIsError] = useState(false);
  const [contact, setContacts] = useState(number);

  let itemsRef = useRef([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerBackVisible: false,
      cardShadowEnabled: false,
      headerStyle: {elevation: 0, shadowOpacity: 0},
    });
    if (itemsRef?.current) {
      itemsRef.current[0].focus();
    }
  }, [navigation]);

  const changeText = (val, index) => {
    setIsError(false);

    setInputs(
      state => [...state].fill(val, index, index + 1),
      () => {
        if (index < 5 && val) {
          return itemsRef.current[index + 1].focus();
        }
      },
    );
  };

  const resendOtp = () => {
    FirebaseAuth.signIn(contact)
      .then(result => {
        alert(`${localize('sucessfully_sentOtp')} ${contact}`);
        dispatch(
          saveUserData({
            type: redTypes.LOGIN_DATA,
            userData: result,
          }),
        );
      })
      .catch(e => console.log('Error >>>>>signIn >>>>>', e));
  };

  const onSubmitButton = async () => {
    try {
      const isNotEmpty = input.some(item => item === undefined || item === '');
      if (!isNotEmpty) {
        const otp = input.join('');
        await confirm.confirm(otp).then(usersData => {
          console.log('usersId.users.uid ', usersData);
          dispatch(
            saveUserData({
              type: redTypes.LOGIN_DATA,
              userData: usersData,
              isLoggedIn: true,
            }),
          );
          Firestore.collections('users').then(docs =>
            docs.doc(usersData.user?.uid).set({}),
          );
        });

        //  return navigation.navigate('HomeScreen');
      }
    } catch (error) {
      if (error.code === 'auth/invalid-verification-code') {
        alert(localize('invalid_otp'));
      }
      setIsError(true);
    }
  };

  const _renderTextInput = (values, index) => {
    return (
      <View style={styles.textInputView} key={index}>
        <MaskInput
          placeholder={''}
          ref={refs => (itemsRef.current[index] = refs)}
          style={CommonStyles.textStyle(3, 'black', 'Inter200', 'center')}
          value={input[index]}
          onChangeText={(masked, unmasked) => changeText(unmasked, index)}
          onSubmitEditing={() => {
            index < 5 && input[index]
              ? itemsRef.current[index + 1].focus()
              : onSubmitButton();
          }}
          maxLength={1}
          keyboardType={'number-pad'}
          returnKeyType={index < 5 ? 'next' : 'done'}
          blurOnSubmit={index < 5 ? false : true}
          selectTextOnFocus={Number(input[index]) ? true : false}
          mask={[/[0-9]/]}
        />
      </View>
    );
  };

  return (
    <WrapView isTitle={true} contentContainerStyle={styles.wrapView}>
      <View style={styles.inputTextMainView}>
        {input.map((v, i) => _renderTextInput(v, i))}
      </View>

      {isError && (
        <Text style={styles.commonTextStyle('red')}>
          {localize('otp_errorText')}
        </Text>
      )}
      <CustomButton
        onPress={onSubmitButton}
        buttonText={'VerifyOTP'}
        buttonStyle={styles.buttonStyle}
      />
      <Pressable style={{alignSelf: 'flex-start'}} onPress={resendOtp}>
        <Text style={[styles.commonTextStyle('blue')]}>
          {localize('resend_otp')}
        </Text>
      </Pressable>
    </WrapView>
  );
};

export default VerifyOTP;
