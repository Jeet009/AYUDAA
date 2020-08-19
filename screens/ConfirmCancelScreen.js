/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
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
import firestore from '@react-native-firebase/firestore';
import LoadingScreen from '../screens/LoadingScreen';

function ConfirmCancelOrder(props) {
  const [loading, setLoading] = useState();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.scrollview}>
        <View style={styles.profile}>
          {/* <Text style={styles.text}>A Y U D A A</Text> */}
          <Text style={styles.label}>ARE YOU SURE,</Text>
          <Text style={styles.para}>YOU WANT TO CANCEL YOUR ORDER ?</Text>

          <TouchableOpacity // eslint-disable-next-line prettier/prettier
            style={styles.button}
            onPress={() => {
              setLoading(true);
              firestore()
                .collection('orders')
                .doc(props.navigation.getParam('id'))
                .update({
                  //SERVICE DETAILS
                  status: 0,
                  canceled: true,
                })
                .then(() => {
                  setLoading(false);
                  props.navigation.navigate('CanceledScreen');
                });
              // console.log(props.navigation.getParam('id'));
            }}>
            <Text style={styles.buttonText}>CANCEL NOW</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{
            uri: 'https://image.ayudaa.in/final/undraw_logistics_x4dc.png',
          }}
          resizeMode="contain"
          style={{
            height: 200,
            // maxHeight: 200,
          }}
        />

        {/* <Button title="Confirm Code" onPress={() => confirmCode()} /> */}

        <View style={styles.profile}>
          <Text style={styles.text}>A Y U D A A</Text>
          <Text style={styles.label}>YOUR HOME SERVICE ASSISTANCE</Text>
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

export default ConfirmCancelOrder;

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
    marginTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
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
