import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
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

export default function CategoryScreen(props) {
  function renderCategory(itemData) {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('DetailScreen', {
            title: itemData.item.text,
            uri: itemData.item.url,
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
                  source={{uri: itemData.item.url}}
                  style={{borderColor: colors.primary, borderWidth: 1}}
                />
                <View style={styles.title}>
                  <Text style={styles.text}> {itemData.item.text}</Text>
                  <Text style={styles.name}> PRICE : 500 /-</Text>
                  <Text style={styles.name}> HOME SERVICE</Text>
                </View>
              </View>
            </Body>
            <Right></Right>
          </ListItem>
        </List>
      </TouchableOpacity>
    );
  }
  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.topTitle}>
            {props.navigation.getParam('title') + ' ' + 'CATEGORY'}
          </Text>
        }
        renderItem={renderCategory}
        data={CATEGORY}
        numColumns={1}
      />
    </View>
  );
}

export const CATEGORY = [
  new Photo(
    'p1',
    'AC SERVICE & REPAIR',
    'https://image.ayudaa.in/asset/electrical.png',
  ),
  new Photo(
    'p2',
    'WASHING MACHINE SERVICE',
    'https://image.ayudaa.in/asset/appliance.png',
  ),
  new Photo(
    'p3',
    'HOME DEEP CLEANING',
    'https://image.ayudaa.in/asset/cleaning.png',
  ),
  new Photo(
    'p4',
    'WEDDING PLANNING',
    'https://image.ayudaa.in/asset/carpentry.png',
  ),
  new Photo(
    'p5',
    'PHOTOGRAPHY SERVICE',
    'https://image.ayudaa.in/asset/plumbery.png',
  ),
];
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
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
});
