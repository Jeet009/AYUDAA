import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import colors from '../../../constants/colors';
import {withNavigation} from 'react-navigation';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
function SubCategoryComponent(props) {
  function renderSubCategory(itemData) {
    return (
      <View style={{flex: 1}}>
        <TouchableNativeFeedback
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
        </TouchableNativeFeedback>
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
      data={props.data.sort((a, b) => a.name.localeCompare(b.name))}
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
    height: Dimensions.get('window').height / 3,
    maxHeight: Dimensions.get('window').height / 3,
  },
  bgImage: {
    flex: 1,
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
    height: Dimensions.get('window').height / 2.5,
    maxHeight: Dimensions.get('window').height / 2.5,
    margin: 2,
    padding: 5,
  },
});
