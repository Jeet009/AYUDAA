import React from 'react';
import {View, Text, FlatList} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import OrderComponent from '../components/OrderComponent';
import colors from '../constants/colors';

export default function OrderScreen() {
  return (
    <>
      <HeaderComponent />
      <View style={{flex: 1, backgroundColor: colors.lightPrimary}}>
        <FlatList ListHeaderComponent={<OrderComponent />} />
      </View>
    </>
  );
}
