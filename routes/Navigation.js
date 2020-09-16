// Importing Library
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';

//Importing Screen
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ServiceScreen from '../screens/ServiceSceen';
//Others
import colors from '../constants/colors';
import {Icon} from 'react-native-elements';
import CategoryComponent from '../components/CategoryComponent';
import DetailScreen from '../screens/DetailScreen';
import FormScreen from '../screens/FormScreen';
import SuccessOrder from '../screens/SuccessOrder';
import RateCardScreen from '../screens/RateCardScreen';
import ConfirmCancelScreen from '../screens/ConfirmCancelScreen';
import CanceledScreen from '../screens/CanceledScreen';

//Home Screen
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    CategoryScreen: CategoryScreen,
    ServiceScreen: ServiceScreen,
    DetailScreen: DetailScreen,
    FormScreen: FormScreen,
    SuccessOrder: SuccessOrder,
  },
  {
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);

//Order Screen
const OrderNavigator = createStackNavigator(
  {
    Order: OrderScreen,
    ConfirmCancelScreen: ConfirmCancelScreen,
    CanceledScreen: CanceledScreen,
  },
  {
    headerMode: 'none',
  },
);

const OrderContainer = createAppContainer(OrderNavigator);

//Bottom Tab
const bottomTab = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: AppContainer,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Icon
              name="home"
              type="font-awesome"
              // size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Orders: {
      screen: OrderContainer,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Icon
              name="shopping-cart"
              type="font-awesome"
              // size={20}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    RateCard: {
      screen: RateCardScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Icon
              name="tasks"
              type="font-awesome"
              // size={20}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Icon
              name="user-circle-o"
              type="font-awesome"
              // size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: colors.night,
    inactiveColor: colors.grey,
    barStyle: {backgroundColor: colors.lightPrimary},
    labeled: false,
  },
);
export default createAppContainer(bottomTab);
