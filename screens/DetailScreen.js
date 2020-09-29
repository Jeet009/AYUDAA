import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
  ScrollView,
} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import {Icon} from 'react-native-elements';
import {ImageBackground} from 'react-native';

export default function DetailScreen(props) {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.topImage}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: props.navigation.getParam('url')}}
          style={styles.image}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>PRODUCT DETAILS</Text>
        <View>
          <Text style={styles.heading}>
            {' '}
            {props.navigation.getParam('name')}
          </Text>
          {/* RATE & PRICE  */}
          {(() => {
            if (props.navigation.getParam('rate')) {
              return (
                <View style={styles.title}>
                  <Text style={styles.name}>
                    PRICE : {props.navigation.getParam('rate')} /-
                  </Text>
                </View>
              );
            } else {
              return (
                <View>
                  <View style={styles.title}>
                    <Text style={styles.name}>
                      RATE FOR REPAIR :{' '}
                      {props.navigation.getParam('rateForRepair')}
                    </Text>
                  </View>
                  <View style={styles.title}>
                    <Text style={styles.name}>
                      RATE FOR SERVICE :{' '}
                      {props.navigation.getParam('rateForService')}
                    </Text>
                  </View>
                </View>
              );
            }
          })()}
          {/* CATEGORY  */}
          {(() => {
            switch (props.navigation.getParam('category')) {
              case 'Home':
                return (
                  <View style={styles.title}>
                    <Text style={styles.name}>CATEGORY : HOME SERVICE </Text>
                  </View>
                );

              case 'Kitchen':
                return (
                  <View style={styles.title}>
                    <Text style={styles.name}>CATEGORY : KITCHEN SERVICE </Text>
                  </View>
                );

              case 'Laundry':
                return (
                  <View style={styles.title}>
                    <Text style={styles.name}>CATEGORY : LAUNDRY SERVICE </Text>
                  </View>
                );

              case 'Saloon':
                return (
                  <View style={styles.title}>
                    <Text style={styles.name}>CATEGORY : SALOON AT HOME </Text>
                  </View>
                );

              default:
                return (
                  <View style={styles.title}>
                    <Text style={styles.name}>CATEGORY : CATEGORY TYPE </Text>
                  </View>
                );
            }
          })()}
        </View>
        {/* Description  */}
        <View style={styles.title}>
          <Text style={styles.para}>{props.navigation.getParam('desc')}</Text>
        </View>
        {/* Include  */}
        <View style={styles.bgGreen}>
          <Text style={styles.name}>Includes</Text>
          <Text style={styles.paraRegular}> - Just Another Point</Text>
          <Text style={styles.paraRegular}> - Just Another Point</Text>
          <Text style={styles.paraRegular}> - Just Another Point</Text>
        </View>
        {/* Exclude  */}
        <View style={styles.bgRed}>
          <Text style={styles.name}>Excludes</Text>
          <Text style={styles.paraRegular}> - Just Another Point</Text>
          <Text style={styles.paraRegular}> - Just Another Point</Text>
          <Text style={styles.paraRegular}> - Just Another Point</Text>
        </View>
        {/* Payment Procedure  */}
        <View style={styles.bgPrimary}>
          <Text style={styles.name}>Payment Procedure</Text>
          <Text style={styles.paraRegular}>
            • Cost mentioned are for Inspection only. Final bill will be shared
            after inspection.
          </Text>
        </View>
        {/* Why We */}
        <View style={styles.bgPrimary}>
          <Text style={styles.name}>Why You Choose Us ?</Text>
          <Text style={styles.paraRegular}>
            ▪︎ 100% satisfaction guaranteed
          </Text>
          <Text style={styles.paraRegular}>
            ▪︎ Trained and Background verified associate
          </Text>
        </View>
        {/* OTHERS  */}
        <Text style={styles.text}>COMMUNITY & SUPPORT</Text>
        <View style={styles.horizontal}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://wa.me/919832358173');
            }}>
            <Icon name="whatsapp" type="font-awesome" style={styles.circle} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.ayudaa.in');
            }}>
            <Icon name="safari" type="font-awesome" style={styles.circle} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // Linking.openURL('https://m.facebook.com');
              Linking.openURL('m.facebook.com');
            }}>
            <Icon
              name="facebook-official"
              type="font-awesome"
              style={styles.circle}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${8001268005}`);
            }}>
            <Icon
              name="phone-square"
              type="font-awesome"
              style={styles.circle}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Enter Details', {
              name: props.navigation.getParam('name'),
              url: props.navigation.getParam('url'),
              rate: props.navigation.getParam('rate'),
              rateForService: props.navigation.getParam('rateForService'),
              rateForRepair: props.navigation.getParam('rateForRepair'),
              category: props.navigation.getParam('category'),
              desc: props.navigation.getParam('desc'),
            });
          }}>
          <Text style={styles.confirmButton}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.white,
    width: Dimensions.get('window').width,
    elevation: 5,
    padding: 20,
  },
  text: {
    alignSelf: 'center',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
  },
  image: {
    height: Dimensions.get('window').height / 4,
  },
  topImage: {
    backgroundColor: colors.white,
    padding: 10,
    overflow: 'hidden',
  },
  confirmButton: {
    alignSelf: 'center',
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    // marginTop: 10,
  },
  heading: {
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
  },
  title: {
    flex: 1,
    backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  name: {
    fontSize: 12,
    // fontWeight: `bold`,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  para: {
    fontSize: 12,
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Light',
  },
  paraRegular: {
    fontSize: 12,
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Regular',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.smoke,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  circle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    padding: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  bgGreen: {
    flex: 1,
    backgroundColor: '#c9ffba',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  bgRed: {
    flex: 1,
    backgroundColor: '#ffccba',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  bgPrimary: {
    flex: 1,
    backgroundColor: colors.lightPrimary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
