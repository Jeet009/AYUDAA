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
  Modal,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {List, ListItem, Left, Right, Thumbnail, Body} from 'native-base';
import colors from '../constants/colors';
import {Icon} from 'react-native-elements';
import {TouchableNativeFeedback, TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import WelcomeComponent from '../components/WelcomeComponent';
import LinearGradient from 'react-native-linear-gradient';

//Phone Auth
export default function LoginScreen(props) {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [modalVisible, setModalVisible] = useState(true);

  const [code, setCode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    if (!code) {
      Alert.alert('INVALID CODE.', 'ENTER A VALID OTP');
    } else {
      try {
        await confirm.confirm(code);
      } catch (error) {
        Alert.alert('INVALID CODE.', 'ENTER A VALID OTP');
      }
    }
  }
  if (!confirm) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
          colors={[colors.lightPrimary, '#fff']}
          style={{flex: 1, paddingBottom: 20}}>
          <SafeAreaView style={styles.scrollview}>
            <Modal
              animationType="fade"
              transparent={false}
              visible={modalVisible}>
              <View style={styles.centeredView}>
                <WelcomeComponent />
                <View style={styles.modalView}>
                  <Text style={styles.textStyle}>A Y U D A A</Text>

                  <Text style={styles.modalText}>
                    Your Home Service Assistance
                  </Text>
                  <TouchableOpacity
                    style={{
                      ...styles.openButton,
                      backgroundColor: colors.primary,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>Join Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View>
              <Text style={styles.label}>ENTER PHONE NUMBER</Text>
              <View style={styles.textInputBg}>
                <Text style={styles.placeholder}>+91</Text>
                <TextInput
                  value={phoneNo}
                  style={styles.textInput}
                  keyboardType="phone-pad"
                  textAlign="center"
                  maxLength={10}
                  onChangeText={(text) => setPhoneNo(text)}
                  //color="black"
                />
              </View>
            </View>
            <View style={styles.profile}>
              <Text style={styles.text}>A Y U D A A</Text>
              <Text style={styles.para}>Your Home Service Assistance</Text>
              <Text style={styles.para}>&copy; GOWAVE</Text>
            </View>

            <TouchableOpacity // eslint-disable-next-line prettier/prettier
              style={styles.button}
              onPress={() => {
                if (!phoneNo) {
                  Alert.alert('INVALID PHONE NO', 'ENTER A VALID PHONE NUMBER');
                } else {
                  signInWithPhoneNumber('+91' + ' ' + phoneNo);
                }
              }}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <StatusBar
              barStyle="dark-content"
              hidden={true}
              backgroundColor="#fff"
            />
          </SafeAreaView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={[colors.lightPrimary, '#fff']}
        style={{flex: 1, paddingBottom: 20}}>
        <SafeAreaView style={styles.scrollview}>
          <View>
            <Text style={styles.label}>ENTER OTP</Text>
            <View style={styles.otpInputBg}>
              <TextInput
                value={code}
                style={styles.textInput}
                keyboardType="phone-pad"
                textAlign="center"
                maxLength={10}
                onChangeText={(text) => setCode(text)}
                required
              />
            </View>
            {/* <Button title="Confirm Code" onPress={() => confirmCode()} /> */}
          </View>
          <View style={styles.profile}>
            <Text style={styles.text}>WELCOME TO AYUDAA</Text>
            <Text style={styles.para}>YOUR HOME SERVICE ASSISTANCE</Text>
          </View>
          <TouchableOpacity // eslint-disable-next-line prettier/prettier
            style={styles.button}
            onPress={() => {
              confirmCode();
            }}>
            <Text style={styles.buttonText}>CONFIRM OTP</Text>
          </TouchableOpacity>
          <StatusBar
            barStyle="dark-content"
            hidden={true}
            backgroundColor="#fff"
          />
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Light',
    color: colors.ypsDark,
    margin: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: colors.lightPrimary,
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 5,
  },
  scrollview: {
    flex: 1,
    justifyContent: 'space-evenly',
    // backgroundColor: colors.lightPrimary,
  },
  textInput: {
    flex: 1,
    borderRadius: 30,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    marginLeft: 20,
    fontSize: 20,
    paddingTop: 15,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Light',
    backgroundColor: colors.white,
    // elevation: 5,
  },
  textInputBg: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Light',
    backgroundColor: colors.lightPrimary,
    elevation: 5,
  },
  otpInputBg: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Light',
    backgroundColor: colors.white,
    elevation: 5,
  },
  profile: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  placeholder: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
    marginTop: 5,
    // backgroundColor: 'black',
    color: colors.ypsDark,
  },
  para: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  label: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    marginTop: 15,
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    marginTop: Dimensions.get('window').height / 4,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
  },
  openButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    elevation: 2,
    // marginTop: 20,
  },
  textStyle: {
    color: 'black',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  modalText: {
    marginBottom: 12,
    textAlign: 'left',
    padding: 20,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Light',
    textTransform: 'uppercase',
    fontSize: 12,
    color: 'black',
  },
});
