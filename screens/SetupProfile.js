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
} from 'react-native';
import {TouchableNativeFeedback, TextInput} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function SetUpProfile(props) {
  //   console.log(props);
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [submitButtonText, setSubmitButtonText] = useState('SETUP');

  const [name, setName] = useState('');
  const [ayudaaId, setAyudaaId] = useState('');
  const [phoneno, setPhoneno] = useState('');

  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function confirmProfile() {
    if (!name || !ayudaaId) {
      Alert.alert('INVALID.', 'ENTER A VALID INPUT');
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
            props.navigation.navigate('SuccessProfile');
          })
          .catch((err) => {
            console.log(err);
            setSubmitButtonText('TRY AGAIN');
          });
      } catch (error) {
        Alert.alert('INVALID CODE.', 'ENTER A VALID OTP');
      }
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.scrollview}>
        <View style={styles.profile}>
          <Text style={styles.text}>A Y U D A A</Text>
          <Text style={styles.para}>SET UP YOUR PROFILE.</Text>
        </View>
        <View>
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

          <View style={styles.input}>
            <Text style={styles.label}>ENTER EMAIL ID</Text>
            <TextInput
              value={ayudaaId}
              style={styles.textInput}
              textAlign="center"
              maxLength={30}
              onChangeText={(text) => setAyudaaId(text)}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.label}>CONFIRM PHONE NUMBER</Text>
            <TextInput
              value={phoneno}
              style={styles.textInput}
              textAlign="center"
              maxLength={10}
              onChangeText={(text) => setPhoneno(text)}
            />
          </View>

          {/* <Button title="Confirm Code" onPress={() => confirmCode()} /> */}
          <TouchableOpacity // eslint-disable-next-line prettier/prettier
            style={styles.button}
            onPress={() => {
              setSubmitButtonText('MAKING...');
              confirmProfile().then(() => {
                // Alert.alert(
                //   'Success',
                //   'You have successfully initialized your account. Please Restart The App.',
                // ),
                setSubmitButtonText('INITIALIZED');
              });
            }}>
            <Text style={styles.buttonText}>{submitButtonText}</Text>
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
  label: {fontSize: 12, fontWeight: 'bold'},
  input: {
    backgroundColor: colors.smoke,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});
