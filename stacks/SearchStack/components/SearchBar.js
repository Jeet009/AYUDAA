import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View, Linking} from 'react-native';
import {Right, Body, List, ListItem, Item, Input, Left} from 'native-base';
import {Icon} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

function SearchBar({navigation}) {
  const [searchText, setSearchText] = useState('Search Services ...');

  let searchArray = [
    'Find Services ...',
    'Ayudaa Services ...',
    'Looking For Something Else ...',
  ];

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      setTimeout(() => {
        let newCount = Math.floor(Math.random() * 4);
        if (newCount <= 2) {
          setSearchText(searchArray[newCount]);
        } else {
          setSearchText('Search Services ...');
        }
      }, 10000);
    }

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <View style={styles.centeredView}>
      <List>
        <ListItem
          onPress={() => {
            navigation.navigate('Search Services');
          }}>
          <Icon
            onPress={() => {
              Linking.openURL('https://wa.me/919832358173');
            }}
            name="whatsapp"
            type="font-awesome"
            color="black"
            style={{fontFamily: 'Poppins-Light'}}
            size={20}
          />
          <Body>
            <Text
              style={{
                fontFamily: 'Poppins-Light',
                fontSize: 15,
                marginLeft: 15,
                marginTop: 2,
              }}>
              {searchText}
            </Text>
          </Body>
          <Right>
            <Icon
              name="search"
              type="font-awesome"
              color="grey"
              style={{fontFamily: 'Poppins-Light'}}
              size={20}
            />
          </Right>
        </ListItem>
      </List>
    </View>
  );
}

export default withNavigation(SearchBar);
const styles = StyleSheet.create({
  centeredView: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    elevation: 10,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 10,
  },
  search: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    elevation: 10,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  para: {
    fontFamily: 'Poppins-Light',
    margin: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
});
