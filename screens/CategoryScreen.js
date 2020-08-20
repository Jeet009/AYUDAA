import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import Photo from '../js/dummyData';
import {
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import LoadingScreen from '../screens/LoadingScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import NullScreen from './NullScreen';

export default function CategoryScreen(props) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [data, setData] = useState([]); // Initial empty array of users
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const subscriber = firestore()
      .collection('services')
      .where('category', '==', props.navigation.getParam('dbName'))
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
      .where('category', '==', props.navigation.getParam('dbName'))
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
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('DetailScreen', {
            name: item.name,
            url: 'https://image.ayudaa.in/asset/orderLogo.png',
            rate: item.rate,
            rateForService: item.rateForService,
            rateForRepair: item.rateForRepair,
            category: item.category,
            desc: item.description,
          })
        }>
        <List style={styles.container}>
          <ListItem thumbnail>
            <Left></Left>
            <Body>
              <View style={styles.mainContainer}>
                <Thumbnail
                  large
                  square
                  source={{uri: 'https://image.ayudaa.in/asset/orderLogo.png'}}
                  style={{
                    borderColor: colors.primary,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                />
                <View style={styles.title}>
                  <View style={styles.whiteContainer}>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>

                  {/* PRICE  */}
                  {(() => {
                    if (item.rate) {
                      return (
                        <View style={styles.whiteContainer}>
                          <Text style={styles.name}>
                            PRICE : {item.rate} /-
                          </Text>
                        </View>
                      );
                    } else {
                      return (
                        <View>
                          <View style={styles.whiteContainer}>
                            <Text style={styles.name}>
                              RATE FOR REPAIR : {item.rateForRepair}
                            </Text>
                          </View>
                          <View style={styles.whiteContainer}>
                            <Text style={styles.name}>
                              RATE FOR SERVICE : {item.rateForService}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                  })()}
                  <View style={styles.whiteContainer}>
                    <Text style={styles.name}>
                      {' '}
                      {props.navigation.getParam('title') + ' ' + 'SERVICE'}
                    </Text>
                  </View>
                </View>
              </View>
            </Body>
            <Right></Right>
          </ListItem>
        </List>
      </TouchableOpacity>
    );
  }
  if (data.length) {
    return (
      <View>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.topTitle}>
              {props.navigation.getParam('title') + ' ' + 'SERVICE'}
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

// export const CATEGORY = [
//   new Photo(
//     'p1',
//     'AC SERVICE & REPAIR',
//     'https://image.ayudaa.in/asset/electrical.png',
//   ),
//   new Photo(
//     'p2',
//     'WASHING MACHINE SERVICE',
//     'https://image.ayudaa.in/asset/appliance.png',
//   ),
//   new Photo(
//     'p3',
//     'HOME DEEP CLEANING',
//     'https://image.ayudaa.in/asset/cleaning.png',
//   ),
//   new Photo(
//     'p4',
//     'WEDDING PLANNING',
//     'https://image.ayudaa.in/asset/carpentry.png',
//   ),
//   new Photo(
//     'p5',
//     'PHOTOGRAPHY SERVICE',
//     'https://image.ayudaa.in/asset/plumbery.png',
//   ),
// ];
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    // margin: 2,
    // marginTop: 10,
  },
  whiteContainer: {
    margin: 10,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  topTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 2,
    marginTop: 10,
  },
  para: {
    fontSize: 15,
    fontWeight: `100`,
  },
  name: {
    fontSize: 12,
    fontWeight: `bold`,
    textTransform: 'uppercase',
  },
  title: {
    flex: 1,
    backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});
