/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {List, ListItem, Text, Left, Body, Right} from 'native-base';
import {View, StyleSheet, FlatList} from 'react-native';
import colors from '../constants/colors';
import {Icon} from 'react-native-elements';
import LoadingScreen from '../screens/LoadingScreen';

import firestore from '@react-native-firebase/firestore';

function RateCardScreen(props) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [data, setData] = useState([]); // Initial empty array of users
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('rateCard')
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
      .collection('rateCard')
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
      <View>
        <List style={styles.container}>
          <ListItem thumbnail>
            <Left>
              <Icon
                name="tasks"
                type="font-awesome"
                size={30}
                color={colors.primary}
                style={{
                  borderColor: colors.primary,
                  padding: 10,
                  backgroundColor: colors.ypsDark,
                  borderWidth: 1.5,
                  borderRadius: 5,
                }}
              />
            </Left>
            <Body>
              <View style={styles.title}>
                {/* <Text style={styles.heading}>AC SERVICE</Text> */}
                <Text style={styles.name}>Service Name : {item.name}</Text>
              </View>
              <View style={styles.title}>
                {/* <Text style={styles.name}>ORDER COUNT : {orderCount}</Text> */}
                <Text style={styles.name}>Rate : {item.rate} /-</Text>
              </View>
            </Body>
            <Right></Right>
          </ListItem>
        </List>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={<Text style={styles.text}>RATE CARD</Text>}
      renderItem={renderCategory}
      data={data.sort((a, b) => a.name.localeCompare(b.name))}
      onRefresh={() => onRefresh()}
      refreshing={refreshing}
    />
  );
}

export default RateCardScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  category: {
    backgroundColor: colors.white,
    margin: 5,
    padding: 10,
    borderRadius: 5,
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
    backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  container: {
    backgroundColor: colors.white,
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});
