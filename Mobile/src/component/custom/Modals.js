import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { colors } from '../../res/style/theme';

const Modals = forwardRef((props, ref) => {
   const [show, setShow] = useState(false);

   useImperativeHandle(ref, () => ({
      open: () => {
         onShow();
      },
      close: () => {
         onHide();
      },
   }));

   const onShow = () => {
      setShow(true);
   };
   const onHide = () => {
      setShow(false);
   };

   return (
      <Modal visible={show} animationType="fade" statusBarTranslucent transparent>
         <TouchableWithoutFeedback onPress={props.pressOutToClose ? onHide : null}>
            <KeyboardAvoidingView style={[styles.container, props.modalStyle]} behavior="padding">
               <TouchableWithoutFeedback onPress={() => {}}>{props.children}</TouchableWithoutFeedback>
            </KeyboardAvoidingView>
         </TouchableWithoutFeedback>
      </Modal>
   );
});

export default Modals;
Modals.defaultProps = {
   children: <></>,
   pressOutToClose: true,
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.black_transparent,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
