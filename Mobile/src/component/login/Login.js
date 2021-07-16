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
   Image,
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
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import NotifService from './custom/NotifService';
import Matomo from '@valleyelectronics/react-native-matomo';
import I18n from '../../config/i18n';
const logoSize = screenWidth * 0.7;
const duration = 200;

const fingerConig = {
   title: 'Xác thực vân tay',
   imageColor: colors.blue,
   imageErrorColor: colors.red,
   sensorDescription: 'Chạm vào cảm biến',
   sensorErrorDescription: 'Vân tay không đúng',
   cancelText: 'Hủy bỏ',
};

GoogleSignin.configure({
   offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

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

      //push noti
      this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
   }

   //push noti
   onRegister(token) {
      this.setState({ registerToken: token.token, fcmRegistered: true });
   }

   onNotif(notif) {
      //Alert.alert(notif.title, notif.message);
   }

   handlePerm(perms) {
      Alert.alert('Permissions', JSON.stringify(perms));
   }
   //

   componentDidMount() {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
      this.isSupportBio();
      this.notif.requestPermissions(); //yêu cầu quyền cho push noti
      this.notif.abandonPermissions(); //chấp nhận quyền cho push noti

      // //Tạo local noti
      // this.notif.sendNotiLocal(
      //    title = I18n.t('noti_title'),
      //    message = I18n.t('noti_message')
      // );
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
                        //Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu để tiếp tục');
                        this.props.showAlertAction('warn', 'Vui lòng nhập mật khẩu để tiếp tục');
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

   //onChange
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
         this.props.showAlertAction('warn', 'Bạn phải nhập đầy đủ thông tin đăng nhập');
      } else {
         this.props.loginAction(this.state.username, this.state.password);
      }
   };

   //Login with Facebook
   loginFB = () => {
      //Phải logout trước để không bị lỗi: User logged in as different Facebook user.
      LoginManager.logOut();
      //Đôi lúc Facebook không get được email
      LoginManager.logInWithPermissions(['public_profile', 'email'])
         .then((result) => {
            if (result.isCancelled) {
            } else {
               AccessToken.getCurrentAccessToken().then((data) => {
                  fetch(
                     'https://graph.facebook.com/v10.0/me?fields=email,name,friends&access_token=' +
                        data.accessToken,
                  )
                     .then((response) => response.json())
                     .then((userProfile) => {
                        const inputData = {
                           _id: userProfile.id,
                           fullname: userProfile.name,
                           email: userProfile.email,
                           socialType: 'facebook',
                        };
                        this.props.loginSocialAction(inputData);
                     })
                     .catch((error) => {
                        this.props.showAlertAction('error', 'Đăng nhập facebook thất bại');
                     });
               });
            }
         })
         .catch((error) => {
            console.log('==> Login Facebook failed:' + error);
         });
   };

   //Login with Google
   loginGoogle = async () => {
      try {
         await GoogleSignin.signOut();
         await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
         const userInfo = await GoogleSignin.signIn();
         const inputData = {
            _id: userInfo.user.id,
            fullname: userInfo.user.name,
            email: userInfo.user.email,
            socialType: 'google',
         };
         this.props.loginSocialAction(inputData);
      } catch (error) {
         // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
         // } else if (error.code === statusCodes.IN_PROGRESS) {
         // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
         //    Alert.alert('Thông báo', 'Bạn chưa cài Google Services', [{ text: 'OK' }], { cancelable: false });
         // } else {
         //    Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại sau', [{ text: 'OK' }], {
         //       cancelable: false,
         //    });
         // }
         this.props.showAlertAction('error', 'Đăng nhập google thất bại');
      }
   };
   matomoTracker = (_id) => {
      Matomo.initTracker('https://tatt19.matomo.cloud/matomo.php', 1);
		Matomo.setUserId(_id);
		Matomo.setCustomDimension(1, 'abc');
   };
   ///////////////////////////////
   componentDidUpdate(prevProps) {
      //login with account
      if (this.props.status !== null && this.props.status !== prevProps.status) {
         if (this.props.status === 'success') {
            this.saveLogin();
            this.matomoTracker(this.props.data?._id);
            this.props.navigation.replace('Home');
         } else {
            this.props.showAlertAction('error', this.props.message);
         }
      }
      //login with social account
      if (this.props.statusSocial !== null && this.props.statusSocial !== prevProps.statusSocial) {
         if (this.props.statusSocial === 'success') {
            this.props.navigation.replace('Home');
         } else {
            this.props.showAlertAction('error', this.props.messageSocial);
         }
      }
      //lỗi login
      if (
         (this.props.error !== null && this.props.error !== prevProps.error) ||
         (this.props.errorSocial !== null && this.props.errorSocial !== prevProps.errorSocial)
      ) {
         this.props.showAlertAction('error', 'Lỗi, vui lòng thử lại sau');
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
            <LoadingView visible={this.props.loading || this.props.loadingSocial} />
            {/* /////////logo////////// */}
            <Animated.Image
               source={Images.wallet}
               style={[styles.logo, { height: logoHeight, width: logoWidth }]}
            />
            {/* /////////////////////////// */}
            <Text style={styles.login}>MY E WALLET</Text>
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
            {/* //////////// FOOTER ////////// */}
            <View style={styles.footerView}>
               <TouchableOpacity onPress={this.loginFB}>
                  <Image source={Images.ic_facebook} style={styles.sizeIcon} />
               </TouchableOpacity>
               <TouchableOpacity onPress={this.loginGoogle}>
                  <Image source={Images.ic_google} style={styles.sizeIcon} />
               </TouchableOpacity>
            </View>

            {/* <TouchableOpacity style={styles.subView} onPress={() => this.props.navigation.navigate('Forget')}>
               <Text style={styles.txtsignup}>Quên mật khẩu</Text>
            </TouchableOpacity> */}
         </ScrollView>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flexGrow: 1,
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
   footerView: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 20,
   },
   sizeIcon: {
      height: 70,
      width: 70,
   },
});
