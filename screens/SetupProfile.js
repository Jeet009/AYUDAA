/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {TouchableNativeFeedback, TextInput} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

function SetUpProfile(props) {
  const [modalVisible, setModalVisible] = useState(true);
  const [submitButtonText, setSubmitButtonText] = useState('Confirm');
  const [showOtherInfo, setShowOtherInfo] = useState(false);

  const [name, setName] = useState('');
  const [ayudaaId, setAyudaaId] = useState('');
  const [phoneno, setPhoneno] = useState('');

  let user = auth().currentUser;

  async function confirmProfile() {
    if (!name || !ayudaaId) {
      Alert.alert('INVALID.', 'ENTER A VALID INPUT');
      setSubmitButtonText('Confirm');
    } else {
      try {
        firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            name: name,
            type: 'customer',
            email: ayudaaId,
            phone: phoneno,
            displayName: ayudaaId,
            firstPincode: ' ',
            secondPincode: ' ',
            isVerified: false,
          })
          .then(() => {
            user.updateProfile({
              displayName: ayudaaId,
            });
          })
          .then(() => {
            setSubmitButtonText('INITIALIZED');
          })
          .then(() => {
            setModalVisible(false);
          })
          .catch((err) => {
            console.log(err);
            setSubmitButtonText('TRY AGAIN');
          });
      } catch (error) {
        Alert.alert('INVALID.', 'Something Went Wrong');
      }
    }
  }
  return (
    <Modal animationType="slide" visible={modalVisible}>
      <LinearGradient
        colors={[colors.lightPrimary, '#fff']}
        style={{flex: 1, paddingBottom: 20}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.scrollview}>
            <View style={styles.profile}>
              <Text style={styles.para}>Welcome To The Family</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
            <View>
              {!showOtherInfo && (
                <View style={styles.input}>
                  <Text style={styles.label}>ENTER FULL NAME</Text>
                  <TextInput
                    value={name}
                    style={styles.textInput}
                    textAlign="center"
                    maxLength={25}
                    onChangeText={(text) => setName(text)}
                  />
                </View>
              )}
              {showOtherInfo && (
                <>
                  <View style={styles.input}>
                    <Text style={styles.label}>ENTER EMAIL ID</Text>
                    <TextInput
                      value={ayudaaId}
                      style={styles.textInput}
                      textAlign="center"
                      maxLength={30}
                      onChangeText={(text) => setAyudaaId(text)}
                    />
                    <Text style={styles.label}>CONFIRM PHONE NUMBER</Text>
                    <TextInput
                      value={phoneno}
                      style={styles.textInput}
                      textAlign="center"
                      maxLength={10}
                      keyboardType="phone-pad"
                      onChangeText={(text) => setPhoneno(text)}
                    />
                  </View>
                </>
              )}

              {/* <Button title="Confirm Code" onPress={() => confirmCode()} /> */}
            </View>
            <View style={styles.profile}>
              <Text style={styles.text}>A Y U D A A</Text>
              <Text style={styles.para}>SET UP YOUR PROFILE.</Text>
            </View>
            {!showOtherInfo && (
              <TouchableOpacity // eslint-disable-next-line prettier/prettier
                style={styles.button}
                onPress={() => {
                  setShowOtherInfo(true);
                }}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            )}
            {showOtherInfo && (
              <>
                <TouchableOpacity // eslint-disable-next-line prettier/prettier
                  style={styles.button}
                  onPress={() => {
                    setSubmitButtonText('Creating...');
                    confirmProfile();
                  }}>
                  <Text style={styles.buttonText}>{submitButtonText}</Text>
                </TouchableOpacity>
                <TouchableOpacity // eslint-disable-next-line prettier/prettier
                  style={styles.buttonBack}
                  onPress={() => {
                    setShowOtherInfo(false);
                  }}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
              </>
            )}
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </Modal>
  );
}

export default SetUpProfile;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontFamily: 'Poppins-Light',
    color: colors.ypsDark,
    margin: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: colors.lightPrimary,
    borderRadius: 5,
    elevation: 10,
    position: 'absolute',
    bottom: 20,
    right: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonBack: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: colors.smoke,
    borderRadius: 5,
    elevation: 10,
    position: 'absolute',
    bottom: 20,
    left: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollview: {
    flex: 1,
    justifyContent: 'space-evenly',
    // backgroundColor: 'white',
  },
  textInput: {
    borderRadius: 25,
    margin: 10,
    fontSize: 15,
    elevation: 5,
    backgroundColor: colors.white,
    fontFamily: 'Poppins-Light',
  },
  profile: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: 'Poppins_SemiBold',
  },
  para: {
    fontSize: 12,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  label: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    marginTop: 15,
    alignSelf: 'center',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Light',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: colors.lightPrimary,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});
