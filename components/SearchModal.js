import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View, Alert} from 'react-native';
import {Right, Body, List, ListItem, Item, Input} from 'native-base';
import {Icon} from 'react-native-elements';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import SearchResultComponent from './SearchResultComponent';
import firestore from '@react-native-firebase/firestore';

const SearchModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('Search Services ...');
  const [searchFor, setSearchFor] = useState();
  const [searchResult, setSearchResult] = useState([]);

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

  const handleSearchInput = (e) => {
    setSearchFor(e.nativeEvent.text);
  };
  const handleSubmit = () => {
    let typedValue = searchFor.toString().toLowerCase();
    // console.log(typedValue);
    if (searchFor) {
      firestore()
        .collection('services')
        .where('serviceName', '==', typedValue)
        .onSnapshot((querySnapshot) => {
          const data = [];

          querySnapshot.forEach((documentSnapshot) => {
            data.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          data.length > 0
            ? setSearchResult(data)
            : Alert.alert('Sorry!', 'Nothing Found');
        });
    } else {
      alert('ENTER VALID INPUT');
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        style={styles.modalView}
        animationType="slide"
        visible={modalVisible}>
        <View style={{flex: 1}}>
          <View style={styles.search}>
            <Item style={{borderBottomWidth: 0}}>
              <Icon
                name="arrow-left"
                type="font-awesome"
                color="grey"
                style={{fontFamily: 'Poppins-Light'}}
                // size={20}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <Input
                placeholder="Type Service Name"
                style={{
                  fontFamily: 'Poppins-Light',
                  fontSize: 15,
                  marginTop: 5,
                  marginLeft: 10,
                }}
                onChange={handleSearchInput}
              />
              <Icon
                name="search"
                type="font-awesome"
                color="grey"
                style={{fontFamily: 'Poppins-Light'}}
                size={20}
                onPress={
                  // setModalVisible(false);
                  handleSubmit
                }
              />
            </Item>
          </View>
          <SearchResultComponent result={searchResult} />
        </View>
      </Modal>

      <List>
        <ListItem
          onPress={() => {
            setModalVisible(true);
          }}>
          <Body>
            <Text style={{fontFamily: 'Poppins-Light', fontSize: 15}}>
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
};

const styles = StyleSheet.create({
  centeredView: {
    paddingLeft: 15,
    paddingRight: 15,
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

export default SearchModal;
