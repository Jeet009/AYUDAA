import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import colors from '../../../constants/colors';
import {Icon} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PopUpComponent from '../../../screens/PopUpComponent';

export default function CartScreen() {
  const [data, setData] = useState([]);
  const [removeFromCart, setRemoveFromCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    let user = auth().currentUser;
    const subscriber = firestore()
      .collection('cart')
      .where('customerId', '==', user.uid)
      .onSnapshot((querySnapshot) => {
        const dataArray = [];

        querySnapshot.forEach((documentSnapshot) => {
          dataArray.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        // console.log(dataArray);
        setData(dataArray);
        let totalP = 0;
        let totalQ = 0;
        dataArray.forEach((data) => {
          totalQ = totalQ + parseInt(data.quantity);

          if (parseInt(data.quantity) > 1) {
            totalP = totalP + parseInt(data.price) * parseInt(data.quantity);
            setTotalPrice(totalP);
          } else {
            totalP = totalP + parseInt(data.price);
            setTotalPrice(totalP);
          }

          setTotalQuantity(totalQ);
        });
      });

    return () => subscriber();
  }, [setData]);

  //Checking For Remove From Cart Status
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setRemoveFromCart &&
        setTimeout(() => {
          setRemoveFromCart(false);
        }, 4000);
    }
    return () => {
      unmounted = true;
    };
  }, [setRemoveFromCart]);

  // Handling Delete

  const handleDelete = (id) => {
    firestore()
      .collection('cart')
      .doc(id)
      .delete()
      .then(setRemoveFromCart(true));
  };

  // Handling Quantity

  const quantityDecrease = (id) => {
    firestore()
      .collection('cart')
      .doc(id)
      .update({
        quantity: firestore.FieldValue.increment(-1),
      });
  };

  const quantityIncrease = (id) => {
    firestore()
      .collection('cart')
      .doc(id)
      .update({
        quantity: firestore.FieldValue.increment(1),
      });
  };

  function renderList(items) {
    return (
      <View style={styles.bottomSheet}>
        <View style={styles.service}>
          <View>
            <Text style={styles.name}>{items.item.serviceName}</Text>
            <Text style={styles.para}>
              Price Per Single Item : {items.item.price} /-
            </Text>
            <View style={styles.serviceDesc}>
              <Icon
                name="minus"
                type="font-awesome"
                color={colors.ypsDark}
                size={25}
                onPress={() => quantityDecrease(items.item.key)}
              />
              <Text
                style={{
                  backgroundColor: colors.white,
                  padding: 5,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 5,
                  fontFamily: 'Poppins-Bold',
                  elevation: 5,
                  marginLeft: 20,
                  marginRight: 20,
                }}>
                {items.item.quantity}
              </Text>
              <Icon
                name="plus"
                type="font-awesome"
                color={colors.ypsDark}
                size={25}
                onPress={() => quantityIncrease(items.item.key)}
              />
            </View>
          </View>
          <Icon
            name="trash"
            type="font-awesome"
            color="red"
            size={30}
            onPress={() => handleDelete(items.item.key)}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.heading}>What are you waiting for ?</Text>
        }
        renderItem={renderList}
        data={data}
        numColumns={1}
        ListFooterComponent={
          <View style={styles.containerFooter}>
            <Text style={styles.name}>Total Price : {totalPrice} / -</Text>
            <Text style={styles.para}>Total Quantity : {totalQuantity}</Text>
          </View>
        }
      />
      {removeFromCart && (
        <PopUpComponent name="Removed Item" icon="check-square" />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  bottomSheet: {
    padding: 20,
    backgroundColor: 'white',
  },
  container: {flex: 1, backgroundColor: 'white'},
  containerFooter: {
    // alignItems: 'center'
    backgroundColor: colors.lightPrimary,
    padding: 20,
    borderRadius: 15,
    margin: 20,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
  },
  para: {
    fontFamily: 'Poppins-Light',
  },
  service: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightPrimary,
    padding: 20,
    borderRadius: 15,
    elevation: 10,
  },

  serviceDesc: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    // color: colors.lightPrimary,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  heading: {
    // color: colors.lightPrimary,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
});
