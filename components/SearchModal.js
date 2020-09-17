import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Right, Body, List, ListItem} from 'native-base';
import {Icon} from 'react-native-elements';

const SearchModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
      <Modal
        style={styles.modalView}
        animationType="slide"
        visible={modalVisible}>
        <List style={styles.search}>
          <ListItem>
            <Body>
              <Text style={{fontFamily: 'Poppins-Light', fontSize: 15}}>
                Type Service Name
              </Text>
            </Body>
            <Right>
              <Icon
                name="close"
                type="font-awesome"
                color="grey"
                style={{fontFamily: 'Poppins-Light'}}
                size={20}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            </Right>
          </ListItem>
        </List>
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
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  search: {
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
});

export default SearchModal;
