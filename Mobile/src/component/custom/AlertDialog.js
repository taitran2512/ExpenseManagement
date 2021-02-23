import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Images from '../../res/image';
import { colors, fonts } from '../../res/style/theme';
import Modals from './Modals';

const AlertDialog = forwardRef((props, ref) => {
   const modalRef = useRef();
   const [type, setType] = useState('ok');
   const [status, setStatus] = useState('error');
   const [message, setMessage] = useState('');
   useImperativeHandle(ref, () => ({
      close: () => {
         onClose();
      },
      open: (code, status, msg) => {
         onOpen(code, status, msg);
      },
   }));
   const onOpen = (code, stt, msg) => {
      modalRef.current.open();
      setStatus(stt);
      setType(code);
      setMessage(msg);
   };

   const onClose = () => {
      modalRef.current.close();
   };
   const onPressOK = (callback) => {
      callback();
      modalRef.current.close();
   };
   const renderButton = () => {
      switch (type) {
         case 'yesno':
            return (
               <View style={styles.viewBtn}>
                  <TouchableOpacity style={[styles.btn, { backgroundColor: colors.red1 }]} onPress={onClose}>
                     <Text style={[styles.txt, { color: colors.white }]}>Hủy bỏ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn} onPress={onClose}>
                     <Text style={[styles.txt, { color: colors.white }]}>Xác nhận</Text>
                  </TouchableOpacity>
               </View>
            );
         case 'ok':
            return (
               <TouchableOpacity style={styles.okBtn} onPress={onClose}>
                  <Text style={[styles.txt, { color: colors.white }]}>Xác nhận</Text>
               </TouchableOpacity>
            );
      }
   };
   return (
      <Modals ref={modalRef}>
         <View style={styles.container}>
            <Text style={styles.noti}>Thông báo</Text>
            <View style={styles.title}>
               <Image source={status === 'error' ? Images.ic_error : Images.ic_success} style={styles.icon} />
               <Text style={[styles.txt, { flex: 1 }]}>{message}</Text>
            </View>
            {renderButton()}
         </View>
      </Modals>
   );
});

export default AlertDialog;
const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.white,
      padding: 20,
      borderRadius: 20,
      width: '80%',
   },
   noti: {
      fontFamily: fonts.bold,
      fontSize: 20,
   },
   title: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: colors.gray2,
      borderBottomWidth: 1,
      paddingVertical: 10,
   },
   icon: {
      width: 70,
      height: 70,
      marginRight: 16,
   },
   txt: {
      fontFamily: fonts.medium,
      fontSize: 16,
      lineHeight: 24,
   },
   viewBtn: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 16,
   },
   btn: {
      backgroundColor: colors.green1,
      padding: 10,
      borderRadius: 20,
      width: '40%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   okBtn: {
      backgroundColor: colors.green1,
      padding: 10,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
   },
});
