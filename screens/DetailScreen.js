import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import {List, ListItem, Thumbnail, Left, Body, Right} from 'native-base';
import {Icon} from 'react-native-elements';
import SliderComponent from '../components/SliderComponent';

export default function DetailScreen(props) {
  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <View style={styles.container}>
            <Text style={styles.text}>ORDER DETAILS</Text>
            <List>
              <ListItem thumbnail>
                <Left></Left>
                <Body>
                  <View style={styles.mainContainer}>
                    <Thumbnail
                      large
                      square
                      source={{uri: props.navigation.getParam('uri')}}
                      style={{borderColor: colors.primary, borderWidth: 1}}
                    />
                    <View>
                      <Text style={styles.heading}>
                        {' '}
                        {props.navigation.getParam('title')}
                      </Text>
                      <Text style={styles.name}> PRICE : 500 /-</Text>
                      <Text style={styles.name}> HOME SERVICE</Text>
                    </View>
                    <View style={styles.title}>
                      <Text style={styles.para}>
                        What is Lorem Ipsum Lorem Ipsum is simply dummy text of
                        the printing and typesetting industry Lorem Ipsum has
                        been the industry's standard.
                      </Text>
                    </View>
                    <View style={styles.title}>
                      <Text style={styles.name}> Available Technician : 1</Text>
                      <Text style={styles.name}>
                        {' '}
                        ONLINE PAYMENT : Not Available
                      </Text>
                      <Text style={styles.name}>
                        {' '}
                        OFFLINE PAYMENT : Available
                      </Text>
                    </View>
                    <Text style={styles.text}>COMMUNITY & SUPPORT</Text>
                    <View style={styles.horizontal}>
                      <Icon
                        name="whatsapp"
                        type="font-awesome"
                        style={styles.circle}
                      />
                      <Icon
                        name="safari"
                        type="font-awesome"
                        style={styles.circle}
                      />
                      <Icon
                        name="facebook-official"
                        type="font-awesome"
                        style={styles.circle}
                      />
                      <Icon
                        name="phone-square"
                        type="font-awesome"
                        style={styles.circle}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        props.navigation.navigate('FormScreen', {
                          title: props.navigation.getParam('title'),
                          uri: props.navigation.getParam('uri'),
                        });
                      }}>
                      <Text style={styles.confirmButton}>PLACE ORDER</Text>
                    </TouchableOpacity>
                  </View>
                </Body>
                <Right></Right>
              </ListItem>
            </List>
          </View>
          <SliderComponent />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 20,
    borderRadius: 10,
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  confirmButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    // marginTop: 10,
  },
  heading: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    flex: 1,
    backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: `bold`,
    textTransform: 'uppercase',
  },
  para: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  circle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    padding: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
});
