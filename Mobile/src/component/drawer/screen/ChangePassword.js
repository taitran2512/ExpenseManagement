import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from '../../custom/Header';
import Images from '../../../res/image';
import { colors, fonts, screenWidth } from '../../../res/style/theme';
import TextInputAnimated from '../../custom/TextInputAnimated';
import { userData } from '../../../config/Config';
import LoadingView from '../../custom/LoadingView';
export default class ChangePassword extends Component {
   constructor(props) {
      super(props);
      this.state = {
         oldPassword: '',
         newPassword: '',
         confirmPassword: '',
         _id: userData._id,
      };
   }

   componentDidMount() {
      console.log(this.props.status, 'status');
   }

   componentDidUpdate(prevProps) {
      if (prevProps.status !== this.props.status && this.props.status !== null) {
         if (this.props.status === 'success') {
            Alert.alert(
               'Cập nhật mật khẩu thành công',
               '',
               [{ text: 'OK', onPress: () => this.props.navigation.replace('Home') }],
               { cancelable: false },
            );
         } else {
            setTimeout(() => {
               Alert.alert('Thông báo', this.props.message);
            }, 10);
         }
      }
   }

   onPressApply = () => {
      this.props.changePasswordAction(this.state._id, this.state.oldPassword, this.state.newPassword);
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
         <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <LoadingView visible={this.props.loading} />
            <Header isShowBack onPressBack={() => this.props.navigation.goBack()} title="Đổi mật khẩu" />
            <Image style={styles.img} source={Images.ic_changepassword} />

            <TextInputAnimated
               label="Mật khẩu củ"
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
               label="Nhập lại mật khẩu mơi"
               style={styles.input}
               isPassword
               value={confirmPassword}
               onChangeText={this.onChangeConfirmPassword}
               onPressClear={this.onClearConfirmPassword}
            />
            <TouchableOpacity style={styles.btnLogin} onPress={this.onPressApply}>
               <Text style={styles.txtBtnLogin}>Xác nhận</Text>
            </TouchableOpacity>
         </ScrollView>
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
      backgroundColor: colors.blue,
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
