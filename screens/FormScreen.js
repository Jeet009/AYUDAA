import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import colors from '../constants/colors';
import {Thumbnail} from 'native-base';
import {Picker} from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DatePicker} from 'native-base';

import LoadingScreen from '../screens/LoadingScreen';

export default function FormScreen(props) {
  const [loading, setLoading] = useState();
  const [paymentMethod, setPaymentMethod] = useState('offline');
  const [serviceDate, setServiceDate] = useState();
  const [serviceTime, setServiceTime] = useState(new Date(1598051730000));
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [serviceAddress, setServiceAddress] = useState();
  const [pincode, setPincode] = useState();
  const [orderId, setOrderId] = useState();

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const onChange = (event, selectedDate) => {
    // console.log(new Date(selectedDate.toISOString()), event);
    setShow(Platform.OS === 'ios');
    setServiceTime(selectedDate);
  };

  //Pincode To Realtime Check
  const [pincodeArray, setPincodeArray] = useState([]);

  // Fetching Pincode Data
  useEffect(() => {
    const subscriber = firestore()
      .collection('availablePincode')
      .onSnapshot((querySnapshot) => {
        const data = [];

        querySnapshot.forEach((documentSnapshot) => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setPincodeArray(data);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [setPincodeArray]);

  var user = auth().currentUser;
  if (loading) {
    return <LoadingScreen />;
  }

  // Variable To Store Typed Pincode
  var pinCode;

  const handleChange = (e) => {
    if (e.nativeEvent.text.length == 6) {
      for (var i = 0; i < pincodeArray.length; i++) {
        if (pincodeArray[i].code == e.nativeEvent.text) {
          pinCode = pincodeArray[i].code;
        }
      }
      // console.log(pinCode, e.nativeEvent.text);
      if (!pinCode) {
        // e.nativeEvent.text.clear();

        Alert.alert(
          'We Are Not Here Yet!',
          'Sorry, Our service is not available in this area for now!',
          [
            {
              text: 'ok',
              onPress: () => {
                setPincode();
              },
            },
          ],
          {cancelable: false},
        );
      }
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>CONFIRM ADDRESS & ORDER</Text>
        <View style={styles.mainContainer}>
          <Thumbnail
            large
            square
            source={{uri: props.navigation.getParam('url')}}
            style={{
              borderColor: colors.primary,
              borderWidth: 1,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}>
            <Text style={styles.heading}>
              {' '}
              {props.navigation.getParam('name')}
            </Text>
            {/* RATE & PRICE  */}
            {(() => {
              if (props.navigation.getParam('rate')) {
                return (
                  <View style={styles.title}>
                    <Text style={styles.name}>
                      {' '}
                      PRICE : {props.navigation.getParam('rate')} /-
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View>
                    <View style={styles.title}>
                      <Text style={styles.name}>
                        RATE FOR REPAIR :{' '}
                        {props.navigation.getParam('rateForRepair')}
                      </Text>
                    </View>
                    <View style={styles.title}>
                      <Text style={styles.name}>
                        RATE FOR SERVICE :{' '}
                        {props.navigation.getParam('rateForService')}
                      </Text>
                    </View>
                  </View>
                );
              }
            })()}

            {/* CATEGORY  */}
            {(() => {
              switch (props.navigation.getParam('category')) {
                case '1':
                  return (
                    <View style={styles.title}>
                      <Text style={styles.name}> CATEGORY : HOME SERVICE </Text>
                    </View>
                  );

                case '2':
                  return (
                    <View style={styles.title}>
                      <Text style={styles.name}>
                        {' '}
                        CATEGORY : KITCHEN SERVICE{' '}
                      </Text>
                    </View>
                  );

                case '3':
                  return (
                    <View style={styles.title}>
                      <Text style={styles.name}>
                        {' '}
                        CATEGORY : LAUNDRY SERVICE{' '}
                      </Text>
                    </View>
                  );

                case '4':
                  return (
                    <View style={styles.title}>
                      <Text style={styles.name}>
                        {' '}
                        CATEGORY : SALOON AT HOME{' '}
                      </Text>
                    </View>
                  );

                default:
                  return (
                    <View style={styles.title}>
                      <Text style={styles.name}>
                        {' '}
                        CATEGORY : CATEGORY TYPE{' '}
                      </Text>
                    </View>
                  );
              }
            })()}
          </View>
          <Text style={styles.heading}>ADDRESS & DETAILS</Text>
          <View>
            <View style={styles.input}>
              <Text style={styles.para}>NAME</Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.textInput}
                maxLength={25}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.para}>PHONE</Text>
              <TextInput
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="phone-pad"
                style={styles.textInput}
                maxLength={10}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.para}>EMAIL</Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.textInput}
                maxLength={50}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.para}>SERVICE ADDRESS</Text>
              <TextInput
                value={serviceAddress}
                onChangeText={(text) => setServiceAddress(text)}
                style={styles.textInput}
                maxLength={50}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.para}>PIN NUMBER</Text>
              <TextInput
                value={pincode}
                onChangeText={(text) => setPincode(text)}
                style={styles.textInput}
                maxLength={25}
                keyboardType="phone-pad"
                onChange={handleChange}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.para}>SERVICE DATE & TIME</Text>
              <DatePicker
                defaultDate={new Date(Date.now())}
                minimumDate={new Date(Date.now())}
                maximumDate={new Date(2030, 12, 31)}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText="Choose Date"
                textStyle={{color: colors.ypsDark}}
                placeHolderTextStyle={{color: '#d3d3d3'}}
                disabled={false}
                value={serviceDate}
                selectedDate={serviceDate}
                onDateChange={(itemValue) => setServiceDate(itemValue)}
              />
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={showTimepicker}>
                  <Text style={styles.confirmButton}>Choose Time</Text>
                </TouchableOpacity>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={serviceTime}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            {/* PAYMENT METHODS  */}
            {(() => {
              if (props.navigation.getParam('rate')) {
                return (
                  <View style={styles.input}>
                    <Text style={styles.para}>PAYMENT METHODS</Text>
                    <Picker
                      selectedValue={paymentMethod}
                      onValueChange={(itemValue) =>
                        setPaymentMethod(itemValue)
                      }>
                      <Picker.Item label="OFFLINE PAYMENT" value="offline" />
                      <Picker.Item label="ONLINE PAYMENT" value="online" />
                    </Picker>
                  </View>
                );
              } else {
                return (
                  <View style={styles.input}>
                    <Text style={styles.para}>
                      PAYMENT METHODS - OFFLINE PAYMENT
                    </Text>
                    {/* <Picker
                            selectedValue={paymentMethod}
                            onValueChange={(itemValue) =>
                              setPaymentMethod(itemValue)
                            }>
                            <Picker.Item
                              label="OFFLINE PAYMENT"
                              value="offline"
                            />
                          </Picker> */}
                    <TextInput
                      // value={paymentMethod}
                      onChangeText={(text) => setPaymentMethod(text)}
                      editable={false}
                      selectTextOnFocus={false}
                      label={'OFFLINE PAYMENT'}
                    />
                  </View>
                );
              }
            })()}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (
                name &&
                email &&
                phone &&
                pincode &&
                serviceAddress &&
                serviceDate &&
                serviceTime &&
                paymentMethod
              ) {
                if (paymentMethod == 'online') {
                  setLoading(true);

                  firestore()
                    .collection('orders')
                    .add({
                      //SERVICE DETAILS
                      name: props.navigation.getParam('name'),
                      servicePhotoUrl: props.navigation.getParam('url'),
                      totalAmount: props.navigation.getParam('rate'),
                      rateForService: props.navigation.getParam(
                        'rateForService',
                      ),
                      rateForRepair: props.navigation.getParam('rateForRepair'),
                      category: props.navigation.getParam('category'),
                      desc: props.navigation.getParam('desc'),

                      //CUSTOMER DETAILS
                      customerId: user.uid,
                      customerName: name,
                      customerPhoneNumber: phone,
                      customerEmail: email,
                      customerServiceAddress: serviceAddress,
                      pinCode: pincode,
                      serviceDate: serviceDate,
                      serviceTime: serviceTime,
                      paymentMethod: paymentMethod,
                      paymentStatus: 'pending',

                      //ORDER DETAILS
                      status: 3,
                      technician: '',
                      technicianPhoto: '',
                      orderedAt: firestore.FieldValue.serverTimestamp(),
                    })
                    .then((data) => {
                      setOrderId(data.id);
                      var options = {
                        description: props.navigation.getParam('name'),
                        currency: 'INR',
                        key: 'rzp_test_kZbHjGLGpAAz0g',
                        amount: props.navigation.getParam('rate') + '00',
                        external: {
                          wallets: ['paytm'],
                        },
                        name: name,
                        prefill: {
                          email: email,
                          contact: phone,
                          name: name,
                        },
                      };

                      RazorpayCheckout.open(options)
                        .then((data) => {
                          setLoading(false);
                          props.navigation.navigate('Order Placed');
                          console.log(orderId);
                          // handle success
                          firestore().collection('orders').doc(orderId).update({
                            paymentStatus: 'completed',
                          });
                        })
                        .catch((error) => {
                          // handle failure
                          alert('Payment Failed, Try Later ');
                          console.log(error);
                        });
                      RazorpayCheckout.onExternalWalletSelection((data) => {
                        alert(
                          `External Wallet Selected: ${data.external_wallet} `,
                        );
                      });
                    })
                    // .then(() => {
                    //   props.navigation.navigate('Order Placed');
                    //   console.log(orderId);
                    //   // handle success
                    //   firestore().collection('orders').doc(orderId).update({
                    //     paymentStatus: 'completed',
                    //   });
                    // })

                    .catch((err) => console.log(err));
                } else {
                  setLoading(true);
                  firestore()
                    .collection('orders')
                    .add({
                      //SERVICE DETAILS
                      name: props.navigation.getParam('name'),
                      servicePhotoUrl: props.navigation.getParam('url'),
                      totalAmount: props.navigation.getParam('rate'),
                      rateForService: props.navigation.getParam(
                        'rateForService',
                      ),
                      rateForRepair: props.navigation.getParam('rateForRepair'),
                      category: props.navigation.getParam('category'),
                      desc: props.navigation.getParam('desc'),

                      //CUSTOMER DETAILS
                      customerId: user.uid,
                      customerName: name,
                      customerPhoneNumber: phone,
                      customerEmail: email,
                      customerServiceAddress: serviceAddress,
                      pinCode: pincode,
                      serviceDate: serviceDate,
                      serviceTime: serviceTime,
                      paymentMethod: paymentMethod,

                      //ORDER DETAILS
                      status: 3,
                      technician: '',
                      technicianPhoto: '',
                      orderedAt: firestore.FieldValue.serverTimestamp(),
                    })
                    .then(() => {
                      //console.log('User updated!');
                      props.navigation.navigate('Order Placed');
                    })
                    .catch((err) => console.log(err));
                }
              } else {
                Alert.alert('INVALID DATA.', 'FILL UP THE FORM PROPERLY');
              }
            }}>
            <Text style={styles.confirmButton}>CONFIRM ORDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 10,
    elevation: 10,
  },
  mainContainer: {
    padding: 10,
  },
  text: {
    alignSelf: 'center',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
  },
  confirmButton: {
    alignSelf: 'center',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
    // marginTop: 10,
  },
  heading: {
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 12,
    // fontWeight: `bold`,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  para: {
    fontSize: 12,
    textTransform: 'capitalize',
    // alignSelf: 'center',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  textInput: {
    borderColor: colors.ypsDark,
    borderWidth: 0,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 16,
    // fontWeight: 'bold',
    backgroundColor: colors.white,
    paddingLeft: 10,
  },
  input: {
    backgroundColor: colors.smoke,
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  title: {
    flex: 1,
    backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
