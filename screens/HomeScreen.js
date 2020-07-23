import React from 'react';
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native';
import CarouselComponent from '../components/CarouselComponent';
import CategoryComponent from '../components/CategoryComponent';
import {ScrollView} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import SliderComponent from '../components/SliderComponent';
import ServiceComponent from '../components/ServiceComponent';

export default function HomeScreen(props) {
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <CarouselComponent />
          <CategoryComponent />
          <SliderComponent />
        </>
      }
      ListFooterComponent={<ServiceComponent />}
    />
  );
}

const styles = StyleSheet.create({});
