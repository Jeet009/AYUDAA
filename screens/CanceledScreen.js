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
function CanceledOrder(props) {
  return (
    <SafeAreaView style={styles.scrollview}>
      <Text style={styles.label}>Successfully Canceled Your Order</Text>
      <Image
        source={{
          uri: 'https://image.ayudaa.in/final/undraw_empty_cart_co35.png',
        }}
        resizeMode="contain"
        style={{
          height: 200,
          // maxHeight: 200,
        }}
      />
      <View style={styles.profile}>
        {/* <Text style={styles.text}>A Y U D A A</Text> */}

        <TouchableOpacity // eslint-disable-next-line prettier/prettier
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Home');
          }}>
          <Text style={styles.buttonText}>HOME</Text>
        </TouchableOpacity>
        <Text style={styles.para}>
          SORRY, THAT YOU HAD TO CANCEL YOUR ORDER,
        </Text>
        <Text style={styles.para}>
          YOU CAN REACH US OUT IF YOU NEED ANY HELP.
        </Text>
      </View>

      {/* <Button title="Confirm Code" onPress={() => confirmCode()} /> */}

      <View style={styles.profile}>
        <Text style={styles.text}>A Y U D A A</Text>
        <Text style={styles.label}>YOUR HOME SERVICE ASSISTANT</Text>
      </View>
      <StatusBar barStyle="dark-content" hidden={true} backgroundColor="#fff" />
    </SafeAreaView>
  );
}

export default CanceledOrder;

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
    paddingLeft: 50,
    paddingRight: 50,
  },
  scrollview: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    paddingTop: 30,
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
    flex: 1,
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
