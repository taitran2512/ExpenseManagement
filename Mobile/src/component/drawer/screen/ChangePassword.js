import React, { Component } from 'react';
import {
   KeyboardAvoidingView,
   Image,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   ScrollView,
   Alert,
   Platform,
} from 'react-native';
import Header from '../../custom/Header';
import Images from '../../../res/image';
import { colors, fonts, screenWidth } from '../../../res/style/theme';
import TextInputAnimated from '../../custom/TextInputAnimated';
import LoadingView from '../../custom/LoadingView';
export default class ChangePassword extends Component {
   constructor(props) {
      super(props);
      this.state = {
         oldPassword: '',
         newPassword: '',
         confirmPassword: '',
      };
   }

   componentDidMount() {
      console.log(this.props.status, 'status');
   }

   componentDidUpdate(prevProps) {
      if (prevProps.status !== this.props.status && this.props.status !== null) {
         if (this.props.status === 'success') {
            setTimeout(() => {
               Alert.alert(
                  'Thông báo',
                  this.props.message,
                  [{ text: 'OK', onPress: () => this.props.navigation.goBack() }],
                  { cancelable: false },
               );
            }, 10);
         } else {
            setTimeout(() => {
               Alert.alert('Thông báo', this.props.message);
            }, 10);
         }
      }
   }

   onPressApply = () => {
      if (this.state.oldPassword == '' || this.state.oldPassword === '' || this.state.newPassword === '') {
         Alert.alert('Lưu ý', 'Bạn phải nhập đầy đủ thông tin');
      } else {
         this.props.changePasswordAction(this.state.oldPassword, this.state.newPassword);
      }
   };

   // OnChangeText
   onChangeOldPassword = (text) => {
      this.setState({ oldPassword: text });
   };
   onChangeNewPassword = (text) => {
      this.setState({ newPassword: text });
   };
   onChangeConfirmPassword = (text) => {
      this.setState({ confirmPassword: text });
   };

   // OnChangeClearText
   onClearOldPassword = (text) => {
      this.setState({ oldPassword: '' });
   };
   onClearNewPassword = (text) => {
      this.setState({ newPassword: '' });
   };
   onClearConfirmPassword = (text) => {
      this.setState({ confirmPassword: '' });
   };

   render() {
      const { oldPassword, newPassword, confirmPassword } = this.state;
      return (
         <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <Header isShowBack onPressBack={() => this.props.navigation.goBack()} title="Đổi mật khẩu" />
            <LoadingView visible={this.props.loading} />
            <ScrollView
               style={styles.container}
               keyboardShouldPersistTaps="handled"
               showsVerticalScrollIndicator={false}>
               <Image style={styles.img} source={Images.ic_changepassword} />
               <TextInputAnimated
                  label="Mật khẩu cũ"
                  style={styles.input}
                  isPassword
                  value={oldPassword}
                  onChangeText={this.onChangeOldPassword}
                  onPressClear={this.onClearOldPassword}
               />

               <TextInputAnimated
                  label="Mật khẩu mới"
                  style={styles.input}
                  isPassword
                  value={newPassword}
                  onChangeText={this.onChangeNewPassword}
                  onPressClear={this.onClearNewPassword}
               />

               <TextInputAnimated
                  label="Nhập lại mật khẩu mới"
                  style={styles.input}
                  isPassword
                  value={confirmPassword}
                  onChangeText={this.onChangeConfirmPassword}
                  onPressClear={this.onClearConfirmPassword}
               />
               <TouchableOpacity
                  style={[styles.btnLogin, { backgroundColor: colors.app }]}
                  onPress={this.onPressApply}>
                  <Text style={styles.txtBtnLogin}>Xác nhận</Text>
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
   img: {
      width: '100%',
      height: screenWidth * 0.5,
      alignSelf: 'center',
   },
   input: {
      marginTop: 20,
   },
   btnLogin: {
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 16,
      marginTop: 20,
      borderRadius: 50,
   },
   txtBtnLogin: {
      fontSize: 18,
      color: colors.white,
      fontFamily: fonts.bold,
   },
});
