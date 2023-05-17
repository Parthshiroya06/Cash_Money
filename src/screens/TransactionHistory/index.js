import React from 'react';
import {View, Image, FlatList, Pressable} from 'react-native';

import moment from 'moment';

import {images} from '@assets';
import {TransactionDetails, EmptyView} from '@components';

import styles from './style';

const TransactionHistory = props => {
  const {navigation} = props;

  const dammy_array = [
    100, 152, 2125, -5465, 152, 7852, -24, 142, 488, -899, -9, -15, 75, 795,
    1458, -78,
  ];

  const date = moment().format('DD MMM YYYY');

  return (
    <>
      <FlatList
        style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={dammy_array}
        renderItem={({item, index}) => (
          <TransactionDetails
            name={date}
            number={'your amount is withdraw'}
            amount={item}
          />
        )}
        keyExtractor={(item, index) => `transaction_${index}`}
        removeClippedSubviews={true}
        contentContainerStyle={styles.containerFlatlist}
        ItemSeparatorComponent={() => <View style={styles.itemSepratorStyle} />}
        ListEmptyComponent={() => (
          <EmptyView empty_massage={'empty_account_label'} />
        )}
      />
      <Pressable
        style={styles.flotButton}
        onPress={() => {
          navigation.navigate('AddTransaction', {name: 'Add Transaction'});
        }}>
        <Image source={images.add_icon} style={styles.flotImage} />
      </Pressable>
    </>
  );
};

export default TransactionHistory;
