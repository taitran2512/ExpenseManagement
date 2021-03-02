import React, { useRef, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { formatMoney } from '../../../res/function/Functions';
import Images from '../../../res/image';
import { colors, fonts, screenWidth } from '../../../res/style/theme';
import WalletModal from './WalletModal';

const cardWidth = screenWidth * 0.6;

const ItemCard = (props) => {
   const walletModal = useRef();

   return (
      <ImageBackground
         source={Images.card}
         style={[styles.container, props.index > 0 ? { marginLeft: 16 } : null]}>
         <Text numberOfLines={2} style={styles.title}>
            {props.cardName}
         </Text>
         <Text style={styles.money}>{formatMoney(props.money)}</Text>
         {/* ///////action icon///////////////////////// */}
         <View style={styles.action}>
            <TouchableOpacity onPress={() => walletModal.current.open()} style={{ padding: 8 }}>
               <FontAwesome5 name="edit" color={colors.white} size={20} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.onDelete()} style={{ padding: 8 }}>
               <FontAwesome5 name="trash-alt" color={colors.white} size={20} />
            </TouchableOpacity>
         </View>

         {/* ///////////////// */}
         <WalletModal
            ref={walletModal}
            modalTitle="Chỉnh sửa thông tin ví tiền"
            textSubmit="Sửa"
            money={props.money}
            cardName={props.cardName}
            {...props}
         />
      </ImageBackground>
   );
};

export default ItemCard;
ItemCard.defaultProps = {
   onDelete: () => {},
};

const styles = StyleSheet.create({
   container: {
      width: cardWidth,
      height: cardWidth * 0.585,
      padding: 16,
   },
   title: {
      fontSize: 16,
      color: colors.white,
      opacity: 0.8,
      width: '80%',
      fontFamily: fonts.medium,
   },
   money: {
      fontSize: 24,
      color: colors.white,
      marginTop: 12,
      fontFamily: fonts.semibold,
   },
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
   action: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 8,
      right: 8,
   },
});
