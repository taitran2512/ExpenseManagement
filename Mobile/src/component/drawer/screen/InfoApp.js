import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from '../../custom/Header';
import Images from '../../../res/image';
import { colors, fonts, screenWidth } from '../../../res/style/theme';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import DeviceInfo from 'react-native-device-info';
export default class InfoApp extends Component {
   render() {
      return (
         <>
            <Header
               isShowBack
               onPressBack={() => this.props.navigation.goBack()}
               title="Thông tin ứng dụng"
            />
            <ScrollView style={styles.container}>
               <View style={styles.containerVersion}>
                  <Image source={Images.ic_money1} style={styles.img} />
                  <Text style={styles.txtVersion}>Phiên bản {DeviceInfo.getVersion()}</Text>
               </View>
               <View style={styles.containerList}>
                  <Item
                     title="Bình chọn cho My E Wallet (Mew.)"
                     onPress={() => Alert.alert('Thông báo', 'Chức năng đăng được cập nhật')}
                  />
                  <Item
                     title="Website"
                     showWeb
                     onPress={() => Alert.alert('Thông báo', 'Chức năng đăng được cập nhật')}
                  />
               </View>
               <Text style={[styles.txtVersion, { color: colors.lightblue1 }]}>Điều khoản sử dụng</Text>
               <Text style={[styles.txtVersion, { color: colors.gray }]}>Phát triển bởi 5que Solutions</Text>
            </ScrollView>
         </>
      );
   }
}

const Item = (props) => (
   <TouchableOpacity onPress={() => props.onPress()} style={styles.item}>
      <Text style={styles.txtTitle}>{props.title}</Text>
      <View style={styles.itemWeb}>
         {props.showWeb && <Text style={{ color: colors.gray, paddingRight:20 }}>https://exmana.vn</Text>}
         <FontAwesome5 name={'angle-right'} size={18} color={colors.app} />
      </View>
   </TouchableOpacity>
);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white2,
   },
   containerVersion: {
      backgroundColor: colors.white,
      padding: 10,
   },
   img: {
      width: screenWidth * 0.3,
      height: screenWidth * 0.3,
      alignSelf: 'center',
   },
   txtVersion: {
      textAlign: 'center',
      padding: 10,
      fontSize: 16,
   },
   containerList: {
      backgroundColor: colors.white,
      marginTop: 10,
   },
   item: {
      padding: 16,
      borderBottomColor: colors.gray2,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   txtTitle: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: colors.black,
   },
   itemWeb: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
});
