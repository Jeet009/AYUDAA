import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import {
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  DatePicker,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FormScreen(props) {
  const [show, setShow] = useState(true);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>CONFIRM ADDRESS & ORDER</Text>
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
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                  }}>
                  <Text style={styles.heading}>
                    {' '}
                    {props.navigation.getParam('title')}
                  </Text>
                  <Text style={styles.name}> PRICE : 500 /-</Text>
                  <Text style={styles.name}> HOME SERVICE</Text>
                </View>
                <Text style={styles.heading}>ADDRESS & DETAILS</Text>
                <View>
                  <View style={styles.input}>
                    <Text style={styles.para}>NAME</Text>
                    <TextInput
                      style={styles.textInput}
                      textAlign="center"
                      maxLength={25}
                    />
                  </View>

                  <View style={styles.input}>
                    <Text style={styles.para}>PHONE</Text>
                    <TextInput
                      style={styles.textInput}
                      textAlign="center"
                      maxLength={25}
                    />
                  </View>

                  <View style={styles.input}>
                    <Text style={styles.para}>EMAIL</Text>
                    <TextInput
                      style={styles.textInput}
                      textAlign="center"
                      maxLength={25}
                    />
                  </View>

                  <View style={styles.input}>
                    <Text style={styles.para}>SERVICE ADDRESS</Text>
                    <TextInput
                      style={styles.textInput}
                      textAlign="center"
                      maxLength={25}
                    />
                  </View>

                  <View style={styles.input}>
                    <Text style={styles.para}>SERVICE DATE</Text>
                    <DatePicker
                      defaultDate={new Date(2018, 4, 4)}
                      minimumDate={new Date(2018, 1, 1)}
                      maximumDate={new Date(2018, 12, 31)}
                      locale={'en'}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={'fade'}
                      androidMode={'default'}
                      placeHolderText="Choose Date"
                      textStyle={{color: 'green'}}
                      placeHolderTextStyle={{color: '#d3d3d3'}}
                      disabled={false}
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.confirmButton}>CONFIRM ORDER</Text>
                </TouchableOpacity>
              </View>
            </Body>
            <Right></Right>
          </ListItem>
        </List>
      </View>
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
  confirmButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    // marginTop: 10,
  },
  heading: {
    fontWeight: 'bold',
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
    // alignSelf: 'center',
    fontWeight: 'bold',
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
  textInput: {
    borderColor: colors.ypsDark,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: colors.white,
  },
  input: {
    backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});