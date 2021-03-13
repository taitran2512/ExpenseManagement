import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import size from '../../res/style/size';
import { colors } from '../../res/style/theme';

const UsingItem = (props) => {
   return (
      <View
         style={[
            {
               flexDirection: 'row',
               alignItems: 'center',
            },
            props.style,
         ]}>
         {props.icon !== undefined && (
            <Image
               source={props.icon}
               style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                  tintColor: props.tintColor,
               }}
            />
         )}

         {props.note !== undefined && (
            <Text
               style={{
                  fontSize: size.s30,
                  paddingVertical: size.s10,
                  color: colors.yellow,
               }}>
               Description
            </Text>
         )}
         <Text
            style={{
               fontSize: size.s30,
               paddingHorizontal: size.s20,
               fontWeight: props.title ? 'bold' : 'normal',
               paddingVertical: size.s15,
            }}>
            {props.label}
         </Text>
      </View>
   );
};

export default UsingItem;
