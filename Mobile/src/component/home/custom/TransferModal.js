import React, { useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { convertMoney } from '../../../res/function/Functions';
import { colors, fonts } from '../../../res/style/theme';
import Modals from '../../custom/Modals';
import TextInputAnimated from '../../custom/TextInputAnimated';

const WalletModal = forwardRef((props, ref) => {
   const modalRef = useRef();
   const [money, setMoney] = useState('');
   const [wallet, setWallet] = useState('');
   const onSubmit = () => {
      if (money === '' || wallet === '') {
         Alert.alert('Lưu ý', 'Vui lòng nhập dầy đủ thông tin');
      } else {
         props.onTransfer(wallet._id, parseInt(money.split('.').join('')));
         modalRef.current.close();
         setMoney('');
         setWallet('');
      }
   };
   const onCancel = () => {
      onClose();
   };
   const onClose = () => {
      setMoney('');
      modalRef.current.close();
   };
   useImperativeHandle(ref, () => ({
      open: () => modalRef.current.open(),
      close: () => onClose(),
   }));
   const onChangeMoney = (text) => {
      parseInt(text.split('.').join('')) > props.money
         ? setMoney(convertMoney(props.money))
         : setMoney(convertMoney(text));
   };

   const renderItem = ({ item, index }) => (
      <TouchableOpacity activeOpacity={0.7} style={styles.row} onPress={() => setWallet(item)}>
         <FontAwesome5Icon
            name={wallet === item ? 'check-circle' : 'circle'}
            size={16}
            color={wallet === item ? colors.blue : colors.gray}
         />
         <Text style={styles.textWallet}>{item.walletName}</Text>
      </TouchableOpacity>
   );
   return (
      <Modals ref={modalRef}>
         <View style={styles.edit}>
            <Text style={styles.titleEdit}>Chuyển tiền sang ví khác</Text>
            <TextInputAnimated
               keyboardType="number-pad"
               style={styles.input}
               label="Số tiền"
               value={money}
               onChangeText={onChangeMoney}
               onPressClear={() => setMoney('')}
            />
            <Text style={styles.subTitle}>Chọn ví tiền</Text>
            <FlatList
               data={props.listWallet}
               keyExtractor={(item, index) => index.toString()}
               showsVerticalScrollIndicator={false}
               renderItem={renderItem}
            />
            <View style={styles.viewBtn}>
               {/* //submit */}
               <TouchableOpacity style={styles.btn} onPress={onSubmit}>
                  <Text style={styles.txtBtn}>Chuyển</Text>
               </TouchableOpacity>
               {/* //cancel */}
               <TouchableOpacity onPress={onCancel} style={[styles.btn, { backgroundColor: colors.red1 }]}>
                  <Text style={styles.txtBtn}>Hủy</Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modals>
   );
});
export default WalletModal;

WalletModal.defaultProps = {
   cardName: '',
   money: '',
   onTransfer: () => {},
};

const styles = StyleSheet.create({
   edit: {
      backgroundColor: colors.white,
      width: '80%',
      borderRadius: 10,
      paddingVertical: 24,
   },
   titleEdit: {
      fontSize: 20,
      textAlign: 'center',
      color: colors.black,
      fontFamily: fonts.bold,
   },
   subTitle: {
      fontSize: 16,
      textAlign: 'center',
      color: colors.black,
      fontFamily: fonts.bold,
      marginTop: 10,
   },
   input: {
      marginTop: 20,
   },
   viewBtn: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 20,
   },
   btn: {
      backgroundColor: colors.green,
      borderRadius: 8,
      padding: 12,
      width: '40%',
   },
   txtBtn: {
      fontSize: 18,
      fontFamily: fonts.bold,
      color: colors.white,
      textAlign: 'center',
   },
   row: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginTop: 12,
   },
   textWallet: {
      fontFamily: fonts.medium,
      fontSize: 14,
      marginLeft: 14,
   },
});
