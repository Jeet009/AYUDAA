// Importing Library
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';

//Importing Screen
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';

//Others
import colors from '../constants/colors';
import {Icon} from 'react-native-elements';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    headerMode: 'none',
  },
);
const AppContainer = createAppContainer(AppNavigator);
//Bottom Tab
const bottomTab = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: AppContainer,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Icon name="home" size={25} color={tabInfo.tintColor} />;
        },
      },
    },
    Orders: {
      screen: OrderScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Icon name="local-mall" size={25} color={tabInfo.tintColor} />;
        },
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Icon name="person-pin" size={25} color={tabInfo.tintColor} />;
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: colors.night,
    inactiveColor: colors.grey,
    barStyle: {backgroundColor: colors.white},
    labeled: false,
  },
);

export default createAppContainer(bottomTab);
