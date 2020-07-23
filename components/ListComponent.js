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
import {View, StyleSheet} from 'react-native';
import colors from '../constants/colors';
export default function ListComponent(props) {
  return (
    <List style={{marginTop: 15}}>
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            large
            square
            source={{uri: 'https://image.ayudaa.in/asset/electrical.png'}}
            style={{borderRadius: 5}}
          />
        </Left>
        <Body>
          <View style={styles.title}>
            <Text style={styles.text}>{props.title}</Text>
            <Text style={styles.para}>PRICE : 500 /-</Text>
          </View>
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
          <View style={styles.status}>
            <Text style={styles.verify}>SERVICE DATE :</Text>
            <Text style={styles.verify}>JUNE 29, 2020</Text>
          </View>
          <View style={styles.status}>
            <Text style={styles.currentStatus}>PENDING</Text>
            <Text style={styles.currentStatus}>CONFIRMED</Text>
            <Text style={styles.verify}>COMPLETED</Text>
          </View>
        </Body>
        <Right></Right>
      </ListItem>
    </List>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'bold',
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
    fontSize: 15,
    fontWeight: `bold`,
  },
  verify: {
    fontSize: 10,
    fontWeight: `bold`,
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
});
