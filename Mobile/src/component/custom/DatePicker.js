import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Platform, Image } from 'react-native';
import BottomSheet from './BottomSheetCustom';
import { WheelPicker, TimePicker } from 'react-native-wheel-picker-android';
import { colors } from '../../res/style/theme';
import Sizes from '../../res/style/size';
import Images from '../../res/image';
const pixel = Math.round(Sizes.s2);
const itemHeight = pixel * 25;
const dateDataC = [
   1,
   2,
   3,
   4,
   5,
   6,
   7,
   8,
   9,
   10,
   11,
   12,
   13,
   14,
   15,
   16,
   17,
   18,
   19,
   20,
   21,
   22,
   23,
   24,
   25,
   26,
   27,
   28,
   29,
   30,
   31,
].map((item) => item.toString());

const monthData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => item.toString());

const responseObject = {
   date: Number,
   month: Number,
   year: Number,
   time: Date,
};
const propsType = {
   placeHolder: Component,
   onSelect: (response = responseObject) => {},
   onCancel: () => {},
   isBirth: Boolean,
   includeTime: Boolean,
   show: Boolean,
};
const newDate = new Date(new Date().getTime());
const DatePicker = (props = propsType) => {
   const [yearData, setYearData] = useState(['', '']);
   const [dateData, setDateData] = useState();
   const [maxDate, setMaxDate] = useState(31);
   const [date, setDate] = useState(new Date().getDate());
   const [month, setMonth] = useState(new Date().getMonth() + 1);
   const [year, setYear] = useState(0);
   const [time, setTime] = useState('');
   useEffect(() => {
      const nowDate = new Date();
      const yearClone = [];
      if (!props.isBirth) {
         nowDate.setFullYear(2070);
         setYear(49);
      }
      yearClone.push(nowDate.getFullYear().toString());
      for (let i = 1; i < 150; i++) yearClone.push((nowDate.getFullYear() - i).toString());
      // console.log(yearClone);
      setYearData(yearClone);
   }, []);

   useEffect(() => {
      const valueDefaults = props.valueDefault;
      const valueDefaultMonth = props.valueDefaultMonth;
      const valueDefaultYear = props.valueDefaultYear;
      if (valueDefaults) {
         setDate(valueDefaults);
      }

      if (valueDefaultMonth) {
         setMonth(valueDefaultMonth);
      }

      // if (valueDefaultYear) {
      //   setYear(valueDefaultYear);
      // }
   }, [props.valueDefault, props.valueDefaultMonth]);

   useEffect(() => {
      // setMaxDate()
      const days = new Date(year, month, 0).getDate();
      const clone = [];
      for (var i = 1; i <= days; i++) {
         clone.push(i.toString());
      }
      // console.log(clone);
      setDateData(clone);
   }, [month, year]);

   return (
      <BottomSheet
         {...props}
         show={props.show}
         onCancel={props.onCancel}
         height={
            props.includeTime
               ? Platform.OS == 'ios'
                  ? pixel * 450
                  : pixel * 400
               : Platform.OS == 'ios'
               ? pixel * 330
               : pixel * 250
         }
         title={props.titleBottomSheet}
         rightIcon={
            <Text
               style={{
                  padding: Sizes.s10,
                  color: '#3E62CC',
                  fontSize: Sizes.h32,
               }}>
               Xong
            </Text>
         }
         leftIcon={
            <Image
               resizeMode="contain"
               style={{
                  width: Sizes.s50,
                  height: Sizes.s50,
               }}
               source={Images.ic_close}
            />
         }
         close
         onRightClick={() => {
            props.onSelect &&
               props.onSelect({
                  date: date,
                  month: month,
                  year: yearData[year],
                  time: new Date(time),
               });
         }}
         placeHolder={props.placeHolder ? props.placeHolder : null}
         children={
            <View
               style={{
                  flex: 1,
                  backgroundColor: colors.white,
               }}>
               {props.includeTime && <TimePicker onTimeSelected={setTime} />}
               {props.isRequired ? (
                  <Text
                     style={{
                        color: colors.red,
                        fontSize: props.size * 0.75,
                        backgroundColor: 'red',
                     }}>
                     {' '}
                     *
                  </Text>
               ) : null}
               <View style={styles.content}>
                  <WheelPicker
                     selectedItem={date - 1}
                     style={{ flex: 1, color: colors.black }}
                     selectedItemTextColor={colors.black}
                     isCyclic={true}
                     data={dateData}
                     onItemSelected={(item) => {
                        setDate(Math.round(item + 1));
                     }}
                  />
                  <WheelPicker
                     selectedItem={month - 1}
                     style={{ flex: 1, color: colors.black }}
                     selectedItemTextColor={colors.black}
                     isCyclic={true}
                     data={monthData}
                     onItemSelected={(item) => setMonth(Math.round(item + 1))}
                  />
                  <WheelPicker
                     selectedItem={year}
                     style={{ flex: 1, color: colors.black }}
                     selectedItemTextColor={colors.black}
                     isCyclic={false}
                     data={yearData}
                     onItemSelected={(item) => setYear(item)}
                  />
               </View>
            </View>
         }
      />
   );
};
const Item = ({ type, data, index }) => {
   return (
      <View
         style={
            ([styles.item],
            {
               height: itemHeight,
               alignSelf: 'center',
               alignItems: 'center',
               justifyContent: 'center',
               color: colors.black,
            })
         }>
         {type == 'year' && (
            <Text style={{ color: colors.black }}>{'Năm ' + (data = new Date().getFullYear())}</Text>
         )}
         {type == 'month' && (
            <Text style={{ color: colors.black }}>{'Tháng ' + (data = new Date().getMonth())}</Text>
         )}
         {type == 'date' && (
            <Text style={{ color: colors.black }}>{(data = new Date(year, month, 0).getDate())}</Text>
         )}
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
   item: {
      height: itemHeight,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.black,
   },
   highlight: {
      position: 'absolute',
      height: itemHeight,
      width: '100%',
      backgroundColor: '#00000030',
      top: itemHeight * 2,
      borderRadius: pixel * 5,
   },
});

export default DatePicker;
DatePicker.defaultProps = {
   onCancel: () => {},
};
