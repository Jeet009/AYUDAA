/* eslint-disable prettier/prettier */
import React from 'react';
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
import {Icon} from 'react-native-elements';
function RateCardScreen(props) {
  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <Text style={styles.text}>RATE CARD</Text>
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
                  <Text style={styles.name}>Service Name : AC SERVICE</Text>
                </View>
                <View style={styles.title}>
                  {/* <Text style={styles.name}>ORDER COUNT : {orderCount}</Text> */}
                  <Text style={styles.name}>Rate : 1000 /-</Text>
                </View>
              </Body>
              <Right></Right>
            </ListItem>
          </List>
        </View>
      }
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
