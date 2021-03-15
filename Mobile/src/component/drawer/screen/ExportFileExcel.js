import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Header from '../../custom/Header';
import TextInputAnimated from '../../custom/TextInputAnimated';
import { colors, screenWidth } from '../../../res/style/theme';
import Images from '../../../res/image';
import { convertToStringDate } from '../../../res/function/Functions';

export class ExportFileExcel extends Component {
   constructor(props) {
      super(props);
      this.state = {
         valueDatePicker: '',
         valueTimePicker: '',
      };
   }
   render() {
      return (
         <View style={styles.container}>
            <Header isShowBack onPressBack={() => this.props.navigation.goBack()} title="Xuất file Excel" />
            <TextInputAnimated
               isDatePickers
               titleBottomSheet="Ngày tạo"
               value={this.state.valueDatePicker}
               titleTextInput="Ngày tạo"
               onSelect={(res) => {
                  let date = new Date();
                  date.setDate(res.date);
                  date.setMonth(res.month - 1);
                  date.setFullYear(res.year);
                  const convertDate = convertToStringDate(date);
                  this.setState({
                     valueDatePicker: convertDate,
                  });
               }}
            />
            <TextInputAnimated
               isTimePickers
               titleBottomSheet="Ngày tạo"
               value={this.state.valueTimePicker}
               styleTimePicker={{ marginTop: 10 }}
               titleTextInput="Ngày tạo"
               onSelect={(res) => {
                  let date = new Date();
                  date.setHours(res.hour + 7);
                  date.setMinutes(res.min);
                  const convertDate = date.toISOString().slice(11, 16);
                  this.setState({
                     valueTimePicker: convertDate,
                  });
               }}
            />
         </View>
      );
   }
}

export default ExportFileExcel;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
   },
});
