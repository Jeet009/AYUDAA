import React from 'react';
import {StyleSheet, FlatList, ImageBackground} from 'react-native';
import CarouselComponent from '../components/CarouselComponent';
import CategoryComponent from '../components/CategoryComponent';
import SliderComponent from '../components/SliderComponent';
import ServiceComponent from '../components/ServiceComponent';
import firestore from '@react-native-firebase/firestore';

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
      ListFooterComponent={<ServiceComponent />}
    />
  );
}

const styles = StyleSheet.create({});
