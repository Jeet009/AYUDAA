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
                      source={{uri: props.navigation.getParam('url')}}
                      style={{borderColor: colors.primary, borderWidth: 1}}
                    />
                    <View>
                      <Text style={styles.heading}>
                        {' '}
                        {props.navigation.getParam('name')}
                      </Text>
                      {/* RATE & PRICE  */}
                      {(() => {
                        if (props.navigation.getParam('rate')) {
                          return (
                            <View style={styles.title}>
                              <Text style={styles.name}>
                                PRICE : {props.navigation.getParam('rate')} /-
                              </Text>
                            </View>
                          );
                        } else {
                          return (
                            <View>
                              <View style={styles.title}>
                                <Text style={styles.name}>
                                  RATE FOR REPAIR :{' '}
                                  {props.navigation.getParam('rateForRepair')}
                                </Text>
                              </View>
                              <View style={styles.title}>
                                <Text style={styles.name}>
                                  RATE FOR SERVICE :{' '}
                                  {props.navigation.getParam('rateForService')}
                                </Text>
                              </View>
                            </View>
                          );
                        }
                      })()}
                      {/* CATEGORY  */}
                      {(() => {
                        switch (props.navigation.getParam('category')) {
                          case '1':
                            return (
                              <View style={styles.title}>
                                <Text style={styles.name}>
                                  CATEGORY : HOME SERVICE{' '}
                                </Text>
                              </View>
                            );

                          case '2':
                            return (
                              <View style={styles.title}>
                                <Text style={styles.name}>
                                  CATEGORY : KITCHEN SERVICE{' '}
                                </Text>
                              </View>
                            );

                          case '3':
                            return (
                              <View style={styles.title}>
                                <Text style={styles.name}>
                                  CATEGORY : LAUNDRY SERVICE{' '}
                                </Text>
                              </View>
                            );

                          case '4':
                            return (
                              <View style={styles.title}>
                                <Text style={styles.name}>
                                  CATEGORY : SALOON AT HOME{' '}
                                </Text>
                              </View>
                            );

                          default:
                            return (
                              <View style={styles.title}>
                                <Text style={styles.name}>
                                  CATEGORY : CATEGORY TYPE{' '}
                                </Text>
                              </View>
                            );
                        }
                      })()}
                    </View>
                    {/* Description  */}
                    <View style={styles.title}>
                      <Text style={styles.para}>
                        {props.navigation.getParam('desc')}
                      </Text>
                    </View>
                    {/* PAYMENT TYPE  */}
                    {(() => {
                      if (props.navigation.getParam('rate')) {
                        return (
                          <View style={styles.title}>
                            {/* <Text style={styles.name}> Available Technician : 1</Text> */}
                            <Text style={styles.name}>
                              {' '}
                              ONLINE PAYMENT : Available
                            </Text>
                            <Text style={styles.name}>
                              {' '}
                              OFFLINE PAYMENT : Available
                            </Text>
                          </View>
                        );
                      } else {
                        return (
                          <View style={styles.title}>
                            {/* <Text style={styles.name}> Available Technician : 1</Text> */}
                            <Text style={styles.name}>
                              {' '}
                              ONLINE PAYMENT : Not Available
                            </Text>
                            <Text style={styles.name}>
                              {' '}
                              OFFLINE PAYMENT : Available
                            </Text>
                          </View>
                        );
                      }
                    })()}

                    {/* OTHERS  */}
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
                          name: props.navigation.getParam('name'),
                          url: props.navigation.getParam('url'),
                          rate: props.navigation.getParam('rate'),
                          rateForService: props.navigation.getParam(
                            'rateForService',
                          ),
                          rateForRepair: props.navigation.getParam(
                            'rateForRepair',
                          ),
                          category: props.navigation.getParam('category'),
                          desc: props.navigation.getParam('desc'),
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
    textTransform: 'uppercase',
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
