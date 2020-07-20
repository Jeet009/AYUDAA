import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import Navigation from './routes/Navigation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent />
      <Navigation />
      <StatusBar barStyle="dark-content" hidden={true} backgroundColor="#fff" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
