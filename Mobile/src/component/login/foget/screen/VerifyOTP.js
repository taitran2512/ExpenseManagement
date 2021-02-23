import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Images from '../../../../res/image';
import { colors, screenWidth, fonts } from '../../../../res/style/theme';
import TextInputAnimated from '../../../custom/TextInputAnimated';

export default class VerifyOTP extends React.PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         otp: '',
      };
      this.getOTP = this.getOTP.bind(this);
   }
   getOTP() {
      return this.state.otp;
   }
   render() {
      return (
         <View style={styles.container}>
            <Image source={Images.ic_pin} style={styles.logo} />
            <Text style={styles.title}>
               Bạn vui lòng nhập mã OTP đã được gửi đến email của bạn để xác thực
            </Text>
            <TextInputAnimated
               label="Mã OTP"
               keyboardType="number-pad"
               maxLength={6}
               style={styles.input}
               value={this.state.otp}
               onChangeText={(text) => this.setState({ otp: text })}
               onPressClear={() => this.setState({ otp: '' })}
            />
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
      paddingHorizontal: 32,
      fontSize: 20,
      fontFamily: fonts.bold,
      marginTop: 20,
   },
   input: {
      marginTop: 20,
   },
});
