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
function SuccessOrder(props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.scrollview}>
        <View style={styles.profile}>
          {/* <Text style={styles.text}>A Y U D A A</Text> */}
          <Text style={styles.label}>Successfully Placed Your Order</Text>

          <TouchableOpacity // eslint-disable-next-line prettier/prettier
            style={styles.button}
            onPress={() => {
              props.navigation.navigate('A Y U D A A');
            }}>
            <Text style={styles.buttonText}>PROCEED</Text>
          </TouchableOpacity>

          <Text style={styles.para}>THANK YOU FOR USING OUR SERVICE</Text>
          <Text style={styles.para}> OUR TEAM WILL GET BACK TO YOU ASAP</Text>
        </View>

        {/* <Button title="Confirm Code" onPress={() => confirmCode()} /> */}

        <View style={styles.profile}>
          <Text style={styles.text}>A Y U D A A</Text>
          <Text style={styles.label}>YOUR HOME SERVICE ASSISTANT</Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default SuccessOrder;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.ypsDark,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
    marginLeft: 40,
    marginRight: 40,
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
