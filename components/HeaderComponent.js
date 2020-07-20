import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {Header, Right, Body} from 'native-base';
import {Icon} from 'react-native-elements';

export default function HeaderComponent() {
  return (
    <Header transparent hasSegment>
      <Body>
        <Text style={styles.text}>A Y U D A A</Text>
      </Body>
      <Right style={styles.thumbnail}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://wa.me/919832358173');
          }}>
          <Icon name="whatsapp" type="font-awesome" color="black" />
        </TouchableOpacity>
      </Right>
    </Header>
  );
}

const styles = StyleSheet.create({
  iconColor: {
    color: 'black',
  },
  iconHeader: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  thumbnail: {
    flex: 1,
  },
});
