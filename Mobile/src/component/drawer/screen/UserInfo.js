import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { userData } from '../../../config/Config';
import { convertDate } from '../../../res/function/Functions';
import Images from '../../../res/image';
import { colors, fonts, screenWidth } from '../../../res/style/theme';
import Header from '../../custom/Header';

export default class UserInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {};
      this.data = [
         { label: 'Họ và tên', value: userData.fullname },
         { label: 'Tên đăng nhập', value: userData.username },
         { label: 'Email', value: userData.email },
         { label: 'Số điện thoại', value: userData.phone },
         { label: 'Ngày tạo tài khoản', value: convertDate(userData.createDate) },
      ];
   }
   renderItem = ({ item, index }) => (
      <View style={styles.item}>
         <Text style={styles.text}>{item.label}</Text>
         <Text style={styles.text}>{item.value}</Text>
      </View>
   );
   render() {
      return (
         <View style={styles.container}>
            <Header isShowBack onPressBack={() => this.props.navigation.goBack()} title="Thông tin cá nhân" />
            <Image source={Images.ic_user} style={styles.img} />
            <FlatList
               data={this.data}
               keyExtractor={(item, index) => String(index)}
               showsVerticalScrollIndicator={false}
               renderItem={this.renderItem}
            />
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
   },
   item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomColor: colors.gray2,
      borderBottomWidth: 1,
   },
   text: {
      fontSize: 16,
      fontFamily: fonts.medium,
   },
   img: {
      width: screenWidth * 0.5,
      height: screenWidth * 0.5,
      alignSelf: 'center',
   },
});
