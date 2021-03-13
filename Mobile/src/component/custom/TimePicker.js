import { now } from 'moment';
import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Platform } from 'react-native';
import BottomSheet from './BottomSheetCustom';
import { TimePicker } from 'react-native-wheel-picker-android';
import Sizes from '../../res/style/size';
// import { color } from '../../res/color';

const pixel = Math.round(Sizes.s2);
const responseObject = {
   hour: Number,
   min: Number,
};
const propsType = {
   placeHolder: Component,
   onSelect: (response = responseObject) => {},
   onCancel: () => {},
   isBirth: Boolean,
   includeTime: Boolean,
   show: Boolean,
};

const DatePicker = (props = propsType) => {
   const [time, setTime] = useState(new Date());

   // useEffect (()=> {
   //   const valueDefaultTime = props.valueDefaultTime

   //   if(valueDefaultTime){
   //     setTime(valueDefaultTime)
   //   }
   // },[props.valueDefaultTime])

   return (
      <BottomSheet
         show={props.show}
         onCancel={() => props.onCancel()}
         height={
            props.includeTime
               ? Platform.OS == 'ios'
                  ? pixel * 450
                  : pixel * 400
               : Platform.OS == 'ios'
               ? pixel * 330
               : pixel * 250
         }
         title="Choose time"
         rightIcon={
            <Text
               style={{
                  padding: Sizes.s10,
                  color: '#3E62CC',
                  fontSize: Sizes.h32,
               }}>
               Done
            </Text>
         }
         leftIcon={<View style={{ width: Sizes.s140, height: 1 }} />}
         onRightClick={() => {
            props.onSelect &&
               props.onSelect({
                  hour: time.getHours(),
                  min: time.getMinutes(),
               });
         }}
         placeHolder={props.placeHolder ? props.placeHolder : null}
         children={
            <View style={{ flex: 1 }}>
               <TimePicker onTimeSelected={setTime} format24={true} />
            </View>
         }
      />
   );
};
const Item = ({ type, data, index }) => {
   return (
      <View style={styles.item}>
         {type == 'year' && <Text>{'Năm ' + data}</Text>}
         {type == 'month' && <Text>{'Tháng ' + data}</Text>}
         {type == 'date' && <Text>{data}</Text>}
      </View>
   );
};
const styles = StyleSheet.create({
   content: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: Sizes.s30,
      marginBottom: Sizes.s60,
   },
});

export default DatePicker;
