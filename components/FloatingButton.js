import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import {withNavigation} from 'react-navigation';

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
    </View>
  );
}

export default withNavigation(FloatingButton);
const styles = StyleSheet.create({
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
});
