import React, {useEffect, useState} from 'react';
import CarouselItemComponent from './CarouselItemComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {View, Dimensions, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function CarouselComponent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [images, setImage] = useState([]);
  const [imageOne, setImageOne] = useState();
  const [imageTwo, setImageTwo] = useState();
  const [imageThree, setImageThree] = useState();
  const [imageFour, setImageFour] = useState();

  const indexSelection = (e) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const index = Math.floor(contentOffset.x / viewSize.width);
    setSelectedIndex(index);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('topCarousel')
      .onSnapshot((querySnapshot) => {
        const data = [];

        querySnapshot.forEach((documentSnapshot) => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setImage(data);
        // console.log(data[3].uri);
        setImageOne(data[0].uri);
        setImageTwo(data[1].uri);
        setImageThree(data[2].uri);
        setImageFour(data[3].uri);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [setImage]);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={indexSelection}
        snapToInterval={Dimensions.get('window').width}>
        <CarouselItemComponent uri={imageOne} />
        <CarouselItemComponent uri={imageTwo} />
        <CarouselItemComponent uri={imageThree} />
        <CarouselItemComponent uri={imageFour} />
      </ScrollView>
      <View style={styles.circleDiv}>
        {images.map((image, i) => (
          <View
            style={[
              styles.whiteCircle,
              {
                opacity: i === selectedIndex ? 0.5 : 1,
                width: i === selectedIndex ? 8 : 6,
                height: i === selectedIndex ? 8 : 6,
                borderRadius: i === selectedIndex ? 4 : 3,
              },
            ]}
            key={image.key}
            active={i === selectedIndex}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleDiv: {
    position: 'absolute',
    bottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 10,
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: 'black',
  },
});
