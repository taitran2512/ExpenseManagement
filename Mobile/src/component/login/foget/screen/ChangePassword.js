import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Images from '../../../../res/image';
import { colors, fonts, screenWidth } from '../../../../res/style/theme';
import TextInputAnimated from '../../../custom/TextInputAnimated';

export default class ChangePassword extends React.PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         newPassword: '',
         confirmPassword: '',
      };
      this.getNewPassword = this.getNewPassword.bind(this);
      this.getConfirmPassword = this.getConfirmPassword.bind(this);
   }
   getNewPassword() {
      return this.state.newPassword;
   }
   getConfirmPassword() {
      return this.state.confirmPassword;
   }
   render() {
      return (
         <View style={styles.container}>
            <Image source={Images.ic_lock1} style={styles.logo} />
            <Text style={styles.title}>Xác thực thành công, bạn vui lòng thay đổi lại mật khẩu</Text>
            <TextInputAnimated
               isPassword
               label="Mật khẩu mới"
               style={styles.input}
               value={this.state.newPassword}
               onChangeText={(text) => this.setState({ newPassword: text })}
               onPressClear={() => this.setState({ newPassword: '' })}
            />
            <TextInputAnimated
               isPassword
               label="Nhập lại mật khẩu mới"
               style={styles.input}
               value={this.state.confirmPassword}
               onChangeText={(text) => this.setState({ confirmPassword: text })}
               onPressClear={() => this.setState({ confirmPassword: '' })}
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
