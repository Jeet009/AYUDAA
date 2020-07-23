import React from 'react';
import {View, Text} from 'react-native';
export default function CategoryScreen(props) {
  return (
    <View>
      <Text>{props.navigation.getParam('title') + ' ' + 'CATEGORY'}</Text>
    </View>
  );
}
