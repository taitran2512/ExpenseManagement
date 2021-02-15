import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   StatusBar,
   Image,
   TouchableNativeFeedback,
   SafeAreaView,
   KeyboardAvoidingView,
   TouchableWithoutFeedback,
   Keyboard,
   Animated,
} from 'react-native';
import Images from '../../res/image';
import { colors, screenWidth } from '../../res/style/theme';
import TextInputAnimated from '../custom/TextInputAnimated';

const logoSize = screenWidth * 0.5;
const duration = 350;
export default class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
      };
      this.zoomLogo = new Animated.Value(logoSize);
      this.keyboardDidShow = this.keyboardDidShow.bind(this);
      this.keyboardDidHide = this.keyboardDidHide.bind(this);
   }
   componentWillMount() {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
   }
   componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
   }
   keyboardDidShow() {
      this.zoomOutLogo();
   }
   keyboardDidHide() {
      this.zoomInLogo();
   }
   //thu nho logo
   zoomOutLogo = () => {
      Animated.timing(this.zoomLogo, {
         toValue: logoSize / 2,
         duration: duration,
         useNativeDriver: false,
      }).start();
   };

   //phong to logo
   zoomInLogo = () => {
      Animated.timing(this.zoomLogo, {
         toValue: logoSize,
         duration: duration,
         useNativeDriver: false,
      }).start();
   };

   //
   onChangeUsername = (text) => {
      this.setState({ username: text });
   };

   onChangePassword = (text) => {
      this.setState({ password: text });
   };
   onPressLogin = () => {
      this.props.navigation.navigate('Home');
   };
   render() {
      return (
         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
               <SafeAreaView />
               <StatusBar
                  barStyle="dark-content"
                  backgroundColor={'transparent'}
                  hidden={false}
                  translucent={true}
               />
               <View style={{ height: StatusBar.currentHeight, backgroundColor: colors.white }} />
               {/* /////////logo////////// */}
               <Animated.Image
                  source={Images.wallet}
                  style={[styles.logo, { height: this.zoomLogo, width: this.zoomLogo }]}
               />
               {/* /////////////////////////// */}
               <Text style={styles.login}>Expense Management</Text>
               <TextInputAnimated
                  label="Username"
                  style={styles.input}
                  value={this.state.username}
                  onChangeText={this.onChangeUsername}
               />
               <TextInputAnimated
                  isPassword
                  style={styles.input}
                  label="Password"
                  value={this.state.password}
                  onChangeText={this.onChangePassword}
               />
               <TouchableNativeFeedback onPress={this.onPressLogin}>
                  <View style={styles.btnLogin}>
                     <Text style={styles.txtBtnLogin}>Đăng nhập</Text>
                  </View>
               </TouchableNativeFeedback>
            </KeyboardAvoidingView>
         </TouchableWithoutFeedback>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
   },
   input: {
      marginTop: 20,
   },
   logo: {
      alignSelf: 'center',
      marginTop: 20,
   },
   login: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.red2,
      textAlign: 'center',
      marginVertical: 32,
   },
   btnLogin: {
      height: 44,
      backgroundColor: colors.blue,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 16,
      marginTop: 20,
      borderRadius: 8,
   },
   txtBtnLogin: {
      fontSize: 18,
      color: colors.white,
      fontWeight: 'bold',
   },
});
