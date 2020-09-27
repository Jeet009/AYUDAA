import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import {withNavigation} from 'react-navigation';
import {Thumbnail} from 'native-base';
function FloatingButton(props) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.button}>
        <TouchableOpacity>
          <Icon
            style={styles.text}
            name="shopping-bag"
            type="font-awesome"
            color={colors.lightPrimary}
            size={30}
            onPress={() => props.navigation.push('My Cart')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSheet}>
        <Text style={styles.text}>My Cart</Text>
        <View style={styles.serviceBg}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Thumbnail
              large
              source={{
                uri:
                  'https://4.imimg.com/data4/KG/GE/ANDROID-43618134/product-500x500.jpeg',
              }}
            />
            <View>
              <Text style={styles.para}>A Y U D A A</Text>
              <Text style={styles.para}>Added To Cart - Jan 21, 2020</Text>
            </View>
          </View>
          <View style={styles.service}>
            <View>
              <Text style={styles.name}>AC Service & Repairing</Text>
              <Text style={styles.para}>Price Per Single Item : 250000 /-</Text>
              <View style={styles.serviceDesc}>
                <Icon
                  name="plus"
                  type="font-awesome"
                  color={colors.ypsDark}
                  size={15}
                />
                <Text>1</Text>
                <Icon
                  name="minus"
                  type="font-awesome"
                  color={colors.ypsDark}
                  size={15}
                />
              </View>
            </View>
            <Icon
              style={{
                backgroundColor: colors.darkPrimary,
                padding: 15,
                borderRadius: 5,
              }}
              name="trash"
              type="font-awesome"
              color="red"
              size={30}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default withNavigation(FloatingButton);
const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 15,
    height: Dimensions.get('window').height / 2,
  },
  button: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: colors.ypsDark,
    padding: 10,
    elevation: 10,
    width: 80,
    height: 80,
    borderRadius: 50,
    borderEndWidth: 3,
    borderBottomWidth: 2,
    borderStartWidth: 1.5,
    borderTopColor: colors.primary,
    borderTopWidth: 1.5,
    borderStartColor: colors.primary,
    borderBottomColor: colors.primary,
    borderEndColor: colors.lightPrimary,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
  },
  para: {
    fontFamily: 'Poppins-Light',
  },
  service: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightPrimary,
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  serviceBg: {
    backgroundColor: colors.lightPrimary,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    marginTop: 20,
  },
  serviceDesc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    // color: colors.lightPrimary,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
});
