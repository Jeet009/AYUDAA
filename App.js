import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Navigation from './routes/Navigation';
import NavigationService from './routes/NavigationService';
import LoginScreen from './screens/LoginScreen';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    SplashScreen.hide();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (initializing) return null;

  if (!user) {
    //setLoading(true);
    return <LoginScreen />;
  }

  if (!user.displayName) {
    return <NavigationService />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
