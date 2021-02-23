import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, FlatList, Alert } from 'react-native';
import { colors } from '../../../res/style/theme';
import { validEmail } from '../../../res/function/Functions';
import FooterButton from '../../custom/FooterButton';
import Header from '../../custom/Header';
import SendEmail from './screen/SendEmail';
import VerifyOTP from './screen/VerifyOTP';
import ChangePassword from './screen/ChangePassword';
import LoadingView from '../../custom/LoadingView';
export default class Forget extends Component {
   constructor(props) {
      super(props);
      this.state = {
         pageIndex: 0,
      };

      this.FooterButton = React.createRef();
      this.SendEmail = React.createRef();
      this.VerifyOTP = React.createRef();
      this.ChangePassword = React.createRef();
      this.slide = React.createRef();

      this.dataScreen = [
         { screen: <SendEmail {...this.props} ref={this.SendEmail} /> },
         { screen: <VerifyOTP {...this.props} ref={this.VerifyOTP} /> },
         { screen: <ChangePassword {...this.props} ref={this.ChangePassword} /> },
      ];
   }
   onPressBack = () => {
      switch (this.state.pageIndex) {
         case 0:
            break;
         case 1:
            this.setState({ pageIndex: 0 }, () => {
               this.slide.current.scrollToIndex({ index: this.state.pageIndex });
            });
            break;
         case 2:
            this.setState({ pageIndex: 1 }, () => {
               this.slide.current.scrollToIndex({ index: this.state.pageIndex });
            });
            break;
      }
   };
   onPressNext = () => {
      switch (this.state.pageIndex) {
         case 0:
            if (!validEmail(this.SendEmail.current.getEmail())) {
               Alert.alert('Thông báo', 'Email không hợp lệ');
            } else {
               this.props.sendOTPAction(this.SendEmail.current.getEmail());
            }
            break;
         case 1:
            if (this.VerifyOTP.current.getOTP().length < 6) {
               Alert.alert('Thông báo', 'Mã OTP không hợp lệ');
            } else {
               this.props.verifyOTPAction(this.props.sendOtp._id, this.VerifyOTP.current.getOTP());
            }
            break;
         case 2:
            if (
               this.ChangePassword.current.getPassword().length === 0 ||
               this.ChangePassword.current.getConfirmPassword().length === 0
            ) {
               Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ');
            } else {
               if (
                  this.ChangePassword.current.getPassword() !==
                  this.ChangePassword.current.getConfirmPassword()
               ) {
                  Alert.alert('Thông báo', 'Mật khẩu nhập lại không trùng khớp');
               } else {
                  this.props.createNewPassAction(
                     this.props.sendOtp._id,
                     this.ChangePassword.current.getPassword(),
                  );
               }
            }
            break;
      }
   };

   sendOtp = (prevProps) => {
      if (this.props.sendOtp.status !== null && this.props.sendOtp.status !== prevProps.sendOtp.status) {
         if (this.props.sendOtp.status === 'success') {
            this.setState({ pageIndex: 1 }, () => {
               this.slide.current.scrollToIndex({ index: this.state.pageIndex });
               // this.FooterButton.current.showBack();
            });
         } else {
            Alert.alert('Thông báo', this.props.sendOtp.message);
         }
      }
   };

   verifyOtp = (prevProps) => {
      if (
         this.props.verifyOtp.status !== null &&
         this.props.verifyOtp.status !== prevProps.verifyOtp.status
      ) {
         if (this.props.verifyOtp.status === 'success') {
            this.setState({ pageIndex: 2 }, () => {
               this.slide.current.scrollToIndex({ index: this.state.pageIndex });
            });
         } else {
            Alert.alert('Thông báo', this.props.verifyOtp.message);
         }
      }
   };
   createNewPass = (prevProps) => {
      if (
         this.props.createNewPass.status !== null &&
         this.props.createNewPass.status !== prevProps.createNewPass.status
      ) {
         if (this.props.createNewPass.status === 'success') {
         } else {
            Alert.alert(
               'Thông báo',
               this.props.createNewPass.message,
               [{ text: 'OK', onPress: () => this.props.navigation.goBack() }],
               { cancelable: false },
            );
         }
      }
   };
   componentDidUpdate(prevProps) {
      this.sendOtp(prevProps);
      this.verifyOtp(prevProps);
      this.createNewPass(prevProps);
   }
   render() {
      return (
         <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <Header isShowBack onPressBack={() => this.props.navigation.goBack()} title="Quên mật khẩu" />
            <LoadingView
               visible={
                  this.props.sendOtp.loading ||
                  this.props.verifyOtp.loading ||
                  this.props.createNewPass.loading
               }
            />
            <View style={styles.container}>
               <FlatList
                  ref={this.slide}
                  data={this.dataScreen}
                  keyExtractor={(item, index) => String(index)}
                  keyboardShouldPersistTaps="handled"
                  scrollEnabled={false}
                  contentContainerStyle={{ flexGrow: 1 }}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => item.screen}
               />
            </View>
            <FooterButton
               ref={this.FooterButton}
               onPressNext={this.onPressNext}
               onPressBack={this.onPressBack}
            />
         </KeyboardAvoidingView>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
   },
});
