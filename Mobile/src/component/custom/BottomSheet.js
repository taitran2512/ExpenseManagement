import React from 'react';
import { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';
import {
   View,
   Text,
   Animated,
   StyleSheet,
   TouchableWithoutFeedback,
   KeyboardAvoidingView,
   Modal,
   Keyboard,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { colors, fonts, screenHeight } from '../../res/style/theme';
import TextInputAnimated from './TextInputAnimated';

const BottomSheet = forwardRef((props, ref) => {
   const [show, setShow] = useState(false);
   const translateY = new Animated.Value(props.height);
   const time = 300;
   useImperativeHandle(ref, () => ({
      open: () => open(),
      close: (callback) => close(callback),
   }));

   useEffect(() => {
      show && slideUp();
   }, [show]);

   const open = () => {
      setShow(true);
   };
   const close = (callback) => {
      slideDown();
      setTimeout(() => {
         setShow(false);
         if (callback !== undefined) {
            callback();
         }
      }, time);
   };
   const slideUp = () => {
      Animated.timing(translateY, {
         toValue: 0,
         duration: time,
         useNativeDriver: true,
      }).start();
   };
   const slideDown = () => {
      Animated.timing(translateY, {
         toValue: props.height,
         duration: time,
         useNativeDriver: true,
      }).start();
   };
   return (
      <Modal
         visible={show}
         animationType="fade"
         statusBarTranslucent
         transparent
         onRequestClose={() => close()}>
         <TouchableWithoutFeedback onPress={() => close()}>
            <KeyboardAvoidingView style={[styles.container, props.modalStyle]} behavior="padding">
               <TouchableWithoutFeedback onPress={() => {}}>
                  <Animated.View
                     style={[styles.bottomSheet, { height: props.height, transform: [{ translateY }] }]}>
                     <View style={styles.titleView}>
                        <EvilIcons
                           name="close"
                           size={25}
                           style={{ left: 16, position: 'absolute' }}
                           onPress={() => close()}
                        />
                        <Text style={styles.title}>{props.title}</Text>
                     </View>
                     {props.children}
                  </Animated.View>
               </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
         </TouchableWithoutFeedback>
      </Modal>
   );
});

export default React.memo(BottomSheet);
BottomSheet.defaultProps = {
   height: screenHeight * 0.7,
};
const styles = StyleSheet.create({
   bottomSheet: {
      backgroundColor: colors.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      width: '100%',
   },
   container: {
      flex: 1,
      backgroundColor: colors.black_transparent,
      justifyContent: 'flex-end',
   },
   titleView: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: colors.gray2,
      borderBottomWidth: 1,
   },
   title: {
      fontFamily: fonts.bold,
      fontSize: 18,
      width: '80%',
      textAlign: 'center',
   },
});
