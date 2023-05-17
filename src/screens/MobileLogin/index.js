import React, {useEffect, useRef} from 'react';
import {Text, View, ScrollView} from 'react-native';

import {useStateWithCallbackLazy} from 'use-state-with-callback';
import {useDispatch} from 'react-redux';
import PhoneInput from 'react-native-phone-input';

import {saveUserData} from '@actions';
import {CustomButton} from '@components';
import {redTypes} from '@constants';
import {FirebaseAuth, Permission} from '@services';
import {localize} from '@languages';

import styles from './style';

const obj = {value: '', isError: false};

const TextComponent = props => {
  return (
    <Text style={styles.common_textStyle(props.size, props.color)}>
      {props.massage}
    </Text>
  );
};

const MobileLogin = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const [input, setInputs] = useStateWithCallbackLazy(obj);
  const phoneRef = useRef(null);
  useEffect(() => {
    Permission.requestContactAccess();
  }, []);

  const onSubmit = () => {
    if (checkValidation()) {
      FirebaseAuth.signIn(input?.value)
        .then(result => {
          // const getdasdas = phoneRef.current?.getCountryCode(input?.value);
          // console.log(getdasdas);
          dispatch(
            saveUserData({
              type: redTypes.LOGIN_DATA,
              userData: result,
              number: input?.value,
            }),
          );
          return navigation.navigate('VerifyOTP', {
            name: 'VerifyOTP',
            number: input?.value,
          });
        })
        .catch(e => console.log('Error >>>>>signIn >>>>>', e));
    }
  };

  const checkValidation = () => {
    const number_length = input.value.trim().length;
    if (number_length < 9 || number_length > 15) {
      setInputs({...input, isError: true});
      return false;
    }
    return true;
  };

  //added All React native TextInput props
  const textProps = {
    onFocus: () => setInputs({...input, isError: false}),
    onSubmitEditing: () => onSubmit(),
    ...styles.textContainer,
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollContainerStyle}>
      <View style={styles.inputView}>
        <TextComponent
          color={'black'}
          massage={localize('mobile_login').title}
        />
        <PhoneInput
          ref={phoneRef}
          defaultValue={input?.value}
          layout="first"
          initialCountry={'in'}
          withShadow
          flagStyle={styles.flagStyle}
          textProps={textProps}
          onChangePhoneNumber={text =>
            setInputs({...input, value: text, isError: false})
          }
        />
        {input.isError && (
          <TextComponent
            color={'red'}
            size={1.8}
            massage={
              input?.value.length <= 3
                ? localize('mobile_login').empty_value
                : localize('mobile_login').invalid_length
            }
          />
        )}
      </View>

      <CustomButton
        onPress={() => onSubmit()}
        buttonText={'send_otp'}
        buttonStyle={styles.buttonStyle}
      />
    </ScrollView>
  );
};

export default MobileLogin;
