import React, { Component } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { colors, fonts, screenWidth, screenHeight } from '../../../res/style/theme';
import Header from '../../custom/Header';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import BottomSheet from '../../custom/BottomSheet';
import Images from '../../../res/image';
import Switcher from '../../custom/Switcher';
import { userData } from '../../../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from '../../../config/i18n';

const dataLanguage = [
   { title: I18n.t('vietnamese'), lang: 'vi' },
   { title: I18n.t('english'), lang: 'en' },
];

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
      this.BottomSheetLanguage = React.createRef();
      this.BottomSheetColor = React.createRef();
      this.SwitcherRef = React.createRef();
   }
   componentDidMount() {
      this.getValueBio();
   }
   showAlert=()=>{
      this.props.showAlertAction('pro','Chức năng này đang phát triển')
   }
   itemLanguage = ({ item, index }) => (
      <TouchableOpacity
         style={styles.item}
         onPress={() => {
            this.BottomSheetLanguage.current.close(() => this.props.setLanguageAction(item.lang));
         }}>
         <Text style={[styles.txtTitle, { fontSize: 16 }]}>{item.title}</Text>
         <View style={{ height: 18, width: 18, borderRadius: 18 }} />
      </TouchableOpacity>
   );
   itemColor = ({ item, index }) => (
      <TouchableOpacity
         style={styles.item}
         onPress={() => {
            this.BottomSheetColor.current.close(() => this.props.setColorAction(item.color));
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
      } catch (err) { }
   };
   render() {
      return (
         <View style={styles.container}>
            <Header isShowBack onPressBack={() => this.props.navigation.goBack()} title={I18n.t('setting')} />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
               <Image style={styles.img} source={Images.ic_setting} />

               <Item title={I18n.t('lang')} onPress={() => this.showAlert()} />
               <Item title={I18n.t('color')} onPress={() => this.BottomSheetColor.current.open()} />
               <Item title={I18n.t('biometric_security')} onPress={this.onPressBio}>
                  <Switcher ref={this.SwitcherRef} onChange={this.onChangeBiometric} />
               </Item>
               <BottomSheet ref={this.BottomSheetColor} title={I18n.t('select_color')}>
                  <FlatList
                     data={dataColor}
                     keyExtractor={(item, index) => String(index)}
                     showsVerticalScrollIndicator={false}
                     renderItem={this.itemColor}
                  />
               </BottomSheet>
               <BottomSheet ref={this.BottomSheetLanguage} title={I18n.t('select_lang')} height={screenHeight * 0.2}>
                  <FlatList
                     data={dataLanguage}
                     keyExtractor={(item, index) => String(index)}
                     showsVerticalScrollIndicator={false}
                     renderItem={this.itemLanguage}
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
