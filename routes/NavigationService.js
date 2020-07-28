// Importing Library
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//Importing Screen
import SetupProfile from '../screens/SetupProfile';
import App from '../App';

const AppNavigator = createStackNavigator(
  {
    SetupProfile: SetupProfile,
    App: App,
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
