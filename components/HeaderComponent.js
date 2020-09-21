import React from 'react';
import {StyleSheet, TouchableOpacity, Linking, StatusBar} from 'react-native';
import {Header, Right, Body} from 'native-base';
import {Icon} from 'react-native-elements';
import SearchBar from '../stacks/SearchStack/components/SearchBar';
import LinearGradient from 'react-native-linear-gradient';

export default function HeaderComponent() {
  return (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#ffffba', '#ffff8d']}>
      <SearchBar />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffba" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
