import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import Photo from '../js/dummyData';
import colors from '../constants/colors';
import {withNavigation} from 'react-navigation';
import bgServices from '../assets/images/bg-service.jpg';

function ServiceComponent(props) {
  function renderCategory(itemData) {
    return (
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() =>
          props.navigation.navigate('ORDER BY SERVICES', {
            title: itemData.item.text,
            dbName: itemData.item.dbName,
            uri: itemData.item.url,
          })
        }>
        <View>
          <ImageBackground
            resizeMode="contain"
            source={{uri: itemData.item.url}}
            style={styles.catImage}
            imageStyle={{
              borderRadius: 5,
            }}
          />
          <Text style={styles.title}>{itemData.item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={bgServices}
      style={styles.bgImage}>
      <View style={styles.overlay}>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.text}>ORDER BY SERVICE</Text>
          }
          renderItem={renderCategory}
          data={CATEGORY.sort((a, b) => a.text.localeCompare(b.text))}
          numColumns={4}
          style={styles.category}
        />
      </View>
    </ImageBackground>
  );
}

export default withNavigation(ServiceComponent);
export const CATEGORY = [
  new Photo(
    'p1',
    'ELECTRICAL',
    'electrical',
    'https://image.ayudaa.in/asset/electrical.png',
  ),
  new Photo(
    'p2',
    'APPLIANCE',
    'appliances',
    'https://image.ayudaa.in/asset/wash.png',
  ),
  new Photo(
    'p3',
    'CLEANING',
    'cleaning',
    'https://image.ayudaa.in/asset/cleaning.png',
  ),
  new Photo(
    'p4',
    'CARPENTRY',
    'carpentry',
    'https://image.ayudaa.in/asset/carpentry.png',
  ),
  new Photo(
    'p5',
    'PLUMBERY',
    'plumbery',
    'https://image.ayudaa.in/asset/plumbery.png',
  ),
  new Photo(
    'p6',
    'INTERIOR DESIGN',
    'interiorDesign',
    'https://image.ayudaa.in/asset/appliance.png',
  ),
  new Photo(
    'p7',
    'HOME CONTRACTOR',
    'homeContractor',
    'https://image.ayudaa.in/asset/homeContractor.png',
  ),
  new Photo(
    'p1',
    'EVENT MANAGEMENT',
    'event',
    'https://image.ayudaa.in/asset/event.png',
  ),
];

const styles = StyleSheet.create({
  catImage: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 100,
    maxHeight: 100,
    margin: 2,
    marginTop: 20,
    // borderColor: colors.ypsDark,
    // borderWidth: 0.5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  text: {
    fontSize: 12,
    // fontWeight: '800',
    alignSelf: 'center',
    margin: 2,
    fontFamily: 'Poppins-SemiBold',
  },
  category: {
    backgroundColor: colors.white,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    elevation: 1.5,
  },
  title: {
    fontSize: 12,
    // fontWeight: 'bold',
    textAlign: 'center',
    margin: 2,
    fontFamily: 'Poppins-Regular',
  },
  bgImage: {
    // backgroundColor: colors.white,
  },
  overlay: {
    padding: 2,
    backgroundColor: 'rgba(255,255,143,0.5)',
  },
});
