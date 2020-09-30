import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import CarouselComponent from '../components/CarouselComponent';
import CategoryComponent from '../components/CategoryComponent';
import SliderComponent from '../components/SliderComponent';
import ServiceComponent from '../components/ServiceComponent';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '../components/HeaderComponent';
import FloatingButton from '../components/FloatingButton';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#ffff', '#fff']}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <HeaderComponent />

            <CarouselComponent />
            <CategoryComponent />
            <SliderComponent />
          </>
        }
        ListFooterComponent={<ServiceComponent />}
      />
      <FloatingButton />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
