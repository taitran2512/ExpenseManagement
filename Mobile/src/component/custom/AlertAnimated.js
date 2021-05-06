import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { connect } from 'react-redux';
import { getStatusBarHeight } from '../../res/function/StatusBarHeight';
import { colors, fonts } from '../../res/style/theme';

const time = 250;
const height = getStatusBarHeight() + 48;
const AlertAnimated = React.memo((props) => {
   const animation = new Animated.Value(-height);
   const prevData = React.useRef(props.data).current;
   useEffect(() => {
      if (props.data.form !== null && props.data.message !== null && props.data !== prevData) {
         slideDown();
      }
   }, [props.data]);

   const slideDown = () => {
      animation.setValue(-height);
      Animated.timing(animation, {
         toValue: 0,
         duration: time,
         useNativeDriver: true,
      }).start(() =>
         setTimeout(() => {
            slideUp();
         }, 1500),
      );
   };
   const slideUp = () => {
      Animated.timing(animation, {
         toValue: -height,
         duration: time,
         useNativeDriver: true,
      }).start();
   };
   const renderIcon = () => {
      switch (props.data.form) {
         case 'warn':
            return <FontAwesome5 name="exclamation-triangle" color={colors.white} size={32} />;
         case 'error':
            return <FontAwesome5 name="exclamation-circle" color={colors.white} size={32} />;
         case 'success':
            return <FontAwesome5 name="laugh-beam" color={colors.white} size={32} />;
         case 'pro':
            return <FontAwesome5 name="tools" color={colors.white} size={32} />;
         default:
            return <FontAwesome5 name="laugh-beam" color={colors.white} size={32} />;
      }
   };
   const formTitle = () => {
      switch (props.data.form) {
         case 'warn':
            return 'Warning';
         case 'error':
            return 'Error';
         case 'success':
            return 'Success';
         case 'pro':
            return 'Prospect';
         default:
            return 'Success';
      }
   };
   const formColor = () => {
      switch (props.data.form) {
         case 'warn':
            return colors.yellow3;
         case 'error':
            return colors.red1;
         case 'success':
            return colors.green;
         case 'pro':
            return colors.blue5;
         default:
            return colors.green;
      }
   };
   return (
      <Animated.View
         style={[
            styles.container,
            {
               transform: [{ translateY: animation }],
               backgroundColor: formColor(),
            },
         ]}>
         {renderIcon()}
         <View>
            <Text style={styles.form}>{formTitle()}</Text>
            <Text style={styles.message}>{props.data.message}</Text>
         </View>
      </Animated.View>
   );
});

const mapStateToProps = (state) => {
   return {
      data: state.showAlertReducer,
   };
};

export default connect(mapStateToProps, null)(AlertAnimated);
const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.yellow3,
      height: height,
      paddingTop: getStatusBarHeight(),
      position: 'absolute',
      top: 0,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 28,
   },
   form: {
      fontFamily: fonts.bold,
      fontSize: 16,
      fontFamily: fonts.bold,
      color: colors.white,
      marginLeft: 16,
   },
   message: {
      fontSize: 14,
      fontFamily: fonts.medium,
      color: colors.white,
      marginHorizontal: 16,
      flex: 1,
   },
});
