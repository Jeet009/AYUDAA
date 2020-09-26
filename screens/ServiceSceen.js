import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import colors from '../constants/colors';

import LoadingScreen from '../screens/LoadingScreen';

import firestore from '@react-native-firebase/firestore';
import NullScreen from './NullScreen';
import {Icon} from 'react-native-elements';

export default function ServiceScreen(props) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [data, setData] = useState([]); // Initial empty array of users
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const subscriber = firestore()
      .collection('services')
      .where('subCategory', '==', props.navigation.getParam('dbName'))
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
      <View style={styles.container}>
        <LoadingScreen />
      </View>
    );
  }

  //Controlling Refresh
  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    const subscriber = firestore()
      .collection('services')
      .where('subCategory', '==', props.navigation.getParam('dbName'))
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
        setRefreshing(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  };
  function renderCategory({item}) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.overlayYellow}>
          <TouchableNativeFeedback
            onPress={() =>
              props.navigation.navigate('Confirm Your Booking', {
                dbName: item.db_name,
                url: item.url,
                name: item.name,
                rate: item.rate,
                rateForService: item.rateForService,
                rateForRepair: item.rateForRepair,
                category: item.category,
                desc: item.description,
              })
            }>
            <View style={styles.imageBg}>
              <Image
                resizeMode="cover"
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/ayuda-firebase.appspot.com/o/behind-toilet.jpg?alt=media&token=9b63f976-397a-475c-9293-2ecec92c71a3',
                }}
                style={styles.bgImage}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 6,
                }}>
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.para}>CATEGORY : {item.category} </Text>
                </View>
                <View>
                  <Text style={styles.name}>PRICE : {item.rate} /-</Text>
                  {item.inspectionRate && (
                    <Text style={styles.para}>+ On Inspection</Text>
                  )}
                </View>
              </View>
            </View>
          </TouchableNativeFeedback>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 6,
            }}>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={() =>
                props.navigation.navigate('Confirm Your Booking', {
                  dbName: item.db_name,
                  url: item.url,
                  name: item.name,
                  rate: item.rate,
                  rateForService: item.rateForService,
                  rateForRepair: item.rateForRepair,
                  category: item.category,
                  desc: item.description,
                })
              }>
              <Text style={styles.btnBlack}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.btnText}>Add To Cart</Text>
              <Icon
                name="shopping-bag"
                type="font-awesome"
                color="white"
                style={{fontFamily: 'Poppins-Light', marginLeft: 10}}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  if (data.length) {
    // console.log(data);
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.topTitle}>
              {props.navigation.getParam('title')}
            </Text>
          }
          renderItem={renderCategory}
          data={data.sort((a, b) => a.name.localeCompare(b.name))}
          numColumns={1}
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
        />
      </View>
    );
  } else {
    return <NullScreen />;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Regular',
  },
  topTitle: {
    fontSize: 15,
    alignSelf: 'center',
    margin: 2,
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  para: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  name: {
    fontSize: 15,
    // fontWeight: `bold`,
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontFamily: 'Poppins-Light',
    color: 'black',
    fontSize: 18,
    // alignSelf: 'flex-left',
    textAlign: 'left',
  },

  imageBg: {
    padding: 5,
    elevation: 5,
    backgroundColor: 'white',
    // borderRadius: 5,
    borderBottomWidth: 0.5,
    overflow: 'hidden',
  },
  bgImage: {
    flex: 1,
    height: 200,
    maxHeight: 200,
    borderBottomRightRadius: 20,
    borderRadius: 5,
    // margin: 2,
  },
  overlayYellow: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.lightPrimary,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 5,
    margin: 5,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.ypsDark,
    padding: 10,
    margin: 10,
    elevation: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.white,
  },
  btnText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  btnBlack: {
    color: colors.ypsDark,
    fontFamily: 'Poppins-SemiBold',
  },
  buttonPrimary: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    padding: 10,
    margin: 10,
    elevation: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.ypsDark,
  },
});
