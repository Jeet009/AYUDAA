import React, {useEffect, useState} from 'react';
import {Text, Thumbnail, View, Item, Input} from 'native-base';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import electrician from '../../../assets/images/electrician-1080554_1920.jpg';
import electric from '../../../assets/images/electric-1080584_1920.jpg';
import plumber from '../../../assets/images/plumber-228010_1920.jpg';
import laundry from '../../../assets/images/washing-977662_1920.jpg';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation';
import {Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
function SearchPage({navigation}) {
  // console.log('result', navigation);
  const [heading, setHeading] = useState('Our Suggestions ...');
  const [searchFor, setSearchFor] = useState();
  const [searchResult, setSearchResult] = useState([
    {
      id: 'p1',
      name: 'Problem With Your Appliance ?',
      dbName: 'appliances',
      url: electrician,
    },
    {
      id: 'p2',
      name: 'Hire Electricians ...',
      dbName: 'electrical',
      url: electric,
    },
    {
      id: 'p3',
      name: 'Looking For A Plumber Today ?',
      dbName: 'plumbery',
      url: plumber,
    },
    {
      id: 'p4',
      name: 'Having Trouble With Laundry ?',
      dbName: 'laundry',
      url: laundry,
    },
  ]);

  const handleSearchInput = (e) => {
    setSearchFor(e.nativeEvent.text);
  };
  const handleSubmit = () => {
    if (searchFor) {
      let typedValue =
        searchFor.indexOf(' ') == -1
          ? searchFor
          : searchFor.substr(0, searchFor.indexOf(' '));
      let typedValueLowerCase = typedValue.toString().toLowerCase();
      firestore()
        .collection('services')
        .where('tags', 'array-contains-any', [typedValueLowerCase])
        .onSnapshot((querySnapshot) => {
          const data = [];

          querySnapshot.forEach((documentSnapshot) => {
            data.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          // console.log(data);
          data.length > 0
            ? setSearchResult(data)
            : Alert.alert('Sorry!', 'Nothing Found');
        });
    } else {
      alert('ENTER VALID INPUT');
    }
  };

  function renderResult(itemData) {
    return (
      <>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() =>
            itemData.item.key
              ? navigation.push('Confirm Your Booking', {
                  name: itemData.item.name,
                  url: 'https://image.ayudaa.in/asset/orderLogo.png',
                  rate: itemData.item.rate,
                  rateForService: itemData.item.rateForService,
                  rateForRepair: itemData.item.rateForRepair,
                  category: itemData.item.category,
                  desc: itemData.item.description,
                })
              : navigation.push('ORDER BY SERVICES', {
                  title: itemData.item.name,
                  dbName: itemData.item.dbName,
                  uri: 'https://image.ayudaa.in/asset/orderLogo.png',
                })
          }>
          <ImageBackground
            resizeMode="cover"
            source={itemData.item.url}
            style={styles.bgImage}>
            <View style={styles.overlayYellow}>
              <Text style={styles.text}>{itemData.item.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </>
    );
  }
  return (
    <LinearGradient
      colors={['#ffff', '#fff']}
      style={{flex: 1, paddingBottom: 20}}>
      <FlatList
        columnWrapperStyle={{flexWrap: 'wrap', flex: 1, marginTop: 5}}
        ListHeaderComponent={
          <View>
            {/* Search Bar  */}
            <View style={{flex: 1}}>
              <View style={styles.search}>
                <Item style={{borderBottomWidth: 0}}>
                  <Input
                    placeholder="Type Service Name"
                    style={{
                      fontFamily: 'Poppins-Light',
                      fontSize: 15,
                      marginTop: 5,
                    }}
                    onChange={handleSearchInput}
                  />
                  <Icon
                    name="search"
                    type="font-awesome"
                    color="grey"
                    style={{fontFamily: 'Poppins-Light'}}
                    size={20}
                    onPress={
                      // setModalVisible(false);
                      handleSubmit
                    }
                  />
                </Item>
              </View>
            </View>
            {/* Top Bg Image  */}
            <ImageBackground
              resizeMode="cover"
              source={electrician}
              style={styles.detailBgImage}>
              <View style={styles.overlayBlack}>
                <View>
                  <Text style={styles.textWB}>
                    Ayudaa
                    {'\n'}Your Home Service Assistance
                  </Text>
                  <Text style={styles.text}>+91 9883828261</Text>
                </View>

                <Thumbnail
                  large
                  square
                  source={{uri: 'https://image.ayudaa.in/final/newLogo.png'}}
                  style={{borderRadius: 50}}
                />
              </View>
            </ImageBackground>
            <Text style={styles.heading}>{heading}</Text>
          </View>
        }
        data={searchResult.sort((a, b) => a.name.localeCompare(b.name))}
        renderItem={renderResult}
        numColumns={3}
      />
    </LinearGradient>
  );
}

export default withNavigation(SearchPage);

const styles = StyleSheet.create({
  text: {
    // flex: 1,
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',

    alignSelf: 'center',
    textAlign: 'center',
    margin: 2,
    color: 'white',
    padding: 2,
    // backgroundColor: colors.darkPrimary,
  },
  textWB: {
    // flex: 1,
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',

    alignSelf: 'center',
    textAlign: 'center',
    margin: 2,
    color: 'white',
    padding: 2,
    // backgroundColor: colors.darkPrimary,
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
  },
  heading: {
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    margin: 2,
    marginTop: 20,
    // color: 'white',
  },
  bgImage: {
    height: 150,
    maxHeight: 150,
    marginTop: 20,
    margin: 2,
    overflow: 'hidden',
  },
  detailBgImage: {
    height: 250,
    maxHeight: 250,
    marginTop: 20,
    margin: 2,
    overflow: 'hidden',
  },
  overlayYellow: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(107, 83, 2,0.8)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  overlayBlack: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(000, 000, 000,0.7)',
    borderRadius: 2,
    // overflow: 'hidden',
  },
  search: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    elevation: 10,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
  },
});
