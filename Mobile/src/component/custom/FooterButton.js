import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { colors, fonts } from '../../res/style/theme';

const screenWidth = Dimensions.get('screen').width;
const btnWidth = screenWidth / 2 - 16 * 1.5;

const FooterButton = forwardRef((props, ref) => {
   const animation = new Animated.Value(0);
   const time = props.time;
   const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
   useImperativeHandle(ref, () => ({
      showBack: () => showBack(),
      hideBack: () => hideBack(),
   }));
   //animation show btn back
   const showBack = () => {
      Animated.timing(animation, {
         toValue: 1,
         duration: time,
         useNativeDriver: false,
      }).start();
   };

   //animation hide btn back
   const hideBack = () => {
      Animated.timing(animation, {
         toValue: 0,
         duration: time,
         useNativeDriver: false,
      }).start();
   };
   //back button width
   const backWidth = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, btnWidth],
   });
   //next button width
   const nextWidth = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [screenWidth - 32, btnWidth],
   });
   return (
      <>
         <View style={styles.container}>
            <AnimatedTouchable
               style={[styles.btnBack, { width: backWidth }]}
               onPress={() => props.onPressBack()}>
               <Text numberOfLines={1} style={styles.txtBack}>
                  Quay lại
               </Text>
            </AnimatedTouchable>
            <AnimatedTouchable
               style={[styles.btnNext, { width: nextWidth }]}
               onPress={() => props.onPressNext()}>
               <Text numberOfLines={1} style={styles.txtNext}>
                  Tiếp theo
               </Text>
            </AnimatedTouchable>
         </View>
         <SafeAreaView />
      </>
   );
});

export default FooterButton;
FooterButton.defaultProps = {
   onPressBack: () => {},
   onPressNext: () => {},
   time: 300,
};
const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.white,
      padding: 16,
      borderColor: colors.gray3,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   btnBack: {
      backgroundColor: colors.gray3,
      height: 44,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      width: btnWidth,
   },
   btnNext: {
      backgroundColor: colors.app,
      borderRadius: 8,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      width: btnWidth,
   },
   txtBack: {
      fontSize: 16,
      color: colors.black,
      fontFamily: fonts.bold,
   },
   txtNext: {
      fontFamily: fonts.bold,
      color: colors.white,
      fontSize: 16,
   },
});
