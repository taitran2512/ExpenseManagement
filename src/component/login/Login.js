import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   TouchableNativeFeedback,
   Keyboard,
   Animated,
   ScrollView,
} from 'react-native';
import Images from '../../res/image';
import { colors, screenWidth } from '../../res/style/theme';
import StatusBarView from '../custom/StatusBarView';
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
   componentDidMount() {
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
   onClearUsername = () => {
      this.setState({ username: '' });
   };
   onClearPassword = () => {
      this.setState({ password: '' });
   };
   onChangePassword = (text) => {
      this.setState({ password: text });
   };
   onPressLogin = () => {
      this.props.navigation.replace('Home');
   };
   render() {
      return (
         <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <StatusBarView />
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
               onPressClear={this.onClearUsername}
            />
            <TextInputAnimated
               isPassword
               style={styles.input}
               label="Password"
               value={this.state.password}
               onChangeText={this.onChangePassword}
               onPressClear={this.onClearPassword}
            />
            <TouchableNativeFeedback onPress={this.onPressLogin}>
               <View style={styles.btnLogin}>
                  <Text style={styles.txtBtnLogin}>Đăng nhập</Text>
               </View>
            </TouchableNativeFeedback>
         </ScrollView>
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
