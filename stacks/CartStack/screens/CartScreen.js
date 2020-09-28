import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import colors from '../../../constants/colors';
import {Icon} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
const data = [
  {
    key: '1',
    name: 'data name',
  },
  {
    key: '2',
    name: 'data name',
  },
];
export default function CartScreen() {
  function renderList() {
    return (
      <View style={styles.bottomSheet}>
        <View style={styles.service}>
          <View>
            <Text style={styles.name}>AC Service & Repairing</Text>
            <Text style={styles.para}>Price Per Single Item : 250000 /-</Text>
            <View style={styles.serviceDesc}>
              <Icon
                style={{
                  backgroundColor: colors.darkPrimary,
                  padding: 15,
                  borderRadius: 5,
                  marginRight: 20,
                }}
                name="minus"
                type="font-awesome"
                color={colors.ypsDark}
                size={15}
              />
              <Text
                style={{
                  backgroundColor: colors.white,
                  padding: 5,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 5,
                  fontFamily: 'Poppins-Bold',
                  elevation: 5,
                }}>
                1
              </Text>
              <Icon
                style={{
                  backgroundColor: colors.darkPrimary,
                  padding: 15,
                  borderRadius: 5,
                  marginLeft: 20,
                }}
                name="plus"
                type="font-awesome"
                color={colors.ypsDark}
                size={15}
              />
            </View>
          </View>
          <Icon
            style={{
              backgroundColor: colors.darkPrimary,
              padding: 15,
              borderRadius: 5,
            }}
            name="trash"
            type="font-awesome"
            color="red"
            size={30}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.heading}>What are you waiting for ?</Text>
        }
        renderItem={renderList}
        data={data}
        numColumns={1}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  bottomSheet: {
    padding: 20,
    backgroundColor: 'white',
  },
  container: {flex: 1, backgroundColor: 'white'},
  name: {
    fontFamily: 'Poppins-SemiBold',
  },
  para: {
    fontFamily: 'Poppins-Light',
  },
  service: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightPrimary,
    padding: 20,
    borderRadius: 15,
    elevation: 10,
  },

  serviceDesc: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    // color: colors.lightPrimary,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  heading: {
    // color: colors.lightPrimary,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
});
