import React from 'react';
import { forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors } from '../../res/style/theme';

const Switcher = forwardRef((props, ref) => {
   const [active, setActive] = useState(false);
   const time = 300;
   const [animation, setAnimation] = useState(new Animated.Value(0));
   ////////
   useImperativeHandle(ref, () => ({
      on: () => on(),
      off: () => off(),
   }));
   //////////
   useEffect(() => {
      active ? animationOn() : null;
   }, [active]);

   ////////////////
   const on = () => {
      setActive(true);
      props.onChange(true);
   };
   const off = () => {
      animationOff();
      setTimeout(() => {
         setActive(false);
         props.onChange(false);
      }, time);
   };
   ////////////
   const animationOn = () => {
      Animated.timing(animation, {
         toValue: 1,
         duration: time,
         useNativeDriver: false,
      }).start();
   };
   const animationOff = () => {
      Animated.timing(animation, {
         toValue: 0,
         duration: time,
         useNativeDriver: false,
      }).start();
   };
   const backgroundColor = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.gray2, colors.app],
   });
   const marginLeft = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [4, 26],
   });
   return (
      <Animated.View style={[styles.container, { backgroundColor: backgroundColor }]}>
         <Animated.View style={[styles.circle, { marginLeft }]} />
      </Animated.View>
   );
});

export default Switcher;
Switcher.defaultProps = {
   onChange: () => {},
};
const styles = StyleSheet.create({
   container: {
      width: 50,
      height: 25,
      borderRadius: 25,
      justifyContent: 'center',
   },
   circle: {
      height: 20,
      width: 20,
      borderRadius: 20,
      backgroundColor: colors.white,
   },
});
