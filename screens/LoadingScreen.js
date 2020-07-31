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
function LoadingScreen(props) {
  return (
    <SafeAreaView style={styles.scrollview}>
      <View>
        <Image
          source={{
            uri: 'https://image.ayudaa.in/asset/loading.png',
          }}
          resizeMode="contain"
          style={{
            height: 300,
            maxHeight: 300,
          }}
        />
        <Text style={styles.text}>L O A D I N G . . .</Text>
        {/* <Text style={styles.label}>STAY THERE</Text> */}
      </View>

      {/* <Button title="Confirm Code" onPress={() => confirmCode()} /> */}

      {/* <View style={styles.profile}>
        <Text style={styles.text}>L O A D I N G . . .</Text>
      </View> */}
      <StatusBar barStyle="dark-content" hidden={true} backgroundColor="#fff" />
    </SafeAreaView>
  );
}

export default LoadingScreen;

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
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
