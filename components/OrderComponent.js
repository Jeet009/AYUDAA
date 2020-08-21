import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
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
      <View style={styles.category}>
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
          rateForService={item.rateForService}
          rateForRepair={item.rateForRepair}
          url={item.url}
          serviceDate={item.serviceDate}
          orderDate={item.orderedAt}
          status={item.status}
          technician={item.technician}
          technicianPhoto={item.technicianPhoto}
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
        <NullScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 2,
    marginTop: 10,
  },
  category: {
    backgroundColor: colors.white,
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
});
