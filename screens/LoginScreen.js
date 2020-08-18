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
                <TouchableHighlight
                  style={{
                    ...styles.openButton,
                    backgroundColor: colors.primary,
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Let's Start</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <View style={styles.profile}>
            <Text style={styles.text}>A Y U D A A</Text>
            <Text style={styles.para}>YOUR HOME SERVICE ASSISTANT</Text>
          </View>
          <View>
            <Text style={styles.label}>ENTER PHONE NUMBER</Text>
            <TextInput
              value={phoneNo}
              style={styles.textInput}
              keyboardType="phone-pad"
              textAlign="center"
              maxLength={10}
              onChangeText={(text) => setPhoneNo(text)}
              //color="black"
            />

            <TouchableOpacity // eslint-disable-next-line prettier/prettier
              style={styles.button}
              onPress={() => {
                if (!phoneNo) {
                  Alert.alert('INVALID PHONE NO', 'ENTER A VALID PHONE NUMBER');
                } else {
                  signInWithPhoneNumber('+91' + ' ' + phoneNo);
                }
              }}>
              <Text style={styles.buttonText}>LET'S START</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={{
                uri: 'https://image.ayudaa.in/asset/welcomeScreen.png',
              }}
              resizeMode="contain"
              style={{
                height: 150,
                maxHeight: 150,
              }}
            />
          </View>
          <Text style={styles.para}>&copy; GOWAVE</Text>
          <StatusBar
            barStyle="dark-content"
            hidden={true}
            backgroundColor="#fff"
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.scrollview}>
        <View>
          <Text style={styles.label}>ENTER OTP</Text>
          <TextInput
            value={code}
            style={styles.textInput}
            keyboardType="phone-pad"
            textAlign="center"
            maxLength={10}
            onChangeText={(text) => setCode(text)}
            required
          />
          {/* <Button title="Confirm Code" onPress={() => confirmCode()} /> */}
          <TouchableOpacity // eslint-disable-next-line prettier/prettier
            style={styles.button}
            onPress={() => {
              confirmCode();
            }}>
            <Text style={styles.buttonText}>CONFIRM OTP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profile}>
          <Text style={styles.text}>WELCOME TO AYUDAA</Text>
          <Text style={styles.para}>YOUR HOME SERVICE ASSISTANT</Text>
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
    borderRadius: 30,
  },
  scrollview: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  textInput: {
    borderColor: colors.ypsDark,
    borderWidth: 1,
    borderRadius: 30,
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: colors.smoke,
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
    alignSelf: 'center',
  },
  label: {fontSize: 12, fontWeight: 'bold', textAlign: 'center'},
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
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  modalText: {
    marginBottom: 12,
    textAlign: 'left',
    padding: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
    color: 'black',
  },
  modalTextWhite: {
    marginBottom: 12,
    textAlign: 'left',
    padding: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
    color: 'white',
  },
});
