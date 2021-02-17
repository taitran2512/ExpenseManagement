import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   KeyboardAvoidingView,
   Image,
   ScrollView,
   Platform,
   TouchableOpacity,
} from 'react-native';
import Images from '../../res/image';
import { colors, screenWidth } from '../../res/style/theme';
import StatusBarView from '../custom/StatusBarView';
import TextInputAnimated from '../custom/TextInputAnimated';

export default class SignUp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         confirmPassword: '',
         fullname: '',
         dob: '',
         email: '',
         phone: '',
      };
   }
   //input text
   onChangeUsername = (text) => {
      this.setState({ username: text });
   };
   onChangeEmail = (text) => {
      this.setState({ email: text });
   };
   onChangeDOB = () => {
      this.setState({ /* dob: selectedDate,*/ isShowDatePicker: false });
   };
   onChangePhone = (text) => {
      this.setState({ phone: text });
   };
   onChangePassword = (text) => {
      this.setState({ password: text });
   };
   onChangeConfirmPassword = (text) => {
      this.setState({ confirmPassword: text });
   };
   ////clear text
   onClearUsername = () => {
      this.setState({ username: '' });
   };
   onClearEmail = () => {
      this.setState({ email: '' });
   };
   onClearPhone = () => {
      this.setState({ phone: '' });
   };
   onClearPassword = () => {
      this.setState({ password: '' });
   };
   onClearConfirmPassword = () => {
      this.setState({ confirmPassword: '' });
   };
   render() {
      return (
         <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <ScrollView
               showsVerticalScrollIndicator={false}
               style={styles.container}
               contentContainerStyle={{ flexGrow: 1 }}
               keyboardShouldPersistTaps="handled">
               <StatusBarView />
               <Image source={Images.signup_logo} style={styles.logo} />
               <Text style={styles.txtSignup}>Đăng ký tài khoản</Text>

               <TextInputAnimated
                  label="Tên đăng nhập"
                  style={styles.input}
                  value={this.state.username}
                  onChangeText={this.onChangeUsername}
                  onPressClear={this.onClearUsername}
               />
               <TextInputAnimated
                  label="Email"
                  style={styles.input}
                  value={this.state.email}
                  onChangeText={this.onChangeEmail}
                  onPressClear={this.onClearEmail}
               />
               <TextInputAnimated
                  label="Ngày sinh"
                  isPicker
                  onPress={() => this.setState({ isShowDatePicker: true })}
                  style={styles.input}
                  value={String(this.state.dob)}
                  onPressClear={this.onClearUsername}
               />

               <TextInputAnimated
                  label="Số điện thoại"
                  keyboardType="number-pad"
                  style={styles.input}
                  value={this.state.phone}
                  onChangeText={this.onChangePhone}
                  onPressClear={this.onClearPhone}
               />

               <TextInputAnimated
                  isPassword
                  style={styles.input}
                  label="Mật khẩu"
                  value={this.state.password}
                  onChangeText={this.onChangePassword}
                  onPressClear={this.onClearPassword}
               />
               <TextInputAnimated
                  isPassword
                  style={styles.input}
                  label="Nhập lại mật khẩu"
                  value={this.state.confirmPassword}
                  onChangeText={this.onChangeConfirmPassword}
                  onPressClear={this.onClearConfirmPassword}
               />
               <TouchableOpacity style={styles.btnSignup}>
                  <Text style={styles.txtBtn}>Đăng ký</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[styles.btnSignup, { backgroundColor: colors.cyan, marginBottom: 20 }]}
                  onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.txtBtn}>Quay lại đăng nhập</Text>
               </TouchableOpacity>
            </ScrollView>
         </KeyboardAvoidingView>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
   },
   logo: {
      width: screenWidth,
      height: screenWidth * 0.7,
      // resizeMode: 'contain',
   },
   txtSignup: {
      marginTop: 8,
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.green1,
      textAlign: 'center',
   },
   input: {
      marginTop: 20,
   },
   btnSignup: {
      height: 44,
      backgroundColor: colors.blue,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 16,
      marginTop: 20,
      borderRadius: 50,
   },
   txtBtn: {
      fontSize: 18,
      color: colors.white,
      fontWeight: 'bold',
   },
});
