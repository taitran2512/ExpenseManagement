import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, Alert } from 'react-native';
import { userData } from '../../config/Config';
import Images from '../../res/image';
import { colors, fonts } from '../../res/style/theme';
import Header from '../custom/Header';

const listMenu = [
   { title: 'Thông tin cá nhân', icon: Images.ic_user_info, screen: 'UserInfo' },
   { title: 'Đổi mật khẩu', icon: Images.ic_lock, screen: 'ChangePassword' },
   { title: 'Xuất file Excel', icon: Images.ic_excel, screen: '' },
   { title: 'Hướng dẫn sử dụng', icon: Images.ic_guide, screen: '' },
   { title: 'Cài đặt', icon: Images.ic_setting, screen: 'Setting' },
   { title: 'Thông tin ứng dụng', icon: Images.ic_info, screen: 'InfoApp' },
];

export default class DrawerComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   renderMenu = ({ item, index }) => (
      <Pressable
         android_ripple={{ color: colors.black_transparent }}
         onPress={() => {
            if (item.screen === '') {
               Alert.alert('Thông báo', 'Chức năng đang được cập nhật');
            } else {
               this.props.navigation.navigate(item.screen);
            }
         }}>
         <View style={styles.itemMenu}>
            <Image style={styles.icon} source={item.icon} />
            <Text style={styles.txtMenu}>{item.title}</Text>
         </View>
      </Pressable>
   );
   logOut = () => {
      Alert.alert('Thông báo', 'Bạn có muốn đăng xuất', [
         { text: 'Cancel', style: 'cancel' },
         {
            text: 'ok',
            onPress: async () => {
               try {
                  const jsonValue = JSON.stringify({
                     username: userData.username,
                     password: '',
                  });
                  await AsyncStorage.setItem('@saveLogin', jsonValue);
               } catch (e) {
                  // saving error
               }
               this.props.navigation.replace('Login');
               this.props.logoutAction();
            },
         },
      ]);
   };
   render() {
      return (
         <View style={{ flex: 1 }}>
            <Header title={`Xin chào ${userData.fullname}`} />
            <FlatList
               data={listMenu}
               keyExtractor={(item, index) => String(index)}
               renderItem={this.renderMenu}
               ListFooterComponent={
                  <Pressable
                     android_ripple={{ color: colors.black_transparent }}
                     style={styles.itemMenu}
                     onPress={this.logOut}>
                     <Image style={styles.icon} source={Images.ic_exit} />
                     <Text style={styles.txtMenu}>Đăng xuất</Text>
                  </Pressable>
               }
            />
         </View>
      );
   }
}
const styles = StyleSheet.create({
   itemMenu: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderColor: colors.gray2,
      borderBottomWidth: 1,
      paddingHorizontal: 16,
   },
   txtMenu: {
      fontSize: 16,
      marginLeft: 16,
      fontFamily: fonts.medium,
   },
   icon: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
   },
});
