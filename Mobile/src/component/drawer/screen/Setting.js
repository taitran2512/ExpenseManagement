import React, { Component } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../res/style/theme';
import Header from '../../custom/Header';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import BottomSheet from '../../custom/BottomSheet';

const dataColor = [
   { title: 'Xanh dương', color: colors.blue },
   { title: 'Xanh lá', color: colors.green },
   { title: 'Xanh ngọc', color: colors.cyan },
   { title: 'Đỏ', color: colors.red1 },
   { title: 'Vàng', color: colors.yellow1 },
   { title: 'Tím', color: colors.purple1 },
   { title: 'Cam', color: colors.orange },
];

export default class Setting extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedColor: '',
      };
      this.BottomSheetColor = React.createRef();
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
   render() {
      return (
         <View style={styles.container}>
            <Header isShowBack onPressBack={() => this.props.navigation.replace('Home')} title="Cài đặt" />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
               <Item title="Màu sắc ứng dụng" onPress={() => this.BottomSheetColor.current.open()} />
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
      <FontAwesome5 name={'angle-right'} size={18} color={colors.app} />
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
});
