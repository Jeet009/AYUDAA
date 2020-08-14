import React, {useState, useEffect} from 'react';
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

export default function ServiceScreen(props) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [data, setData] = useState([]); // Initial empty array of users
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const subscriber = firestore()
      .collection(props.navigation.getParam('dbName'))
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
  }, [data]);
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
      .collection(props.navigation.getParam('dbName'))
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
            url: item.url,
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
                  source={{uri: item.url}}
                  style={{
                    borderColor: colors.primary,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                />
                <View style={styles.title}>
                  <View style={styles.whiteContainer}>
                    <Text style={styles.text}>{item.name} </Text>
                  </View>

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

                  {(() => {
                    switch (item.category) {
                      case '1':
                        return (
                          <View style={styles.whiteContainer}>
                            <Text style={styles.name}>HOME SERVICE </Text>
                          </View>
                        );

                      case '2':
                        return (
                          <View style={styles.whiteContainer}>
                            <Text style={styles.name}>KITCHEN SERVICE </Text>
                          </View>
                        );

                      case '3':
                        return (
                          <View style={styles.whiteContainer}>
                            <Text style={styles.name}>LAUNDRY SERVICE </Text>
                          </View>
                        );

                      case '4':
                        return (
                          <View style={styles.whiteContainer}>
                            <Text style={styles.name}>SALOON AT HOME </Text>
                          </View>
                        );

                      default:
                        return (
                          <View style={styles.whiteContainer}>
                            <Text style={styles.name}>CATEGORY TYPE </Text>
                          </View>
                        );
                    }
                  })()}
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
    // console.log(data);
    return (
      <View>
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
  whiteContainer: {
    margin: 10,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
});
