import React, {useEffect, useState} from 'react';
import CarouselItemComponent from './CarouselItemComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {View, Dimensions, StyleSheet} from 'react-native';

export default function CarouselComponent() {
  const [selectedIndex, setSelectedIndex] = useState();
  const images = ['kkk', 'gggg', 'dddd', 'hhh'];

  const indexSelection = (e) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const index = Math.floor(contentOffset.x / viewSize.width);
    setSelectedIndex(index);
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={indexSelection}
        snapToInterval={Dimensions.get('window').width}>
        <CarouselItemComponent uri="https://image.ayudaa.in/asset/slide0.png" />
        <CarouselItemComponent uri="https://image.ayudaa.in/asset/slide1.png" />
        <CarouselItemComponent uri="https://image.ayudaa.in/asset/slide2.png" />
        <CarouselItemComponent uri="https://image.ayudaa.in/asset/slide3.png" />
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
            key={image}
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
