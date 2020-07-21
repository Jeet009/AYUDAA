import React from 'react';
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native';
import CarouselComponent from '../components/CarouselComponent';
import CategoryComponent from '../components/CategoryComponent';
import {ScrollView} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import SliderComponent from '../components/SliderComponent';

export default function HomeScreen() {
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <CarouselComponent />
          <CategoryComponent />
          <SliderComponent />
        </>
      }
    />
  );
}

const styles = StyleSheet.create({});
