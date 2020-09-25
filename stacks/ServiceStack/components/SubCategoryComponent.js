import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import colors from '../../../constants/colors';
import {withNavigation} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
function SubCategoryComponent(props) {
  function renderSubCategory(itemData) {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('ORDER BY SERVICES', {
              title: itemData.item.name,
              dbName: itemData.item.db_name,
              url: itemData.item.url,
            })
          }>
          <View style={styles.overlayYellow}>
            <View style={styles.imageBg}>
              <Image
                resizeMode="cover"
                source={{
                  uri: itemData.item.url,
                }}
                style={styles.bgImage}
              />
              <Text style={styles.title}>{itemData.item.name}</Text>
            </View>
            <Text style={styles.title}>A Y U D A A</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return props.data ? (
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.key}
      columnWrapperStyle={{
        flexWrap: 'wrap',
        flex: 1,
        marginTop: 5,
      }}
      ListHeaderComponent={
        <Text style={styles.heading}>Good Morning, Jeet</Text>
      }
      renderItem={renderSubCategory}
      data={props.data}
      numColumns={2}
      //   contentContainerStyle={{padding: 0}}
    />
  ) : null;
}
export default withNavigation(SubCategoryComponent);

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Light',
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  title: {
    fontFamily: 'Poppins-Light',
    color: 'black',
    fontSize: 18,
    alignSelf: 'flex-end',
    // textAlign: 'center',
    margin: 5,
    padding: 5,
  },
  imageBg: {
    padding: 5,
    elevation: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  bgImage: {
    flex: 1,
    height: 200,
    maxHeight: 200,
    borderBottomRightRadius: 20,
    borderRadius: 5,
    // margin: 2,
  },
  overlayYellow: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.lightPrimary,
    borderRadius: 5,
    overflow: 'hidden',

    margin: 2,
  },
});
