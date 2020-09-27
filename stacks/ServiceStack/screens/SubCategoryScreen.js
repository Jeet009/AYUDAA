import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SubCategoryComponent from '../components/SubCategoryComponent';
import {withNavigation} from 'react-navigation';
import colors from '../../../constants/colors';
import firestore from '@react-native-firebase/firestore';
import FloatingButton from '../../../components/FloatingButton';

function SubCategoryScreen(props) {
  const [subCategory, setSubCategory] = useState([]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('subCategory')
      .where('categoryName', '==', props.navigation.getParam('dbName'))
      .onSnapshot((querySnapshot) => {
        const data = [];

        querySnapshot.forEach((documentSnapshot) => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setSubCategory(data);
        // console.log(data);
        //    setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [setSubCategory]);
  //   console.log(props);

  return (
    <ImageBackground
      resizeMode="cover"
      source={{
        uri:
          'https://repairdaily.com/wp-content/uploads/2017/10/Toilet-Repair-Kit-.jpg',
      }}
      style={styles.bgTopImage}>
      <LinearGradient
        //   ref={(r) => (this.gradiant = r)}
        // locations={[0, 1.0]}
        colors={['rgba(0,0,0,0.50)', colors.ypsDark]}
        style={styles.overlay}>
        <SubCategoryComponent data={subCategory} />
      </LinearGradient>
      <FloatingButton />
    </ImageBackground>
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
    height: Dimensions.get('window').height,
  },
  overlay: {
    flex: 1,
    // justifyContent: 'space-around',
    // flexDirection: 'row',
    // alignItems: 'center',
    // width: '100%',
    // height: Dimensions.get('window').height,
    // position: 'absolute',
  },
});
