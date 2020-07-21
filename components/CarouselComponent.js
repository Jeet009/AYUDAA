import React from 'react';
import CarouselItemComponent from './CarouselItemComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native';

export default function CarouselComponent() {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CarouselItemComponent
          title="A Y U D A A"
          desc="O R D E R N O W"
          uri="https://image.ayudaa.in/asset/technicianCount.png"
        />
        <CarouselItemComponent
          count="BETA"
          title="C O U N T"
          desc="T E C H N I C I A N S"
          uri="https://image.ayudaa.in/asset/technicianCount.png"
        />
      </ScrollView>
    </View>
  );
}
