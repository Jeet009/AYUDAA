import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
// import {} from 'react-native-gesture-handler';
import Photo from '../js/dummyData';
import colors from '../constants/colors';
import {withNavigation} from 'react-navigation';

function CategoryComponent(props) {
  function renderCategory(itemData) {
    return (
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() =>
          props.navigation.navigate('CategoryScreen', {
            title: itemData.item.text,
          })
        }>
        <ImageBackground
          resizeMode="contain"
          source={{uri: itemData.item.url}}
          style={styles.catImage}
          imageStyle={{
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.text}>ORDER BY CATEGORIES</Text>
        }
        renderItem={renderCategory}
        data={CATEGORY}
        numColumns={2}
        style={styles.category}
      />
    </View>
  );
}

export default withNavigation(CategoryComponent);
export const CATEGORY = [
  new Photo(
    'p1',
    'HOME',
    '',
    'https://image.ayudaa.in/asset/homeServiceFinal.png',
  ),
  new Photo(
    'p2',
    'KITCHEN',
    '',
    'https://image.ayudaa.in/asset/kitchenFinal.png',
  ),
  new Photo(
    'p3',
    'LAUNDRY',
    '',
    'https://image.ayudaa.in/asset/laundryFinal.png',
  ),
  new Photo(
    'p4',
    'SALOON',
    '',
    'https://image.ayudaa.in/asset/saloonFinal.png',
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
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 2,
  },
  category: {
    backgroundColor: colors.white,
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
});
