import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { colors } from '../../res/style/theme';
import Header from '../custom/Header';

const listMenu = [
   { title: 'Đổi mật khẩu', icon: 'user-lock', screen: '', color: colors.cyan2 },
   { title: 'Xuất file Excel', icon: 'file-excel', screen: '', color: colors.green1 },
   { title: 'Thông tin chi tiết', icon: 'info-circle', screen: '', color: colors.blue2 },
   { title: 'Hướng dẫn sử dụng', icon: 'chalkboard-teacher', screen: '', color: colors.yellow },
];

export default class DrawerComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   renderMenu = ({ item, index }) => (
      <Pressable android_ripple={{ color: colors.black_transparent }}>
         <View style={styles.itemMenu}>
            <FontAwesome5 name={item.icon} size={25} color={item.color} />
            <Text style={styles.txtMenu}>{item.title}</Text>
         </View>
      </Pressable>
   );
   render() {
      return (
         <View style={{ flex: 1 }}>
            <Header title="Xin chào TaiTran" />
            <FlatList
               data={listMenu}
               keyExtractor={(item, index) => String(index)}
               renderItem={this.renderMenu}
               ListFooterComponent={
                  <Pressable
                     android_ripple={{ color: colors.black_transparent }}
                     style={styles.itemMenu}
                     onPress={() => this.props.navigation.replace('Login')}>
                     <FontAwesome5 name="sign-out-alt" size={25} color={colors.red1} />
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
      paddingVertical: 16,
      borderColor: colors.gray2,
      borderBottomWidth: 1,
      paddingHorizontal: 16,
   },
   txtMenu: {
      fontSize: 16,
      marginLeft: 16,
   },
});
