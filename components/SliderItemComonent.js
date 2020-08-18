import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  ScrollView,
  Image,
} from 'react-native';
import colors from '../constants/colors';

export default function SliderItemComponent(props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal animationType="fade" transparent={false} visible={modalVisible}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableHighlight
            style={{...styles.openButton, backgroundColor: colors.primary}}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.textStyle}>Exit</Text>
          </TouchableHighlight>
          <Text style={styles.textStyle}>Ayudaa Safe Service</Text>
          <View style={styles.centeredView}>
            <Text style={styles.modalText}>
              The outbreak of the Coronavirus remains a major disruption as we
              are going through this pandemic situation. Your safety is our
              priority. For that AYUDAA is there for you with the ‘Safe
              Service’. To prevent this extremely contagious disease COVID-19,
              we take few steps.{' '}
            </Text>
            <Image
              source={{
                uri: 'https://image.ayudaa.in/final/undraw_survey_05s5.png',
              }}
              resizeMode="contain"
              style={{
                height: 200,
                // maxHeight: 200,
              }}
            />
            <View style={styles.modalView}>
              <Text style={styles.modalTextWhite}>
                - The servicing associate will stand at your doorstep and call
                you or, ring the doorbell and maintain a 2 metre distance.
              </Text>
              <Text style={styles.modalTextWhite}>
                - Servicing associate will frequently use sanitizer.
              </Text>
              <Text style={styles.modalTextWhite}>
                - The service man will always carry sanitizer as a relevant tool
                in this situation.
              </Text>
              <Text style={styles.modalTextWhite}>
                - We provide them ‘use and throw mask’ to reduce the contagion
                risk of COVID-19.
              </Text>
              <Text style={styles.modalTextWhite}>
                - We are requesting to pay online as there is ‘no contact
                transaction’.
              </Text>
              <Text style={styles.modalTextWhite}>
                - We are using hand gloves and face shield to ensure total
                safety from COVID-19.
              </Text>
              <Text style={styles.modalTextWhite}>
                - For home Salon service we send beautician to your place with
                PPE.
              </Text>
            </View>
            <Text style={styles.modalText}>
              Your safety is our priority. For that AYUDAA is there for you with
              the ‘Safe Service’ and take another step to prevent COVID-19.
              AYUDAA has increased the frequency and intensity of cleaning at
              all sites, including regular sanitization of door handles and
              other frequently touched areas. Work stations are regularly
              cleaned and disinfected and everyone is advised to maintain a safe
              distance from each other.
            </Text>
            <Text style={styles.textStyle}>Your Home Service Assistance</Text>
          </View>
        </ScrollView>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <ImageBackground
          resizeMode="contain"
          imageStyle={{borderRadius: 5}}
          source={{uri: props.uri}}
          style={styles.Imgcontainer}></ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  Imgcontainer: {
    width: Dimensions.get('window').width / 2,
    height: Math.round((Dimensions.get('window').width * 9) / 16),
    maxHeight: Math.round((Dimensions.get('window').width * 9) / 16),
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 5,
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#2b2b2a',
  },
  openButton: {
    backgroundColor: colors.primary,
    // borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 20,
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
