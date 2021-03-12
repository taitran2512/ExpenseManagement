import React, { Component, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
   View,
   StyleSheet,
   Text,
   Animated,
   Modal,
   Dimensions,
   Keyboard,
   TouchableOpacity,
   Image,
   StatusBar,
   TouchableWithoutFeedback,
   Platform,
} from 'react-native';
import Sizes from '../../res/style/size';
import images from '../../res/image/index';
import { colors } from '../../res/style/theme';
// import { color } from '../../res/color';

const propsType = {
   show: Boolean,
   disableHeader: Boolean,
   title: String,
   titleStyle: titleStyle,
   bodyStyle: Object,
   height: Number,
   leftIcon: Component,
   rightIcon: Component,
   onPressLeft: () => {},
   onCancel: () => {},
   onOpen: () => {},
   children: Component,
   placeHolder: Component,
   containerStyle: Object,
   onRightClick: () => {},
   onRequestClose: () => {},
   onTitleClick: () => {},
};

const titleStyle = {
   fontSize: Number,
   fontFamily: String,
   color: String,
};

const Fillter = forwardRef((props = propsType, ref) => {
   const maxHeight = props.height ? props.height : Sizes.s340 * 3;

   const [show, setShow] = useState(false);
   const [heightA] = useState(new Animated.Value(maxHeight));
   const [keyboardHeight, setKeyboardHeight] = useState(0);

   useImperativeHandle(ref, () => ({
      close() {
         onClose();
      },
      show() {
         onShow();
      },
   }));

   const onShow = async () => {
      props.onOpen && props.onOpen();
      await setShow(true);
      Animated.timing(heightA, {
         toValue: 0,
         duration: 300,
         useNativeDriver: true,
      }).start();
   };

   const onClose = () => {
      Animated.timing(heightA, {
         toValue: maxHeight,
         duration: 200,
         useNativeDriver: true,
      }).start(() => {
         setShow(false);
         // props.onCancel &&
         props.onCancel();
      });
   };

   useEffect(() => {
      props.show ? onShow() : onClose();
   }, [props.show]);

   useEffect(() => {
      Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
      return () => {
         Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
         Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
      };
   }, []);
   const _keyboardDidShow = (e) => {
      setKeyboardHeight(e.endCoordinates.height);
   };
   const _keyboardDidHide = (e) => {
      setKeyboardHeight(0);
   };

   // const size = heightA.interpolate({
   //   inputRange: [0, 1],
   //   outputRange: [maxHeight, 0]
   // });
   return (
      <View>
         <TouchableOpacity style={props.styleContainer} onPress={() => onShow()}>
            {props.placeHolder ? props.placeHolder : <View style={{ width: 100, height: 50 }} />}
         </TouchableOpacity>
         <Modal
            transparent={true}
            visible={show}
            onRequestClose={() => {
               props.onRequestClose && props.onRequestClose();
            }}>
            <StatusBar barStyle="light-content" backgroundColor="#00000050" />
            {/* <TouchableWithoutFeedback onPress={() => { onClose() }}> */}
            <View style={[styles.content, props.containerStyle]}>
               <TouchableWithoutFeedback onPress={() => onClose()}>
                  <View
                     style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                     }}
                  />
               </TouchableWithoutFeedback>
               <Animated.View
                  style={{
                     width: '100%',
                     height:
                        maxHeight - keyboardHeight > Sizes.s340
                           ? maxHeight - keyboardHeight
                           : maxHeight + Sizes.s20,
                     transform: [{ translateY: heightA }],
                     bottom: keyboardHeight,
                     position: 'absolute',
                     backgroundColor: colors.white,
                  }}>
                  {props.disableHeader ? null : (
                     <View
                        style={
                           ([styles.header],
                           {
                              height: Sizes.s100,
                              width: '100%',
                              borderTopEndRadius: Sizes.s40,
                              borderTopStartRadius: Sizes.s40,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingHorizontal: Sizes.s30,
                              borderBottomWidth: 0.5,
                              backgroundColor: colors.white,
                           })
                        }>
                        <TouchableOpacity
                           style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              minWidth: Sizes.s50,
                              backgroundColor: colors.white,
                           }}
                           onPress={() => {
                              props.onPressLeft && props.onPressLeft();
                              props.close == true && onClose();
                           }}>
                           {props.leftIcon && props.leftIcon}
                        </TouchableOpacity>
                        <TouchableOpacity
                           style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: colors.white,
                           }}
                           onPress={() => props.onTitleClick && props.onTitleClick()}>
                           <Text
                              style={
                                 ([styles.title, props.titleStyle],
                                 {
                                    fontSize: Sizes.s40,
                                 })
                              }>
                              {props.title}
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           style={{
                              alignItems: 'flex-start',
                              justifyContent: 'center',
                              minWidth: Sizes.s50,
                              backgroundColor: colors.white,
                           }}
                           onPress={() => {
                              props.onRightClick && props.onRightClick();
                              onClose();
                           }}>
                           {props.rightIcon ? (
                              props.rightIcon
                           ) : (
                              <Image
                                 source={images.ic_close}
                                 style={{
                                    width: Sizes.s30,
                                    height: Sizes.s30,
                                    resizeMode: 'contain',
                                 }}
                              />
                           )}
                        </TouchableOpacity>
                     </View>
                  )}
                  <View
                     style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#fff',
                     }}
                  />
                  <View
                     style={
                        ([styles.body, props.bodyStyle],
                        {
                           flex: 1,
                           paddingVertical: Sizes.s20,
                        })
                     }>
                     {props.children}
                  </View>
               </Animated.View>
            </View>
         </Modal>
      </View>
   );
});

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = new StyleSheet.create({
   content: {
      width: width,
      height: height,
      backgroundColor: '#00000050',
      alignItems: 'center',
   },
   header: {
      height: Sizes.s100,
      width: '100%',
      borderTopEndRadius: Sizes.s40,
      borderTopStartRadius: Sizes.s40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: Sizes.s30,
      borderBottomWidth: 0.5,
   },
   title: {
      fontSize: Sizes.s40,
   },
   body: {
      flex: 1,
      paddingVertical: Sizes.s20,
   },
   text: {
      fontSize: Sizes.h34,
      color: '#52585F',
   },
});

export default Fillter;
