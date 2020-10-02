import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import LoadingScreen from '../screens/LoadingScreen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import NullScreen from './NullScreen';
import {Icon} from 'react-native-elements';
import FloatingButton from '../components/FloatingButton';
import PopUpComponent from './PopUpComponent';

export default function ServiceScreen(props) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [data, setData] = useState([]); // Initial empty array of users
  const [refreshing, setRefreshing] = useState(false);

  const [cartData, setCartData] = useState();
  const [addedToCart, setAddedToCart] = useState(false);

  //Fetching Cart Id
  useEffect(() => {
    let user = auth().currentUser;
    const subscriber = firestore()
      .collection('cart')
      .where('customerId', '==', user.uid)
      .onSnapshot((querySnapshot) => {
        const dataArray = [];

        querySnapshot.forEach((documentSnapshot) => {
          dataArray.push(documentSnapshot.data().serviceId);
        });
        setCartData(dataArray);
      });

    return () => subscriber();
  }, [setCartData]);

  //Checking For Add To Cart Status

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setAddedToCart &&
        setTimeout(() => {
          setAddedToCart(false);
        }, 4000);
    }

    return () => {
      unmounted = true;
    };
  }, [setAddedToCart]);

  //Fetching Services
  useEffect(() => {
    const subscriber = firestore()
      .collection('services')
      .where('subCategory', '==', props.navigation.getParam('dbName'))
      .onSnapshot((querySnapshot) => {
        const dataArray = [];

        querySnapshot.forEach((documentSnapshot) => {
          dataArray.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setData(dataArray);
        setLoading(false);
      });
    return () => subscriber();
  }, [setData]);

  //Loading
  if (loading) {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <LoadingScreen />
      </View>
    );
  }

  // Handling Cart
  const handleCartSubmit = (id, name, price, url) => {
    let user = auth().currentUser;
    firestore()
      .collection('cart')
      .add({
        serviceName: name,
        serviceId: id,
        price: price,
        quantity: 1,
        customerId: user.uid,
        customerName: user.displayName,
        url: url,
      })
      .then(() => {
        setAddedToCart(true);
      });
  };

  //Controlling Refresh
  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    const subscriber = firestore()
      .collection('services')
      .where('subCategory', '==', props.navigation.getParam('dbName'))
      .onSnapshot((querySnapshot) => {
        const data = [];

        querySnapshot.forEach((documentSnapshot) => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setData(data);

        setLoading(false);
        setRefreshing(false);
      });

    return () => subscriber();
  };

  function renderCategory({item}) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.overlayYellow}>
          <TouchableNativeFeedback
            onPress={() =>
              props.navigation.navigate('Confirm Your Booking', {
                dbName: item.db_name,
                url: item.url,
                name: item.name,
                rate: item.rate,
                rateForService: item.rateForService,
                rateForRepair: item.rateForRepair,
                category: item.category,
                desc: item.description,
                includes: item.includes,
                excludes: item.excludes,
              })
            }>
            <View style={styles.imageBg}>
              <Image
                resizeMode="cover"
                source={{
                  uri: item.url,
                }}
                style={styles.bgImage}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 6,
                }}>
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.para}>CATEGORY : {item.category} </Text>
                </View>
                <View>
                  <Text style={styles.name}>PRICE : {item.rate} /-</Text>
                  {item.inspectionRate && (
                    <Text style={styles.para}>+ On Inspection</Text>
                  )}
                </View>
              </View>
            </View>
          </TouchableNativeFeedback>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 6,
            }}>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={() =>
                props.navigation.navigate('Confirm Your Booking', {
                  dbName: item.db_name,
                  url: item.url,
                  name: item.name,
                  rate: item.rate,
                  rateForService: item.rateForService,
                  rateForRepair: item.rateForRepair,
                  category: item.category,
                  desc: item.description,
                  includes: item.includes,
                  excludes: item.excludes,
                })
              }>
              <Text style={styles.btnBlack}>View Details</Text>
            </TouchableOpacity>
            {cartData && cartData.includes(item.key) ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate('My Cart')}>
                <Text style={styles.btnText}>Go To Cart</Text>
                <Icon
                  name="shopping-bag"
                  type="font-awesome"
                  color="white"
                  style={{
                    fontFamily: 'Poppins-Light',
                    marginLeft: 10,
                  }}
                  size={20}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  handleCartSubmit(item.key, item.name, item.rate, item.url)
                }>
                <Text style={styles.btnText}>Add To Cart</Text>
                <Icon
                  name="shopping-bag"
                  type="font-awesome"
                  color="white"
                  style={{
                    fontFamily: 'Poppins-Light',
                    marginLeft: 10,
                  }}
                  size={20}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
  if (data.length) {
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.topTitle}>
              {props.navigation.getParam('title')}
            </Text>
          }
          renderItem={renderCategory}
          data={data.sort((a, b) => a.name.localeCompare(b.name))}
          numColumns={1}
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
        />
        {addedToCart && (
          <PopUpComponent
            name="Added To Cart"
            color="black"
            icon="check-square"
          />
        )}
        <FloatingButton />
      </View>
    );
  } else {
    return <NullScreen />;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Regular',
  },
  topTitle: {
    fontSize: 15,
    alignSelf: 'center',
    margin: 2,
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  para: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  name: {
    fontSize: 15,
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontFamily: 'Poppins-Light',
    color: 'black',
    fontSize: 18,
    textAlign: 'left',
  },

  imageBg: {
    padding: 5,
    elevation: 5,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    overflow: 'hidden',
  },
  bgImage: {
    flex: 1,
    height: 200,
    maxHeight: 200,
    borderBottomRightRadius: 20,
    borderRadius: 5,
  },
  overlayYellow: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.lightPrimary,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 5,
    margin: 5,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.ypsDark,
    padding: 10,
    margin: 10,
    elevation: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.white,
  },
  btnText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  btnBlack: {
    color: colors.ypsDark,
    fontFamily: 'Poppins-SemiBold',
  },
  buttonPrimary: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    padding: 10,
    margin: 10,
    elevation: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.ypsDark,
  },
});
