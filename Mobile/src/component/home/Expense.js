import React, { Component } from 'react';
import {
   FlatList,
   Image,
   KeyboardAvoidingView,
   Platform,
   Pressable,
   StyleSheet,
   Text,
   View,
} from 'react-native';
import { colors, fonts } from '../../res/style/theme';
import Header from '../custom/Header';
import { expenseType } from '../../utils/Utils';
import Images from '../../res/image';
import TextInputAnimated from '../custom/TextInputAnimated';
import ButtonSubmit from '../custom/ButtonSubmit';

export default class Expense extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedOption: '',
         money: '',
         date: '',
         time: '',
      };
   }
   renderOption = ({ item, index }) => (
      <Pressable
         android_ripple={{ color: colors.black_transparent }}
         style={styles.options}
         onPress={() => this.setState({ selectedOption: item })}>
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styles.icon} source={item.icon} />
            <Text style={styles.txtOption}>{item.title}</Text>
         </View>
         {this.state.selectedOption === item ? (
            <Image style={{ width: 45, height: 45, resizeMode: 'contain' }} source={Images.ic_check} />
         ) : null}
      </Pressable>
   );
   //
   onClearMoney = () => {
      this.setState({ money: '' });
   };
   onChangeMoney = (txt) => {
      this.setState({ money: txt });
   };
   //
   onChangedate = (date) => {
      this.setState({ date: date });
   };
   onChangetime = (time) => {
      this.setState({ time: time });
   };
   render() {
      return (
         <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <Header title="Chi tiêu" isShowBack onPressBack={() => this.props.navigation.goBack()} />
            <View style={styles.container}>
               <TextInputAnimated
                  label="Số tiền"
                  style={styles.mg}
                  value={this.state.money}
                  onPressClear={this.onClearMoney}
                  onChangeText={this.onChangeMoney}
                  keyboardType="number-pad"
               />
               <TextInputAnimated
                  isDatePicker
                  mode="date"
                  label="Ngày tháng"
                  style={styles.mg}
                  value={this.state.date}
                  onChange={this.onChangedate}
               />
               <TextInputAnimated
                  isDatePicker
                  mode="time"
                  label="Thời gian"
                  style={styles.mg}
                  value={this.state.time}
                  onChange={this.onChangetime}
               />
               <TextInputAnimated
                  label="Số tiền"
                  style={styles.mg}
                  value={this.state.money}
                  onPressClear={this.onClearMoney}
                  onChangeText={this.onChangeMoney}
                  keyboardType="number-pad"
               />
               <FlatList
                  style={styles.list}
                  contentContainerStyle={{ flexGrow: 1 }}
                  data={expenseType}
                  keyboardShouldPersistTaps={'handled'}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={this.renderOption}
               />
            </View>
            <ButtonSubmit title="Xác nhận" />
         </KeyboardAvoidingView>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
   },
   options: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      borderColor: colors.gray3,
      borderBottomWidth: 1,
      alignItems: 'center',
   },
   icon: {
      width: 70,
      height: 70,
      resizeMode: 'contain',
   },
   txtOption: {
      fontFamily: fonts.medium,
      fontSize: 16,
      marginLeft: 16,
   },
   list: {
      borderTopColor: colors.gray3,
      borderTopWidth: 1,
      marginTop: 20,
   },
   mg: {
      marginTop: 16,
   },
});
