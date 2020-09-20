import React, {useEffect, useState} from 'react';
import {Text, Thumbnail, View} from 'native-base';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import electrician from '../assets/images/electrician-1080554_1920.jpg';
import electric from '../assets/images/electric-1080584_1920.jpg';
import plumber from '../assets/images/plumber-228010_1920.jpg';
import laundry from '../assets/images/washing-977662_1920.jpg';
import LinearGradient from 'react-native-linear-gradient';

export default function SearchResultComponent({result, navigation}) {
  //   console.log('result', result);
  const [heading, setHeading] = useState('Our Suggestions ...');
  const [searchResult, setSearchResult] = useState([
    {
      id: 'p1',
      name: 'Not Sure About Your Problem ?',
      dbName: 'Home',
      url: electrician,
    },
    {
      id: 'p2',
      name: 'Hire Electricians ...',
      dbName: 'Home',
      url: electric,
    },
    {
      id: 'p3',
      name: 'Looking For A Plumber Today ?',
      dbName: 'Home',
      url: plumber,
    },
    {
      id: 'p4',
      name: 'Having Trouble With Laundry ?',
      dbName: 'Home',
      url: laundry,
    },
  ]);

  useEffect(() => {
    if (result.length > 0) {
      // console.log(result);
      setSearchResult(result);
      setHeading('Search Result ...');
    }
  }, [setSearchResult, result]);

  function renderResult(itemData) {
    return (
      <>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() =>
            navigation.push('DetailScreen', {
              name: itemData.name,
              url: 'https://image.ayudaa.in/asset/orderLogo.png',
              rate: itemData.rate,
              rateForService: itemData.rateForService,
              rateForRepair: itemData.rateForRepair,
              category: itemData.category,
              desc: itemData.description,
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
            <ImageBackground
              resizeMode="cover"
              source={electrician}
              style={styles.bgImage}>
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
        // style={{flex: 1}}
      />
    </LinearGradient>
  );
}

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
    // alignItems: 'center',
    // width: Dimensions.get('window').width / 2,
    height: 150,
    maxHeight: 150,
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
});
