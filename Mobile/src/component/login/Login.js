import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Keyboard,
   Animated,
   ScrollView,
   TouchableOpacity,
   Alert,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Images from '../../res/image';
import { colors, fonts, screenWidth } from '../../res/style/theme';
import StatusBarView from '../custom/StatusBarView';
import TextInputAnimated from '../custom/TextInputAnimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingView from '../custom/LoadingView';
import { emtyValue } from '../../res/function/Functions';
import TouchID from 'react-native-touch-id';
import { userData } from '../../config/Config';
const logoSize = screenWidth * 0.7;
const duration = 350;

const fingerConig = {
   title: 'Xác thực vân tay',
   imageColor: colors.blue,
   imageErrorColor: colors.red,
   sensorDescription: 'Chạm vào cảm biến',
   sensorErrorDescription: 'Vân tay không đúng',
   cancelText: 'Hủy bỏ',
};

export default class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         saveLogin: false,
      };
      this.zoomLogo = new Animated.Value(0);
      this.keyboardDidShow = this.keyboardDidShow.bind(this);
      this.keyboardDidHide = this.keyboardDidHide.bind(this);
   }
   componentDidMount() {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
      this.isSupportBio();
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
         toValue: 1,
         duration: duration,
         useNativeDriver: false,
      }).start();
   };

   //phong to logo
   zoomInLogo = () => {
      Animated.timing(this.zoomLogo, {
         toValue: 0,
         duration: duration,
         useNativeDriver: false,
      }).start();
   };
   // xác định dt có hỗ trợ vân tay ko
   isSupportBio = () => {
      const optionalConfigObject = {
         unifiedErrors: false, // use unified error messages (default false)
         passcodeFallback: true, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
      };
      TouchID.isSupported(optionalConfigObject)
         .then((biometryType) => {
            //nếu dt hỗ trợ vân tay/face id
            userData.BIOMETRICS = biometryType;
            this.getValueBio();
         })
         .catch((error) => {
            // nếu dt ko hỗ trợ vân tay/face id thì login bình thường
            userData.BIOMETRICS = '';
            this.getValueLogin();
         });
   };
   //get username and password remember login
   getValueLogin = async () => {
      try {
         const jsonValue = await AsyncStorage.getItem('@saveLogin');
         if (jsonValue != null) {
            var data = JSON.parse(jsonValue);
            this.setState({ username: data.username, password: data.password, saveLogin: true });
            if (!emtyValue(data.password) && !emtyValue(data.username)) {
               this.props.loginAction(data.username, data.password);
            }
         }
      } catch (e) {
         // error reading value
      }
   };
   //get value turn on or off Biometrics and authenticate
   getValueBio = async () => {
      try {
         const value = await AsyncStorage.getItem('@biometric');
         if (value !== null) {
            //nếu tài khoản có mở đăng nhập vân tay/face id thì bắt đầu xác thực
            if (value === 'on') {
               TouchID.authenticate('', fingerConig)
                  .then((success) => {
                     this.getValueLogin();
                  })
                  .catch(async (error) => {
                     if (error.code === 'AUTHENTICATION_CANCELED') {
                        Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu để tiếp tục');
                        const jsonValue = await AsyncStorage.getItem('@saveLogin');
                        if (jsonValue != null) {
                           var data = JSON.parse(jsonValue);
                           this.setState({
                              username: data.username,
                              saveLogin: true,
                           });
                        }
                     }
                  });
            } else {
               //không mở thì đăng nhập bình thường
               this.getValueLogin();
            }
         } else {
            this.getValueLogin();
         }
      } catch (e) {
         // error reading value
      }
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

   //remember login
   onPressSaveLogin = () => {
      this.setState({ saveLogin: !this.state.saveLogin }, async () => {
         if (!this.state.saveLogin) {
            try {
               await AsyncStorage.removeItem('@saveLogin');
            } catch (e) {
               // remove error
            }
         }
      });
   };
   saveLogin = async () => {
      if (this.state.saveLogin) {
         try {
            const jsonValue = JSON.stringify({
               username: this.state.username,
               password: this.state.password,
            });
            await AsyncStorage.setItem('@saveLogin', jsonValue);
         } catch (e) {
            // saving error
         }
      }
   };
   //press login
   onPressLogin = () => {
      if (this.state.username === '' || this.state.password === '') {
         // Alert.alert('Lưu ý', 'Bạn phải nhập đầy đủ thông tin đăng nhập');
         this.props.showAlertAction('warn', 'Bạn phải nhập đầy đủ thông tin đăng nhập');
      } else {
         this.props.loginAction(this.state.username, this.state.password);
      }
   };
   ///////////////////////////////
   componentDidUpdate(prevProps) {
      if (this.props.status !== null && this.props.status !== prevProps.status) {
         if (this.props.status === 'success') {
            this.saveLogin();
            this.props.navigation.replace('Home');
         } else {
            this.props.showAlertAction('error', this.props.message);
         }
      }
      if (this.props.error !== null && this.props.error !== prevProps.error) {
         setTimeout(() => {
            this.props.showAlertAction('error', this.props.error);
         }, 10);
      }
   }
   render() {
      const logoWidth = this.zoomLogo.interpolate({
         inputRange: [0, 1],
         outputRange: [logoSize, logoSize / 2],
      });
      const logoHeight = this.zoomLogo.interpolate({
         inputRange: [0, 1],
         outputRange: [logoSize * 0.65, (logoSize * 0.65) / 2],
      });
      return (
         <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled">
            <StatusBarView />
            <LoadingView visible={this.props.loading} />
            {/* /////////logo////////// */}
            <Animated.Image
               source={Images.wallet}
               style={[styles.logo, { height: logoHeight, width: logoWidth }]}
            />
            {/* /////////////////////////// */}
            <Text style={styles.login}>Expense Management</Text>
            <TextInputAnimated
               label="Tên đăng nhập hoặc Email"
               style={styles.input}
               value={this.state.username}
               onChangeText={this.onChangeUsername}
               onPressClear={this.onClearUsername}
            />
            <TextInputAnimated
               isPassword
               style={styles.input}
               label="Mật khẩu"
               value={this.state.password}
               onChangeText={this.onChangePassword}
               onPressClear={this.onClearPassword}
            />
            {/* ////////////////////////// */}
            <TouchableOpacity style={styles.save} onPress={this.onPressSaveLogin}>
               <FontAwesome5Icon
                  name={this.state.saveLogin ? 'check-circle' : 'circle'}
                  size={16}
                  color={colors.app}
               />
               <Text style={[styles.txtSave, { color: colors.app }]}>Ghi nhớ đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={[styles.btnLogin, { backgroundColor: colors.app }]}
               onPress={this.onPressLogin}>
               <Text style={styles.txtBtnLogin}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={[styles.btnLogin, { backgroundColor: colors.green1 }]}
               onPress={() => this.props.navigation.navigate('SignUp')}>
               <Text style={styles.txtBtnLogin}>Đăng ký</Text>
            </TouchableOpacity>
            {/* ////////////////////// */}
            {/* 
               <TouchableOpacity
                  style={styles.subView}
                  onPress={() => this.props.navigation.navigate('Forget')}>
                  <Text style={styles.txtsignup}>Quên mật khẩu</Text>
               </TouchableOpacity>
                */}
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
      marginVertical: 16,
   },
   btnLogin: {
      height: 44,
      backgroundColor: colors.app,
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
   view: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
   },
   subView: {
      height: 44,
      borderRadius: 50,
      backgroundColor: colors.green1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '47%',
   },
   txtsignup: {
      fontSize: 16,
      textAlign: 'center',
      color: colors.white,
      fontFamily: fonts.semibold,
   },
   save: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 28,
      marginTop: 12,
   },
   txtSave: {
      fontSize: 16,
      color: colors.app,
      marginLeft: 8,
      fontFamily: fonts.medium,
   },
});
