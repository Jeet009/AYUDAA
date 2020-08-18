import React, {useState} from 'react';
import CarouselItemComponent from './CarouselItemComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {View, Dimensions, StyleSheet} from 'react-native';

export default function WelcomeComponent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = ['kkk', 'gggg', 'fff'];

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
        <CarouselItemComponent uri="https://image.ayudaa.in/final/welcome.png" />
        <CarouselItemComponent uri="https://image.ayudaa.in/final/ontime.png" />
        <CarouselItemComponent uri="https://image.ayudaa.in/final/affordable.png" />
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
