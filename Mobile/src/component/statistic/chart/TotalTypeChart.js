import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { emtyValue, formatMoney } from '../../../res/function/Functions';
import { colors, fonts, screenWidth } from '../../../res/style/theme';

export default class TotalTypeChart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         totalExpense: 0,
         totalIncome: 0,
      };
   }
   shouldComponentUpdate(nextProps, nextState) {
      return this.props.getTotalMoney !== nextProps.getTotalMoney;
   }
   componentDidMount() {
      this.props.navigation.addListener('focus', () => {
         this.props.getTotalByTypeAction();
      });
   }

   render() {
      return (
         <View style={styles.container}>
            <Text style={styles.title}>Tổng chi tiêu và thu nhập</Text>
            <PieChart
               data={[
                  {
                     name: 'Chi tiêu',
                     population: this.props.getTotalMoney.data?.totalExpense ?? 0,
                     color: colors.blue,
                     legendFontColor: '#7F7F7F',
                     legendFontSize: 15,
                  },
                  {
                     name: 'Thu nhập',
                     population: this.props.getTotalMoney.data?.totalIncome ?? 0,
                     color: colors.red,
                     legendFontColor: '#7F7F7F',
                     legendFontSize: 15,
                  },
               ]}
               width={screenWidth}
               height={220}
               chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
               }}
               accessor="population"
               backgroundColor="transparent"
               // paddingLeft="15"
               // absolute
            />
            <View style={styles.item}>
               <View style={[styles.ic, { backgroundColor: colors.blue }]} />
               <Text style={styles.txt}>
                  Tổng chi tiêu: {formatMoney(this.props.getTotalMoney.data?.totalExpense)} đ
               </Text>
            </View>
            <View style={styles.item}>
               <View style={[styles.ic, { backgroundColor: colors.red }]} />
               <Text style={styles.txt}>
                  Tổng thu nhập: {formatMoney(this.props.getTotalMoney.data?.totalIncome)} đ
               </Text>
            </View>
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.white,
      paddingVertical: 10,
   },
   title: {
      fontFamily: fonts.bold,
      fontSize: 18,
      textAlign: 'center',
   },
   item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginTop: 16,
   },
   ic: {
      height: 20,
      width: 20,
      borderRadius: 20,
   },
   txt: {
      fontFamily: fonts.medium,
      fontSize: 16,
      marginLeft: 16,
   },
});
