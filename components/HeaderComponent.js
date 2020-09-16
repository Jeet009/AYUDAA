import React from 'react';
import {StyleSheet, TouchableOpacity, Linking, View} from 'react-native';
import {Header, Right, Body} from 'native-base';
import {Icon} from 'react-native-elements';
import Text from './MyText';
import LinearGradient from 'react-native-linear-gradient';

export default function HeaderComponent() {
  return (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#ffffba', '#ffff8d']}>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 5,
  },
  iconColor: {
    color: 'black',
  },
  iconHeader: {
    flex: 1,
  },
  text: {
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  thumbnail: {
    flex: 1,
  },
});
