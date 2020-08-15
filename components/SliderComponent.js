import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import SliderItemComponent from './SliderItemComonent';
import colors from '../constants/colors';

export default function SliderComponent() {
  const [selectedIndex, setSelectedIndex] = useState();
  const images = ['kkk', 'gggg'];

  const indexSelection = (e) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const index = Math.floor(contentOffset.x / viewSize.width);
    setSelectedIndex(index);
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* <Text style={styles.text}></Text> */}
        <Text style={{fontSize: 12, fontWeight: 'bold'}}>
          AYUDAA SAFE SERVICE
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={indexSelection}
        snapToInterval={Dimensions.get('window').width}>
        <SliderItemComponent uri="https://image.ayudaa.in/asset/safe%20service.png" />
        <SliderItemComponent uri="https://image.ayudaa.in/asset/covid19.png" />
        <SliderItemComponent uri="https://image.ayudaa.in/asset/gloves.png" />
        <SliderItemComponent uri="https://image.ayudaa.in/asset/mask.png" />
        <SliderItemComponent uri="https://image.ayudaa.in/asset/sanitize.png" />
      </ScrollView>
      <View style={styles.circleDiv}>
        {images.map((image, i) => (
          <View
            style={[
              styles.whiteCircle,
              {
                opacity: i === selectedIndex ? 0.5 : 1,
                width: i === selectedIndex ? 50 : 6,
                height: i === selectedIndex ? 2 : 2,
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 2,
    // borderRadius: 5,
    marginTop: 5,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginLeft: 5,
    padding: 5,
    borderRadius: 5,
  },
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
    height: 2,
    borderRadius: 3,
    margin: 5,
    backgroundColor: 'black',
  },
});
