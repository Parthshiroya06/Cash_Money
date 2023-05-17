import React, {useState} from 'react';
import {View, Text, Platform, Pressable} from 'react-native';

//third Party Package
import {useStateWithCallbackLazy} from 'use-state-with-callback';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-date-picker';
import MaskInput from 'react-native-mask-input';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';

import {saveUserData} from '@actions';
import {redTypes} from '@constants';
import {CustomButton, LabelView, WrapView, InputBox} from '@components';
import {localize} from '@languages';
import {attributes, Colors, CommonStyles} from '@resources';
import {Firestore} from '@services';
import {isEmpty, checkLength} from '@utils';

import styles from './style';

var radio_props = [
  {label: localize('transferred'), value: localize('transferred')},
  {label: localize('recevied'), value: localize('recevied')},
];
const common_obj = {
  value: '',
  isError: false,
};
const main_obj = {
  radio: common_obj,
  date: common_obj,
  amount: common_obj,
  remarks: '',
};
// Firestore.collections('Users').then(docs => {
//   docs
//     .doc(userData.user?.uid)
//     .collection('Account')
//     .doc('9099971245')
//     .delete();
// });
const AddTransaction = props => {
  const {navigation} = props;
  const {userData} = useSelector(state => state.userData);

  console.log('userData >>>>>>', userData.user?.uid);
  const [input, setInputs] = useStateWithCallbackLazy(main_obj);
  const [open, setOpen] = useState(false);

  const checkValidation = item => {
    return new Promise((resolve, reject) => {
      let state_object = {...input};

      switch (item) {
        case 2:
          if (!checkLength(input.amount)) {
            state_object.amount = {
              ...state_object.amount,
              isError: true,
            };
          }
        case 1:
          if (input.date?.value === '') {
            state_object.date = {
              ...state_object.date,
              isError: true,
            };
          }

        case 0:
          if (!isEmpty(input.radio?.value)) {
            state_object.radio = {
              ...state_object.radio,
              isError: true,
            };
          }

        default:
          setInputs(state_object, () => resolve(state_object));
      }
    });
  };

  const onSubmit = () => {
    checkValidation(2).then(item => {
      const {amount, date, radio} = item;
      if (!amount.isError && !date.isError && !radio.isError) {
        Firestore.collections('Transaction History').then(docs => {
          docs.doc('9099971245').collection(userData.user?.uid).doc().set({
            amount: 200,
            isFlag: true,
            date: '20-Nov-2022',
            remark: 'add Transaction',
          });
        });
        navigation.goBack();
      }
    });
  };

  const _renderDate = () => {
    return (
      <DatePicker
        mode={'date'}
        open={open}
        date={input.date?.value ? input.date.value : new Date()}
        modal={true}
        maximumDate={new Date()}
        onDateChange={input.date.value}
        onConfirm={date => {
          setInputs({
            ...input,
            date: {value: date, isError: false},
          });
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        androidVariant={Platform.OS === 'ios' ? 'iosClone' : 'nativeAndroid'}
        textColor={Colors.blue}
        confirmText={localize('confirm')}
        cancelText={localize('cancel')}
      />
    );
  };

  const _renderRadioButton = (item, index) => {
    const isTrue = input.radio.value === item.label;

    const common_radioParams = {
      obj: item,
      index: index,
      isSelected: isTrue,
      onPress: value => {
        setInputs({
          ...input,
          radio: {value: value, isError: false},
        });
      },
    };

    return (
      <RadioButton labelHorizontal={true} key={index}>
        <RadioButtonInput
          borderWidth={2}
          buttonInnerColor={Colors.darkBlue}
          buttonOuterColor={
            input.radio.value === item.label ? Colors.blue : Colors.lightGrey
          }
          buttonSize={responsiveHeight(2.1)}
          buttonOuterSize={responsiveHeight(3.1)}
          buttonWrapStyle={{
            marginVertical: responsiveHeight(0.5),
          }}
          {...common_radioParams}
        />
        <RadioButtonLabel
          labelHorizontal={true}
          labelStyle={CommonStyles.textStyle(2, 'black', 'Inter200')}
          {...common_radioParams}
        />
      </RadioButton>
    );
  };

  return (
    <WrapView
      isTitle={false}
      contentContainerStyle={styles.wrapContainer}
      keyboardDismissMode={'on-drag'}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}>
      <View style={styles.radioButtonView}>
        <RadioForm labelHorizontal={true} animation={true}>
          {radio_props.map((item, index) => _renderRadioButton(item, index))}
        </RadioForm>
        {input.radio.isError && (
          <Text style={styles.commonTextStyle(1.8, 'red', 'Inter200')}>
            {localize('radio_errorText')}
          </Text>
        )}
      </View>

      <View style={styles.dateAmountWrapStyle}>
        <LabelView isError={input.date.isError} inputType={'date_input'}>
          <Pressable
            onPress={() => {
              setOpen(!open);
            }}
            style={styles.dateContainer(input.date?.value ? 0 : 2)}>
            <Text
              style={CommonStyles.textStyle(
                2.2,
                input.date?.value ? 'black' : 'lightGrey',
                'Inter200',
                input.date?.value ? 'center' : 'left',
              )}>
              {input.date.value
                ? moment(new Date(input.date.value)).format('DD MMM YYYY')
                : localize('select_date')}
            </Text>
          </Pressable>
        </LabelView>
        <LabelView isError={input.amount.isError} inputType={'add_amount'}>
          <MaskInput
            placeholder={localize('add_amount').title}
            style={[styles.maskInput]}
            value={input.amount.value}
            onChangeText={(masked, unmasked) =>
              setInputs({
                ...input,
                amount: {value: unmasked, isError: false},
              })
            }
            onBlur={() => checkValidation(2)}
            onFocus={() =>
              checkValidation(1).then(result => {
                return setInputs({
                  ...result,
                  amount: {...result.amount, isError: false},
                });
              })
            }
            onSubmitEditing={() => checkValidation(2)}
            {...attributes.amount}
          />
        </LabelView>
      </View>

      <InputBox
        inputType={'remark_view'}
        value={input.remarks}
        size={1.8}
        onFocus={() => checkValidation(2)}
        onBlur={() => checkValidation(2)}
        onChangeText={text => setInputs({...input, remarks: text})}
      />

      <CustomButton
        onPress={onSubmit}
        buttonText={'add_button'}
        buttonStyle={styles.buttonStyle}
      />
      {_renderDate()}
    </WrapView>
  );
};

export default AddTransaction;
