import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import colors from '../constants/colors';

export default function PopUpComponent({name, color, icon}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.darkPrimary,
        position: 'absolute',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
        top: 10,
        right: 10,
      }}>
      <Icon
        name={icon}
        type="font-awesome"
        color="white"
        style={{
          fontFamily: 'Poppins-Light',
          marginRight: 10,
          marginLeft: 10,
        }}
        size={20}
      />
      <Text style={styles.btnText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
});
