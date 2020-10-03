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
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DatePicker} from 'native-base';
import hmacSHA256 from 'crypto-js/hmac-sha256';
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
  const [quantity, setQuantity] = useState(
    props.navigation.getParam('quantity'),
  );
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);

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

  //Fetching User Details
  var user = auth().currentUser;
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((userData) => {
          setName(userData.data().name);
          setPhone(userData.data().phone);
          setEmail(userData.data().email);
        });
    }
    return () => {
      unmounted = true;
    };
  });

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
    <ScrollView style={{backgroundColor: colors.primary}}>
      <View style={styles.container}>
        <Text style={styles.text}>CONFIRM ADDRESS & ORDER</Text>
        <View style={styles.mainContainer}>
          {props.navigation.getParam('cart_screen') && (
            <>
              <Text style={styles.heading}>Service List</Text>
              <View style={styles.title}>
                {props.navigation.getParam('name').map((data) => (
                  <Text style={styles.para}>{data}</Text>
                ))}
              </View>
              <View style={styles.title}>
                <Text style={styles.heading}>
                  Total Price : {props.navigation.getParam('rate')} /-
                </Text>
              </View>
            </>
          )}
          {props.navigation.getParam('detail_screen') && (
            <>
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
                <View style={styles.title}>
                  <Text style={styles.name}>
                    {' '}
                    PRICE : {props.navigation.getParam('rate')} /-
                  </Text>
                </View>

                {/* CATEGORY  */}
                <View style={styles.title}>
                  <Text style={styles.name}>
                    {' '}
                    CATEGORY : {props.navigation.getParam('category')}{' '}
                  </Text>
                </View>
              </View>
            </>
          )}
          {showPersonalInfo ? (
            <Text style={styles.heading}>PERSONAL DETAILS</Text>
          ) : (
            <Text style={styles.heading}>ADDRESS & PAYMENT</Text>
          )}
          <View>
            {showPersonalInfo && (
              <>
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
                    keyboardType="numeric"
                    style={styles.textInput}
                    maxLength={10}
                  />
                </View>

                <View style={styles.input}>
                  <Text style={styles.para}>Quantity</Text>
                  <TextInput
                    value={quantity}
                    onChangeText={(text) => setQuantity(text)}
                    keyboardType="phone-pad"
                    style={styles.textInput}
                    maxLength={2}
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
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setShowPersonalInfo(false);
                  }}>
                  <Text style={styles.confirmButton}>Continue</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          {!showPersonalInfo && (
            <>
              <View>
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
                    maxLength={6}
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
                          <Picker.Item
                            label="OFFLINE PAYMENT"
                            value="offline"
                          />
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
                    quantity &&
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
                          category: props.navigation.getParam('category'),
                          desc: props.navigation.getParam('desc'),

                          //CUSTOMER DETAILS
                          customerId: user.uid,
                          customerName: name,
                          customerPhoneNumber: phone,
                          customerEmail: email,
                          customerServiceAddress: serviceAddress,
                          pinCode: pincode,
                          quantity: quantity,
                          serviceDate: serviceDate,
                          serviceTime: serviceTime,
                          paymentMethod: paymentMethod,

                          //ORDER DETAILS
                          status: 3,
                          technician: '',
                          technicianPhoto: '',
                          orderedAt: firestore.FieldValue.serverTimestamp(),
                        })
                        .then((docRef) => {
                          fetch(`https://api.razorpay.com/v1/orders`, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization:
                                'Basic cnpwX2xpdmVfeU12SVpKYkdjZmJXMDg6dXBtOTNWTndOZjFiRDB2TG5wU01oRG9j',
                              Accept: 'application/json',
                            },
                            body: JSON.stringify({
                              amount: props.navigation.getParam('rate') * 100,
                              currency: 'INR',
                            }),
                            authorization: {
                              username: 'rzp_live_yMvIZJbGcfbW08',
                              password: 'upm93VNwNf1bD0vLnpSMhDoc',
                            },
                          })
                            .then((res) => res.json())
                            .then((order) => {
                              var options = {
                                description: props.navigation.getParam('name'),
                                currency: 'INR',
                                key: 'rzp_live_yMvIZJbGcfbW08',
                                order_id: order.id,
                                amount: order.amount,
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
                                  // handle success
                                  if (
                                    hmacSHA256(
                                      order.id + '|' + data.razorpay_payment_id,
                                      'upm93VNwNf1bD0vLnpSMhDoc',
                                    ) == data.razorpay_signature
                                  ) {
                                    setLoading(false);
                                    props.navigation.navigate('Order Placed');
                                    firestore()
                                      .collection('orders')
                                      .doc(docRef.id)
                                      .update({
                                        successfulPayment: true,
                                        razorpay_payment_id:
                                          data.razorpay_payment_id,
                                        razorpay_signature:
                                          data.razorpay_signature,
                                        razorpay_order_id:
                                          data.razorpay_order_id,
                                        amount_paid: order.amount_paid,
                                        amount_due: order.amount_due,
                                        status: order.status,
                                      });
                                  } else {
                                    setLoading(false);
                                    alert('Payment Unauthorized, Try Again ');
                                  }
                                })
                                .catch((error) => {
                                  // handle failure
                                  setLoading(false);
                                  alert('Payment Failed, Try Again ');
                                  console.log(error);
                                });
                              RazorpayCheckout.onExternalWalletSelection(
                                (data) => {
                                  setLoading(false);
                                  alert(
                                    `External Wallet Selected: ${data.external_wallet} `,
                                  );
                                },
                              );
                            })
                            .catch((err) => {
                              setLoading(false);
                              console.log(err);
                            });
                        })

                        .catch((err) => {
                          setLoading(false);
                          console.log(err);
                        });
                    } else {
                      setLoading(true);
                      firestore()
                        .collection('orders')
                        .add({
                          //SERVICE DETAILS
                          name: props.navigation.getParam('name'),
                          servicePhotoUrl: props.navigation.getParam('url'),
                          totalAmount: props.navigation.getParam('rate'),
                          category: props.navigation.getParam('category'),
                          desc: props.navigation.getParam('desc'),

                          //CUSTOMER DETAILS
                          customerId: user.uid,
                          customerName: name,
                          customerPhoneNumber: phone,
                          customerEmail: email,
                          customerServiceAddress: serviceAddress,
                          pinCode: pincode,
                          quantity: quantity,
                          serviceDate: serviceDate,
                          serviceTime: serviceTime,
                          paymentMethod: paymentMethod,
                          successfulPayment: false,

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
              <TouchableOpacity
                style={styles.buttonFloat}
                onPress={() => {
                  setShowPersonalInfo(true);
                }}>
                <Text style={styles.confirmButton}>Edit Personal Info</Text>
              </TouchableOpacity>
            </>
          )}
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
  buttonFloat: {
    backgroundColor: colors.smoke,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    position: 'absolute',
    top: 0,
    right: 10,
  },
  textInput: {
    borderColor: colors.ypsDark,
    borderWidth: 0,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 15,
    // fontWeight: 'bold',
    backgroundColor: colors.white,
    paddingLeft: 10,
    fontFamily: 'Poppins-Light',
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
