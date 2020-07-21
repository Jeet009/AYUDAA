import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import colors from '../constants/colors';

export default function SliderItemComponent(props) {
  return (
    <View>
      <ImageBackground
        resizeMode="contain"
        imageStyle={{borderRadius: 5}}
        source={{uri: props.uri}}
        style={styles.Imgcontainer}></ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  Imgcontainer: {
    width: Dimensions.get('window').width / 2,
    height: Math.round((Dimensions.get('window').width * 9) / 16),
    maxHeight: Math.round((Dimensions.get('window').width * 9) / 16),
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 5,
  },
});
