import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import Photo from '../js/dummyData';
import {Container} from 'native-base';
import colors from '../constants/colors';
import ListComponent from './ListComponent';

export default function OrderComponent() {
  function renderCategory(itemData) {
    return (
      <TouchableOpacity style={styles.category}>
        <ListComponent title={itemData.item.text} />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <FlatList
        ListHeaderComponent={<Text style={styles.text}>YOUR ORDERS</Text>}
        renderItem={renderCategory}
        data={CATEGORY}
      />
    </View>
  );
}

export const CATEGORY = [
  new Photo(
    'p1',
    'AC SERVICE & REPAIR',
    'https://image.ayudaa.in/asset/electrical.png',
  ),
  new Photo(
    'p2',
    'HOME DEEP CLEANING',
    'https://image.ayudaa.in/asset/electrical.png',
  ),
];

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 2,
    marginTop: 10,
  },
  category: {
    backgroundColor: colors.white,
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
});
