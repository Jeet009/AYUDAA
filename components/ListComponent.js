import React, {Component} from 'react';
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
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import colors from '../constants/colors';
// import {} from 'react-native';
import {withNavigation} from 'react-navigation';

function ListComponent(props) {
  return (
    <List style={{marginTop: 15}}>
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            large
            square
            source={{uri: 'https://image.ayudaa.in/asset/orderLogo.png'}}
            style={{borderRadius: 5}}
          />
        </Left>
        <Body>
          <View style={styles.title}>
            <Text style={styles.text}>{props.title}</Text>
            {/* RATE & PRICE  */}
            {(() => {
              if (props.rate) {
                return <Text style={styles.para}>PRICE : {props.rate} /-</Text>;
              } else {
                return (
                  <View>
                    <View style={styles.title}>
                      <Text style={styles.name}>
                        RATE FOR REPAIR : {props.rateForRepair}
                      </Text>
                    </View>
                    <View style={styles.title}>
                      <Text style={styles.name}>
                        RATE FOR SERVICE : {props.rateForService}
                      </Text>
                    </View>
                  </View>
                );
              }
            })()}
          </View>

          {/* TECHNICIAN  */}
          {(() => {
            if (props.technician) {
              return (
                <View style={styles.technician}>
                  <Thumbnail
                    small
                    source={{
                      uri:
                        'https://scontent.fccu16-1.fna.fbcdn.net/v/t1.0-9/s960x960/96562921_111788813865374_7375178138289963008_o.jpg?_nc_cat=105&_nc_sid=85a577&_nc_ohc=H2Bu_Z8OMiUAX8U4MmC&_nc_ht=scontent.fccu16-1.fna&_nc_tp=7&oh=7744e3a84f81ca878440dd57254f148d&oe=5F2E40D2',
                    }}
                  />
                  <View>
                    <Text style={styles.name}> {'  '}Jeet Mukherjee</Text>
                    <Text style={styles.verify}> {'   '}VERIFIED</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.technician}>
                  {/* <Thumbnail
                    small
                    source={{
                      uri:
                        'https://scontent.fccu16-1.fna.fbcdn.net/v/t1.0-9/s960x960/96562921_111788813865374_7375178138289963008_o.jpg?_nc_cat=105&_nc_sid=85a577&_nc_ohc=H2Bu_Z8OMiUAX8U4MmC&_nc_ht=scontent.fccu16-1.fna&_nc_tp=7&oh=7744e3a84f81ca878440dd57254f148d&oe=5F2E40D2',
                    }}
                  /> */}
                  <View>
                    <Text style={styles.name}> TECHNICIAN</Text>
                    <Text style={styles.verify}> NOT ASSIGNED YET</Text>
                  </View>
                </View>
              );
            }
          })()}

          <View style={styles.status}>
            <Text style={styles.verify}>SERVICE DATE :</Text>
            <Text style={styles.verify}>
              {props.serviceDate.toDate().toDateString()}
            </Text>
          </View>

          {/* <View style={styles.status}>
            <Text style={styles.verify}>ORDER PLACED AT :</Text>
            <Text style={styles.verify}>
              {props.orderDate.toDate().toDateString()}
            </Text>
          </View> */}

          {/* ORDER STATUS  */}
          {(() => {
            if (props.status == 0) {
              return (
                <View style={styles.status}>
                  <Text style={styles.cancel}>ORDER CANCELED BY YOU</Text>
                </View>
              );
            } else if (props.status <= 3) {
              return (
                <View style={styles.status}>
                  <Text style={styles.currentStatus}>PENDING</Text>
                  <Text style={styles.verify}>CONFIRMED</Text>
                  <Text style={styles.verify}>COMPLETED</Text>
                </View>
              );
            } else if (props.status == 4) {
              return (
                <View style={styles.status}>
                  <Text style={styles.currentStatus}>PENDING</Text>
                  <Text style={styles.currentStatus}>CONFIRMED</Text>
                  <Text style={styles.verify}>COMPLETED</Text>
                </View>
              );
            } else if (props.status == 5 || props.status >= 5) {
              return (
                <View style={styles.status}>
                  <Text style={styles.currentStatus}>PENDING</Text>
                  <Text style={styles.currentStatus}>CONFIRMED</Text>
                  <Text style={styles.currentStatus}>COMPLETED</Text>
                </View>
              );
            }
          })()}

          {/* Cancel Button  */}
          {(() => {
            if (props.status != 0) {
              return (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    props.navigation.navigate('ConfirmCancelScreen', {
                      id: props.id,
                    });
                  }}>
                  <Text style={styles.cancel}>CANCEL</Text>
                </TouchableOpacity>
              );
            }
          })()}
        </Body>
        <Right></Right>
      </ListItem>
    </List>
  );
}

export default withNavigation(ListComponent);
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
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
  verify: {
    fontSize: 10,
    fontWeight: `bold`,
    textTransform: 'uppercase',
  },
  technician: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
  },
  status: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  title: {
    flex: 1,
    backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  currentStatus: {
    fontSize: 10,
    fontWeight: `bold`,
    color: 'lightgreen',
  },
  cancel: {
    fontSize: 12,
    fontWeight: `bold`,
    color: 'black',
    alignSelf: 'center',
  },
});
