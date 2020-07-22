import React from 'react';
import CarouselItemComponent from './CarouselItemComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {View, Dimensions} from 'react-native';

export default function CarouselComponent() {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // disableIntervalMomentum={true}
        snapToInterval={Dimensions.get('window').width}>
        <CarouselItemComponent uri="https://image.ayudaa.in/asset/slide0.png" />
        <CarouselItemComponent uri="https://image.ayudaa.in/asset/slide1.png" />
        <CarouselItemComponent uri="https://image.ayudaa.in/asset/slide2.png" />
        <CarouselItemComponent uri="https://image.ayudaa.in/asset/slide3.png" />
      </ScrollView>
    </View>
  );
}
