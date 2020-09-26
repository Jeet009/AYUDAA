import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import Navigation from './routes/Navigation';
import NavigationService from './routes/NavigationService';
import LoginScreen from './screens/LoginScreen';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import colors from './constants/colors';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
      <View style={styles.button}>
        <TouchableOpacity>
          <Icon
            style={styles.text}
            name="shopping-bag"
            type="font-awesome"
            color={colors.ypsDark}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: colors.lightPrimary,
    padding: 10,
    elevation: 10,
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  text: {
    color: colors.ypsDark,
    textAlign: 'center',
  },
});
