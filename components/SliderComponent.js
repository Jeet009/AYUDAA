import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import SliderItemComponent from './SliderItemComonent';
import colors from '../constants/colors';

export default function SliderComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* <Text style={styles.text}></Text> */}
        <Text style={{fontSize: 12, fontWeight: 'bold'}}>
          AYUDAA SAFE SERVICE
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').width}>
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
    alignItems: 'center',
    // margin: 2,
    // borderRadius: 5,
    marginTop: 5,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginLeft: 5,
    padding: 5,
    borderRadius: 5,
  },
});
