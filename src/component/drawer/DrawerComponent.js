import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableNativeFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { colors } from '../../res/style/theme';
import Header from '../custom/Header';
import StatusBarView from '../custom/StatusBarView';

const listMenu = [
   { title: 'Đổi mật khẩu', icon: 'user-lock', screen: '' },
   { title: 'Xuất file Excel', icon: 'file-excel', screen: '' },
   { title: 'Thông tin chi tiết', icon: 'info-circle', screen: '' },
   { title: 'Hướng dẫn sử dụng', icon: 'chalkboard-teacher', screen: '' },
];

export default class DrawerComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   renderMenu = ({ item, index }) => (
      <TouchableNativeFeedback>
         <View style={styles.itemMenu}>
            <FontAwesome5 name={item.icon} size={25} color={colors.gray5} />
            <Text style={styles.txtMenu}>{item.title}</Text>
         </View>
      </TouchableNativeFeedback>
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
                  <TouchableNativeFeedback onPress={() => this.props.navigation.replace('Login')}>
                     <View style={styles.itemMenu}>
                        <FontAwesome5 name="sign-out-alt" size={25} color={colors.red2} />
                        <Text style={styles.txtMenu}>Đăng xuất</Text>
                     </View>
                  </TouchableNativeFeedback>
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
