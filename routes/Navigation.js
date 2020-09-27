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
import SearchPage from '../stacks/SearchStack/screens/SearchPage';
import SubCategoryScreen from '../stacks/ServiceStack/screens/SubCategoryScreen';
import CartScreen from '../stacks/CartStack/screens/CartScreen';

//SearchScreen
const SearchNavigator = createStackNavigator(
  {
    'Search Services': SearchPage,
    'Order Details': DetailScreen,
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.lightPrimary,
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontFamily: 'Poppins-Light',
        fontSize: 18,
      },
    },
  },
);
const SearchContainer = createAppContainer(SearchNavigator);

//Home Screen
const AppNavigator = createStackNavigator(
  {
    'A Y U D A A': HomeScreen,
    'ORDER BY SERVICES': ServiceScreen,
    'ORDER BY CATEGORY': CategoryScreen,
    ChooseService: {
      screen: SubCategoryScreen,
    },
    'My Cart': CartScreen,
    'Confirm Your Booking': DetailScreen,
    'Enter Details': FormScreen,
    'Order Placed': SuccessOrder,
    'Search Services': SearchContainer,
  },
  {
    mode: 'modal',
    headerMode: 'screen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.lightPrimary,
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontFamily: 'Poppins-Light',
        fontSize: 18,
      },
    },
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
