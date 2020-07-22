import React from 'react';
import {View, Text, FlatList} from 'react-native';
import OrderComponent from '../components/OrderComponent';

export default function OrderScreen() {
  return <FlatList ListHeaderComponent={<OrderComponent />} />;
}
