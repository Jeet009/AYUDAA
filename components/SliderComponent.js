import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import SliderItemComponent from './SliderItemComonent';
import colors from '../constants/colors';

export default function SliderComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>AYUDAA SAFE SERVICE</Text>
        <Text style={{fontSize: 10, fontWeight: 'bold'}}>DUE TO COVID 19 </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <SliderItemComponent uri="https://image.ayudaa.in/asset/safe%20service.png" />
        <SliderItemComponent uri="https://image.ayudaa.in/asset/covid19.png" />
        <SliderItemComponent uri="https://image.ayudaa.in/asset/gloves.png" />
        <SliderItemComponent uri="https://image.ayudaa.in/asset/mask.png" />
        <SliderItemComponent uri="https://image.ayudaa.in/asset/sanitize.png" />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 2,
    borderRadius: 5,
    marginTop: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    // backgroundColor: colors.white,
    marginLeft: 5,
    padding: 5,
    borderRadius: 5,
  },
});
