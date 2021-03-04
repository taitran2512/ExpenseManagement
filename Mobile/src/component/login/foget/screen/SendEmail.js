import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Images from '../../../../res/image';
import { colors, fonts, screenWidth } from '../../../../res/style/theme';
import TextInputAnimated from '../../../custom/TextInputAnimated';

export default class SendEmail extends React.PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
      };
      this.getEmail = this.getEmail.bind(this);
   }
   getEmail() {
      return this.state.email;
   }
   render() {
      return (
         <View style={styles.container}>
            <Image source={Images.ic_mail1} style={styles.logo} />
            <Text style={styles.title}>Bạn vui lòng nhập Email đã đăng kí tài khoản</Text>
            <TextInputAnimated
               label="Email"
               style={styles.input}
               value={this.state.email}
               onChangeText={(text) => this.setState({ email: text })}
               onPressClear={() => this.setState({ email: '' })}
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
