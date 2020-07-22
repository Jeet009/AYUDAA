import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import colors from '../constants/colors';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';

export default function CarouselItemComponent(props) {
  return (
    <TouchableOpacity>
      <ImageBackground
        resizeMode="contain"
        source={{uri: props.uri}}
        style={styles.Imgcontainer}
        imageStyle={{borderRadius: 5}}>
        <View style={styles.topTextContainer}>
          <Text style={styles.topCount}>{props.count}</Text>
          <Text style={styles.topText}>{props.title}</Text>
          <Text style={styles.regularText}>{props.desc}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  Imgcontainer: {
    width: Dimensions.get('window').width - 10,
    height: Math.round((Dimensions.get('window').width * 9) / 16),
    maxHeight: Math.round((Dimensions.get('window').width * 9) / 16),
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 15,
    margin: 5,
  },
  regularText: {
    color: colors.white,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  topCount: {
    color: colors.white,
    fontSize: 40,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  topText: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  topTextContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '40%',
    maxWidth: '40%',
    borderRadius: 10,
    marginEnd: 5,
  },
});
