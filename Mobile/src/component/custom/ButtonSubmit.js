import React from 'react';
import { View, Text, TouchableOpacity, Keyboard, SafeAreaView, StyleSheet } from 'react-native';
import { colors, fonts } from '../../res/style/theme';

const ButtonSubmit = (props) => {
   return (
      <SafeAreaView>
         <TouchableOpacity
            onPress={() => {
               Keyboard.dismiss();
               props.onPress();
            }}
            disabled={props.disabled}
            style={[
               styles.btn,
               {
                  backgroundColor: props.disabled ? colors.gray2 : colors.blue,
               },
               props.style,
            ]}>
            <Text
               style={{
                  fontSize: 16,
                  fontFamily: fonts.bold,
                  color: props.disabled ? '#A1A7AD' : '#FFFFFF',
               }}>
               {props.title}
            </Text>
         </TouchableOpacity>
      </SafeAreaView>
   );
};

export default ButtonSubmit;
ButtonSubmit.defaultProps = {
   onPress: () => {},
};

const styles = StyleSheet.create({
   btn: {
      height: 44,
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
   },
});
