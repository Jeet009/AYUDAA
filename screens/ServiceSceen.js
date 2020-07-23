import React from 'react';
import {View, Text} from 'react-native';

export default function ServiceSceen(props) {
  return (
    <View>
      <Text>{props.navigation.getParam('title')}</Text>
    </View>
  );
}
