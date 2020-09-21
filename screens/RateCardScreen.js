/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {List, ListItem, Text, Left, Body, Right} from 'native-base';
import {View, StyleSheet, FlatList} from 'react-native';
import colors from '../constants/colors';
import {Icon} from 'react-native-elements';
import LoadingScreen from '../screens/LoadingScreen';

import firestore from '@react-native-firebase/firestore';
import HeaderComponent from '../components/HeaderComponent';

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
    <>
      <HeaderComponent />
      <View style={styles.bg}>
        <FlatList
          ListHeaderComponent={<Text style={styles.text}>RATE CARD</Text>}
          renderItem={renderCategory}
          data={data.sort((a, b) => a.name.localeCompare(b.name))}
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
        />
      </View>
    </>
  );
}

export default RateCardScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  name: {
    fontSize: 15,
    // fontWeight: `bold`,
    // textTransform: 'uppercase',
    fontFamily: 'Poppins-Regular',
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
  bg: {
    flex: 1,
    backgroundColor: colors.lightPrimary,
  },
});
