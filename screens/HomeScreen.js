import React from 'react';
import {StyleSheet, FlatList, ImageBackground} from 'react-native';
import CarouselComponent from '../components/CarouselComponent';
import CategoryComponent from '../components/CategoryComponent';
import SliderComponent from '../components/SliderComponent';
import ServiceComponent from '../components/ServiceComponent';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#ffffba', '#ffffbe']}>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
