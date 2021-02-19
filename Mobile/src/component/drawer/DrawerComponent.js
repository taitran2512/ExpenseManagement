import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { userData } from '../../config/Config';
import Images from '../../res/image';
import { colors, fonts } from '../../res/style/theme';
import Header from '../custom/Header';

const listMenu = [
   { title: 'Đổi mật khẩu', icon: Images.ic_lock, screen: '', color: colors.cyan2 },
   { title: 'Xuất file Excel', icon: Images.ic_excel, screen: '', color: colors.green1 },
   { title: 'Thông tin chi tiết', icon: Images.ic_info, screen: '', color: colors.blue2 },
   { title: 'Hướng dẫn sử dụng', icon: Images.ic_guide, screen: '', color: colors.yellow },
   { title: 'Cài đặt', icon: Images.ic_setting, screen: '', color: colors.gray },
];

export default class DrawerComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   renderMenu = ({ item, index }) => (
      <Pressable android_ripple={{ color: colors.black_transparent }}>
         <View style={styles.itemMenu}>
            <Image style={styles.icon} source={item.icon} />
            <Text style={styles.txtMenu}>{item.title}</Text>
         </View>
      </Pressable>
   );
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
                     onPress={() => this.props.navigation.replace('Login')}>
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
