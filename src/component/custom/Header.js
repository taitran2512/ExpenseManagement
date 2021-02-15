import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { colors } from '../../res/style/theme';

const Header = (props) => {
   const iconBack = () => (
      <Pressable
         android_ripple={{ color: colors.black_transparent, borderless: true }}
         style={styles.iconBack}
         onPress={() => props.onPressBack()}>
         <Icon name="arrow-left" size={20} />
      </Pressable>
   );
   const iconMenu = () => (
      <Pressable
         android_ripple={{ color: colors.black_transparent, borderless: true }}
         style={styles.iconBack}
         onPress={() => props.onPressMenu()}>
         <Icon name="align-justify" size={20} />
      </Pressable>
   );
   //////////////////////////////////
   return (
      <View>
         <SafeAreaView />
         <View style={{ height: StatusBar.currentHeight, backgroundColor: colors.white }} />
         <StatusBar
            barStyle="dark-content"
            backgroundColor={'transparent'}
            hidden={false}
            translucent={true}
         />
         <View style={styles.container}>
            {props.isShowMenu ? iconMenu() : iconBack()}
            <Text style={styles.title}>{props.title}</Text>
         </View>
      </View>
   );
};

export default Header;
Header.defaultProps = {
   onPressBack: () => {},
   onPressMenu: () => {},
};
const styles = StyleSheet.create({
   container: {
      height: 48,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
      borderColor: colors.gray,
      borderBottomWidth: 1,
   },
   title: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   iconBack: {
      position: 'absolute',
      left: 0,
      height: 48,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
