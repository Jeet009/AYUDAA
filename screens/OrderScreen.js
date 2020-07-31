import React from 'react';
import {View, Text, FlatList} from 'react-native';
import OrderComponent from '../components/OrderComponent';
import LoadingScreen from '../screens/LoadingScreen';

export default function OrderScreen() {
  return <FlatList ListHeaderComponent={<OrderComponent />} />;
}
