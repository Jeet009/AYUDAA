import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import {
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  Row,
} from 'native-base';

export default function DetailScreen(props) {
  return (
    <ScrollView style={styles.container}>
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
                  What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry Lorem Ipsum has been the
                  industry's standard.
                </Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.name}> Available Technician : 1</Text>
                <Text style={styles.name}> ONLINE PAYMENT : Not Available</Text>
                <Text style={styles.name}> OFFLINE PAYMENT : Available</Text>
              </View>
              <View style={styles.horizontal}>
                <Thumbnail
                  large
                  source={{
                    uri:
                      'https://scontent.fccu16-1.fna.fbcdn.net/v/t1.0-9/s960x960/96562921_111788813865374_7375178138289963008_o.jpg?_nc_cat=105&_nc_sid=85a577&_nc_ohc=H2Bu_Z8OMiUAX8U4MmC&_nc_ht=scontent.fccu16-1.fna&_nc_tp=7&oh=7744e3a84f81ca878440dd57254f148d&oe=5F2E40D2',
                  }}
                  style={{borderColor: colors.primary, borderWidth: 1}}
                />
              </View>
            </View>
          </Body>
          <Right></Right>
        </ListItem>
      </List>
    </ScrollView>
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
    justifyContent: 'space-between',
    backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
