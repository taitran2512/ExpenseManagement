import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { colors } from '../../../res/style/theme';
import { validEmail } from '../../../res/function/Functions';
import FooterButton from '../../custom/FooterButton';
import Header from '../../custom/Header';
import SendEmail from './screen/SendEmail';
import VerifyOTP from './screen/VerifyOTP';
import ChangePassword from './screen/ChangePassword';
import AlertDialog from '../../custom/AlertDialog';

export default class Forget extends Component {
   constructor(props) {
      super(props);
      this.state = {};

      this.FooterButton = React.createRef();
      this.SendEmail = React.createRef();
      this.VerifyOTP = React.createRef();
      this.ChangePassword = React.createRef();
      this.slide = React.createRef();
      this.alert = React.createRef();

      this.dataScreen = [
         { screen: <SendEmail {...this.props} ref={this.SendEmail} /> },
         { screen: <VerifyOTP {...this.props} ref={this.VerifyOTP} /> },
         { screen: <ChangePassword {...this.props} ref={this.ChangePassword} /> },
      ];
   }
   onPressBack = () => {
      this.FooterButton.current.hideBack();
      this.slide.current.scrollToIndex({ index: 0 });
   };
   onPressNext = () => {
      if (!validEmail(this.SendEmail.current.getEmail())) {
         this.alert.current.open('ok', 'error', 'Email không hợp lệ');
      } else {
         this.FooterButton.current.showBack();
         this.slide.current.scrollToIndex({ index: 2 });
      }
   };

   render() {
      return (
         <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <Header isShowBack onPressBack={() => this.props.navigation.goBack()} title="Quên mật khẩu" />
            <AlertDialog />
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
            <AlertDialog ref={this.alert} />
            <FooterButton
               ref={this.FooterButton}
               time={150}
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
