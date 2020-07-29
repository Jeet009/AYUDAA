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
function SetUpProfile(props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.scrollview}>
        <View style={styles.profile}>
          <Text style={styles.text}>A Y U D A A</Text>
          <Text style={styles.para}>THANK YOU FOR JOINING US</Text>
        </View>

        <View>
          <Text style={styles.label}>Successfully Created Profile</Text>
        </View>

        {/* <Button title="Confirm Code" onPress={() => confirmCode()} /> */}
        <TouchableOpacity // eslint-disable-next-line prettier/prettier
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('App');
          }}>
          <Text style={styles.buttonText}>PROCEED</Text>
        </TouchableOpacity>
        <View style={styles.profile}>
          <Text style={styles.text}>WELCOME TO AYUDAA</Text>
          <Text style={styles.label}>YOUR HOME SERVICE ASSISTANT</Text>
        </View>
        <StatusBar
          barStyle="dark-content"
          hidden={true}
          backgroundColor="#fff"
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default SetUpProfile;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.ypsDark,
    margin: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  scrollview: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  textInput: {
    borderColor: colors.ypsDark,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 15,
    // fontWeight: 'bold',
    backgroundColor: colors.white,
  },
  profile: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  para: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: colors.smoke,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});