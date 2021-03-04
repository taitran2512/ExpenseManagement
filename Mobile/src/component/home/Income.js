import React, { Component } from 'react';
import {
   Alert,
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
import { incomeType } from '../../utils/Utils';
import Images from '../../res/image';
import TextInputAnimated from '../custom/TextInputAnimated';
import ButtonSubmit from '../custom/ButtonSubmit';
import BottomSheet from '../custom/BottomSheet';
import { emtyValue } from '../../res/function/Functions';
import LoadingView from '../custom/LoadingView';
export default class Expense extends Component {
   constructor(props) {
      super(props);
      this.state = {
         money: '',
         date: new Date().toISOString(),
         time: `${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${
            new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
         }`,
         note: '',
         wallet: '',
         selectedOption: '',
      };
      this.BottomSheetWallet = React.createRef();
      this.BottomSheetType = React.createRef();
   }

   renderOption = ({ item, index }) => (
      <Pressable
         android_ripple={{ color: colors.black_transparent }}
         style={styles.options}
         onPress={() => {
            this.BottomSheetType.current.close(() => this.setState({ selectedOption: item }));
         }}>
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styles.icon} source={item.icon} />
            <Text style={styles.txtOption}>{item.title}</Text>
         </View>
         {this.state.selectedOption === item ? (
            <Image style={{ width: 45, height: 45, resizeMode: 'contain' }} source={Images.ic_check} />
         ) : null}
      </Pressable>
   );
   renderWallet = ({ item, index }) => (
      <Pressable
         android_ripple={{ color: colors.black_transparent }}
         style={[styles.options, { paddingVertical: 8 }]}
         onPress={() => {
            this.BottomSheetWallet.current.close(() => this.setState({ wallet: item }));
         }}>
         <View>
            <Text style={styles.txtOption}>Tên ví: {item.walletName}</Text>
            <Text style={styles.txtOption}>Số tiền: {item.walletMoney}</Text>
         </View>
         {this.state.wallet === item ? (
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
   onClearnote = () => {
      this.setState({ note: '' });
   };
   onChangenote = (txt) => {
      this.setState({ note: txt });
   };
   //
   onChangedate = (date) => {
      this.setState({ date: date });
   };
   onChangetime = (time) => {
      this.setState({
         time: time
            ? `${
                 new Date(time).getHours() < 10 ? '0' + new Date(time).getHours() : new Date(time).getHours()
              }:${
                 new Date(time).getMinutes() < 10
                    ? '0' + new Date(time).getMinutes()
                    : new Date(time).getMinutes()
              }`
            : '',
      });
   };

   save = () => {
      let input = {
         walletId: this.state.wallet._id,
         type: 'income',
         code: this.state.selectedOption.code,
         money: parseInt(this.state.money),
         note: this.state.note,
         date: this.state.date,
         time: this.state.time,
      };
      this.props.postHistoryAction(input);
   };
   componentDidUpdate(prevProps) {
      if (this.props.status !== null && this.props.status !== prevProps.status) {
         if (this.props.status === 'success') {
            setTimeout(() => {
               Alert.alert(
                  'Thông báo',
                  this.props.message,
                  [
                     {
                        text: 'OK',
                        onPress: () => {
                           this.props.navigation.goBack();
                           this.props.route.params.getData();
                        },
                     },
                  ],
                  { cancelable: false },
               );
            }, 10);
         } else if (this.props.status === 'error') {
            setTimeout(() => {
               Alert.alert('Thông báo', this.props.message);
            }, 10);
         }
      }
   }
   render() {
      return (
         <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <Header title="Thu nhập" isShowBack onPressBack={() => this.props.navigation.goBack()} />
            <LoadingView visible={this.props.loading} />
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
                  is24Hour
                  label="Thời gian"
                  style={styles.mg}
                  value={this.state.time}
                  onChange={this.onChangetime}
               />
               <TextInputAnimated
                  isPicker
                  onPress={() => this.BottomSheetWallet.current.open()}
                  label="Ví tiền"
                  style={styles.mg}
                  value={this.state.wallet?.walletName ?? ''}
               />
               <BottomSheet ref={this.BottomSheetWallet} title="Chọn ví tiền">
                  <FlatList
                     contentContainerStyle={{ flexGrow: 1 }}
                     data={this.props.dataWallet}
                     keyboardShouldPersistTaps={'handled'}
                     showsVerticalScrollIndicator={false}
                     keyExtractor={(item, index) => String(index)}
                     renderItem={this.renderWallet}
                  />
               </BottomSheet>

               <TextInputAnimated
                  isPicker
                  onPress={() => this.BottomSheetType.current.open()}
                  label="Loại thu nhập"
                  style={styles.mg}
                  value={this.state.selectedOption?.title ?? ''}
               />
               <BottomSheet ref={this.BottomSheetType} title="Chọn loại thu nhập">
                  <FlatList
                     contentContainerStyle={{ flexGrow: 1 }}
                     data={incomeType}
                     keyboardShouldPersistTaps={'handled'}
                     showsVerticalScrollIndicator={false}
                     keyExtractor={(item, index) => String(index)}
                     renderItem={this.renderOption}
                  />
               </BottomSheet>
               <TextInputAnimated
                  label="Ghi chú"
                  style={styles.mg}
                  value={this.state.note}
                  onPressClear={this.onClearnote}
                  onChangeText={this.onChangenote}
               />
            </View>
            <ButtonSubmit
               title="Xác nhận"
               disabled={
                  emtyValue(this.state.money) ||
                  emtyValue(this.state.date) ||
                  emtyValue(this.state.time) ||
                  emtyValue(this.state.wallet) ||
                  emtyValue(this.state.selectedOption)
               }
               onPress={this.save}
            />
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
