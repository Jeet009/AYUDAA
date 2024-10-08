import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
  View,
  Alert,
} from 'react-native';
import Photo from '../js/dummyData';
import {Container} from 'native-base';
import colors from '../constants/colors';
import ListComponent from './ListComponent';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LoadingScreen from '../screens/LoadingScreen';
import NullScreen from '../screens/NullScreen';

export default function OrderComponent(props) {
  // Fetching Data
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); // Initial empty array of users

  var user = auth().currentUser;

  useEffect(() => {
    const subscriber = firestore()
      .collection('orders')
      .where('customerId', '==', user.uid)
      .onSnapshot((querySnapshot) => {
        const data = [];

        querySnapshot.forEach((documentSnapshot) => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setData(data);
        // console.log(data);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [setData]);

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: colors.white,
          height: Dimensions.get('window').height / 1.5,
          margin: 10,
          elevation: 5,
        }}>
        <LoadingScreen />
      </View>
    );
  }

  //Controlling Refresh

  function renderCategory({item}) {
    return (
      <View style={styles.category}>
        <ListComponent
          id={item.key}
          title={item.name}
          rate={item.totalAmount}
          paymentMethod={item.paymentMethod}
          successfulPayment={item.successfulPayment}
          url={item.url}
          serviceDate={item.serviceDate}
          orderDate={item.orderedAt}
          status={item.status}
          technician={item.technician}
          technicianPhoto={item.technicianPhoto}
          pinCode={item.pinCode}
          address={item.customerServiceAddress}
        />
      </View>
    );
  }

  if (data.length) {
    return (
      <View>
        <FlatList
          ListHeaderComponent={<Text style={styles.text}>YOUR ORDERS</Text>}
          renderItem={renderCategory}
          data={data.sort((a, b) => a.name.localeCompare(b.name))}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.category}>
        <Text style={styles.text}>YOUR ORDERS</Text>
        <View
          style={{
            backgroundColor: colors.white,
            height: Dimensions.get('window').height / 1.5,
            margin: 10,
          }}>
          <NullScreen />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'center',
    margin: 2,
    marginTop: 10,
  },
  category: {
    backgroundColor: colors.white,
    elevation: 5,
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
});
