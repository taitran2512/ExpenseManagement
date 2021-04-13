import React, { Component } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, screenWidth } from '../../../res/style/theme';
import Header from '../../custom/Header';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import BottomSheet from '../../custom/BottomSheet';
import Images from '../../../res/image';
import Switcher from '../../custom/Switcher';
import { userData } from '../../../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dataColor = [
   { title: 'Xanh dương', color: colors.blue },
   { title: 'Xanh lá', color: colors.green },
   { title: 'Xanh rêu', color: colors.lime },
   { title: 'Xanh ngọc', color: colors.cyan },
   { title: 'Đỏ', color: colors.red1 },
   { title: 'Vàng', color: colors.yellow1 },
   { title: 'Tím', color: colors.purple1 },
   { title: 'Cam', color: colors.orange },
   { title: 'Hồng', color: colors.pink2 },
];

export default class Setting extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedColor: '',
         activeBio: false,
      };
      this.BottomSheetColor = React.createRef();
      this.SwitcherRef = React.createRef();
   }
   componentDidMount() {
      this.getValueBio();
   }
   itemColor = ({ item, index }) => (
      <TouchableOpacity
         style={styles.item}
         onPress={() => {
            this.BottomSheetColor.current.close(() => this.props.setColorAcion(item.color));
         }}>
         <Text style={[styles.txtTitle, { fontSize: 16 }]}>{item.title}</Text>
         <View style={{ backgroundColor: item.color, height: 18, width: 18, borderRadius: 18 }} />
      </TouchableOpacity>
   );
   onPressBio = () => {
      if (userData.BIOMETRICS === '') {
         // Alert.alert(
         //    'Thông báo',
         //    'Điện thoại của bạn không hỗ trợ xác thực vân tay/ khuôn mặt hoặc bạn chưa kích hoạt chức năng lên',
         // );
         this.props.showAlertAction('warn', 'Điện thoại của bạn không hỗ trợ tính năng này');
      } else {
         this.state.activeBio ? this.SwitcherRef.current.off() : this.SwitcherRef.current.on();
      }
   };
   onChangeBiometric = async (active) => {
      this.setState({ activeBio: active });
      try {
         await AsyncStorage.setItem('@biometric', active ? 'on' : 'off');
      } catch (e) {
         // saving error
      }
   };
   getValueBio = async () => {
      try {
         const value = await AsyncStorage.getItem('@biometric');
         if (value !== null) {
            if (value === 'on') {
               this.SwitcherRef.current.on();
            }
         }
      } catch (err) {}
   };
   render() {
      return (
         <View style={styles.container}>
            <Header isShowBack onPressBack={() => this.props.navigation.goBack()} title="Cài đặt" />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
               <Image style={styles.img} source={Images.ic_setting} />

               <Item title="Màu sắc" onPress={() => this.BottomSheetColor.current.open()} />
               <Item title="Bảo mật sinh trắc học" onPress={this.onPressBio}>
                  <Switcher ref={this.SwitcherRef} onChange={this.onChangeBiometric} />
               </Item>
               <BottomSheet ref={this.BottomSheetColor} title="Chọn màu">
                  <FlatList
                     data={dataColor}
                     keyExtractor={(item, index) => String(index)}
                     showsVerticalScrollIndicator={false}
                     renderItem={this.itemColor}
                  />
               </BottomSheet>
            </ScrollView>
         </View>
      );
   }
}
const Item = (props) => (
   <TouchableOpacity onPress={() => props.onPress()} style={styles.item}>
      <Text style={styles.txtTitle}>{props.title}</Text>
      {props.children || <FontAwesome5 name={'angle-right'} size={18} color={colors.app} />}
   </TouchableOpacity>
);
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
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
      fontSize: 18,
      color: colors.black,
   },
   img: {
      width: screenWidth * 0.5,
      height: screenWidth * 0.5,
      alignSelf: 'center',
   },
});
