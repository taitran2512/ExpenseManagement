import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Images from '../../../../res/image';
import { colors, screenWidth, fonts } from '../../../../res/style/theme';

export default class VerifyOTP extends React.PureComponent {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <View style={styles.container}>
            <Image source={Images.ic_pin} style={styles.logo} />
            <Text style={styles.title}>Bạn vui lòng nhập mã OTP để xác thực</Text>
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.white,
      width: screenWidth,
   },
   logo: {
      width: screenWidth * 0.5,
      height: screenWidth * 0.5,
      alignSelf: 'center',
   },
   title: {
      textAlign: 'center',
      paddingHorizontal: 50,
      fontSize: 20,
      fontFamily: fonts.bold,
      marginTop: 20,
   },
   input: {
      marginTop: 20,
   },
});
