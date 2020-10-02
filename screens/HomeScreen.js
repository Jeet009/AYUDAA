import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import CarouselComponent from '../components/CarouselComponent';
import CategoryComponent from '../components/CategoryComponent';
import SliderComponent from '../components/SliderComponent';
import ServiceComponent from '../components/ServiceComponent';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '../components/HeaderComponent';
import FloatingButton from '../components/FloatingButton';
import auth from '@react-native-firebase/auth';
import SetUpProfile from './SetupProfile';

export default function HomeScreen(props) {
  let user = auth().currentUser;
  // console.log(user.displayName);

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
            {!user.displayName && <SetUpProfile />}
          </>
        }
        ListFooterComponent={<ServiceComponent />}
      />
      <FloatingButton />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
