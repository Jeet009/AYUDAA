import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SubCategoryComponent from '../components/SubCategoryComponent';
import {withNavigation} from 'react-navigation';
import colors from '../../../constants/colors';
import firestore from '@react-native-firebase/firestore';
import FloatingButton from '../../../components/FloatingButton';

function SubCategoryScreen(props) {
  const [subCategory, setSubCategory] = useState([]);
  let dbParam;
  if (props.navigation.getParam('parent_category')) {
    dbParam = 'parent_category';
  } else {
    dbParam = 'categoryName';
  }
  useEffect(() => {
    // console.log(props.navigation.getParam('parent_category'));
    const subscriber = firestore()
      .collection('subCategory')
      .where(dbParam, '==', props.navigation.getParam('dbName'))
      .onSnapshot((querySnapshot) => {
        const data = [];

        querySnapshot.forEach((documentSnapshot) => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setSubCategory(data);
      });

    return () => subscriber();
  }, [setSubCategory]);

  return (
    <View style={styles.bgTopImage}>
      <SubCategoryComponent data={subCategory} />
      <FloatingButton />
    </View>
  );
}
SubCategoryScreen['navigationOptions'] = (props) => ({
  title: props.navigation.getParam('title'),
  headerStyle: {
    backgroundColor: colors.lightPrimary,
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    textTransform: 'capitalize',
  },
});
export default withNavigation(SubCategoryScreen);
const styles = StyleSheet.create({
  bgTopImage: {
    flex: 1,
    // width: '100%',
    // height: Dimensions.get('window').height,
    backgroundColor: colors.white,
  },
});
