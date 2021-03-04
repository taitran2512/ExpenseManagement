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
const logoSize = screenWidth * 0.5;
const duration = 350;
export default class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         saveLogin: false,
      };
      this.zoomLogo = new Animated.Value(logoSize);
      this.keyboardDidShow = this.keyboardDidShow.bind(this);
      this.keyboardDidHide = this.keyboardDidHide.bind(this);
   }
   async componentDidMount() {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);

      //get username and password remember login
      try {
         const jsonValue = await AsyncStorage.getItem('@saveLogin');
         if (jsonValue != null) {
            var data = JSON.parse(jsonValue);
            this.setState({ username: data.username, password: data.password, saveLogin: true });
         }
      } catch (e) {
         // error reading value
      }
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
         Alert.alert('Lưu ý', 'Bạn phải nhập đầy đủ thông tin đăng nhập');
      } else {
         this.props.loginAction(this.state.username, this.state.password);
      }
   };
   ///////////////////////////////
   async componentDidUpdate(prevProps) {
      if (this.props.status !== null && this.props.status !== prevProps.status) {
         if (this.props.status === 'success') {
            this.saveLogin();
            this.props.navigation.replace('Home');
         } else {
            setTimeout(() => {
               Alert.alert('Thông báo', this.props.message);
            }, 10);
         }
      }
      if (this.props.error !== null && this.props.error !== prevProps.error) {
         setTimeout(() => {
            Alert.alert('Thông báo', this.props.error);
         }, 10);
      }
   }
   render() {
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
               style={[styles.logo, { height: this.zoomLogo, width: this.zoomLogo }]}
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
                  color={colors.blue}
               />
               <Text style={styles.txtSave}>Ghi nhớ đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLogin} onPress={this.onPressLogin}>
               <Text style={styles.txtBtnLogin}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={[styles.btnLogin, { backgroundColor: colors.green1 }]}
               onPress={() => this.props.navigation.navigate('SignUp')}>
               <Text style={styles.txtBtnLogin}>Đăng ký</Text>
            </TouchableOpacity>
            {/* ////////////////////// */}
            {/* <View style={styles.view}>
               <TouchableOpacity
                  style={styles.subView}
                  onPress={() => this.props.navigation.navigate('Forget')}>
                  <Text style={styles.txtsignup}>Quên mật khẩu</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.subView}
                  onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text style={styles.txtsignup}>Đăng ký</Text>
               </TouchableOpacity>
            </View> */}
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
      color: colors.blue,
      marginLeft: 8,
      fontFamily: fonts.medium,
   },
});
