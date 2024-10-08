import React, {Component, useEffect, useState} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import {View, StyleSheet, FlatList} from 'react-native';
import colors from '../constants/colors';
import ServiceComponent from '../components/ServiceComponent';
import SliderComponent from '../components/SliderComponent';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function ProfileScreen(props) {
  const [name, setName] = useState('Your Name');
  const [phoneNo, setPhoneNo] = useState('Your Phone Number');
  const [email, setEmail] = useState('Your Email');
  // const [orderCount, setOrderCount] = useState();

  var user = auth().currentUser;
  firestore()
    .collection('users')
    .doc(user.uid)
    .onSnapshot((doc) => {
      setName(doc.data().name);
      setPhoneNo(doc.data().phone);
      setEmail(doc.data().email);
    });

  return (
    <View style={styles.bg}>
      <FlatList
        style={{marginTop: 15, flex: 1}}
        ListHeaderComponent={
          <View>
            <List style={styles.container}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail
                    large
                    source={{
                      uri: 'https://image.ayudaa.in/asset/profilePhoto.png',
                    }}
                    style={{borderColor: colors.primary, borderWidth: 1.5}}
                  />
                </Left>
                <Body>
                  <View style={styles.title}>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.name}>Phone : {phoneNo}</Text>
                  </View>
                  <View style={styles.title}>
                    {/* <Text style={styles.name}>ORDER COUNT : {orderCount}</Text> */}
                    <Text style={styles.name}>Email : {email}</Text>
                  </View>
                </Body>
                <Right></Right>
              </ListItem>
            </List>
          </View>
        }
        ListFooterComponent={
          <View>
            <ServiceComponent />
            <SliderComponent />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    // fontWeight: 'bold',

    fontFamily: 'Poppins-Regular',
    textTransform: 'uppercase',
  },
  category: {
    backgroundColor: colors.white,
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },

  name: {
    fontSize: 12,
    // fontWeight: `bold`,
    fontFamily: 'Poppins-Light',
    // textTransform: 'uppercase',
  },
  title: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  container: {
    // backgroundColor: colors.white,
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  bg: {
    flex: 1,
    backgroundColor: colors.lightPrimary,
  },
});
