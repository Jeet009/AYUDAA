/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import colors from '../constants/colors';
function NullScreen(props) {
  return (
    <SafeAreaView style={styles.scrollview}>
      <View>
        <Image
          source={{
            uri: 'https://image.ayudaa.in/final/newLogo.png',
          }}
          resizeMode="contain"
          style={{
            height: 300,
            maxHeight: 300,
          }}
        />
        <Text style={styles.text}>
          N O T H I N G {'  '} T O {'  '} S H O W . . .{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default NullScreen;

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  profile: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
