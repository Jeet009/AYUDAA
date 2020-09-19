import React, {useEffect, useState} from 'react';
import {Text, View} from 'native-base';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import electrician from '../assets/images/electrician-1080554_1920.jpg';
import electric from '../assets/images/electric-1080584_1920.jpg';
import plumber from '../assets/images/plumber-228010_1920.jpg';
import laundry from '../assets/images/washing-977662_1920.jpg';
import LinearGradient from 'react-native-linear-gradient';

export default function SearchResultComponent({result}) {
  //   console.log('result', result);
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
      setSearchResult(result);
    }
  }, [setSearchResult, result]);

  function renderResult(itemData) {
    return (
      <TouchableOpacity style={{flex: 1}}>
        <ImageBackground
          resizeMode="contain"
          source={itemData.item.url}
          style={styles.bgImage}
          imageStyle={{
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <View style={styles.overlay}>
            <Text style={styles.text}>{itemData.item.name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  return (
    <LinearGradient
      colors={['#ffff', '#fff']}
      style={{flex: 1, paddingBottom: 20}}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.heading}>Our Suggestions</Text>
        }
        data={searchResult}
        renderItem={renderResult}
        numColumns={2}
        // style={{flex: 1}}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',

    alignSelf: 'center',
    textAlign: 'center',
    margin: 2,
    color: 'white',
  },
  heading: {
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    margin: 2,
    // color: 'white',
  },
  bgImage: {
    // alignItems: 'center',
    // width: Dimensions.get('window').width / 2,
    height: 150,
    maxHeight: 150,
    marginTop: 20,
    margin: 2,
    // overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(000,00,00,0.7)',
    borderRadius: 2,
  },
});
