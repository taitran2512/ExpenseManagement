import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { emtyValue, formatMoney } from '../../../res/function/Functions';
import { colors, fonts, screenWidth } from '../../../res/style/theme';

export default class TotalTypeChart extends React.PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         totalExpense: 0,
         totalIncome: 0,
      };
   }
   componentDidMount() {
      this.props.getHistoryExpenseAction();
      this.props.getHistoryIncomeAction();
   }
   getTotalType = (prevProps) => {
      if (this.props.expense.status !== null && this.props.expense.status !== prevProps.expense.status) {
         if (this.props.expense.status === 'success' && this.props.expense.data.length > 0) {
            let totalExpense =
               this.props.expense.data.length < 2
                  ? this.props.expense.data[0].money
                  : this.props.expense.data.reduce((a, b) => a.money + b.money);
            this.setState({ totalExpense: totalExpense });
         }
      }
      if (this.props.income.status !== null && this.props.income.status !== prevProps.income.status) {
         if (this.props.income.status === 'success' && this.props.income.data.length > 0) {
            let totalIncome =
               this.props.income.data.length < 2
                  ? this.props.income.data[0].money
                  : this.props.income.data.reduce((a, b) => a.money + b.money);

            this.setState({ totalIncome: totalIncome });
         }
      }
   };
   componentDidUpdate(prevProps) {
      this.getTotalType(prevProps);
   }
   render() {
      return (
         <View style={styles.container}>
            <Text style={styles.title}>Thổng chi tiêu và thu nhập</Text>
            <PieChart
               data={[
                  {
                     name: 'Chi tiêu',
                     population: 0,
                     color: colors.blue,
                     legendFontColor: '#7F7F7F',
                     legendFontSize: 15,
                  },
                  {
                     name: 'Thu nhập',
                     population: 0,
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
               <Text style={styles.txt}>Tổng chi tiêu: {formatMoney(this.state.totalExpense)} đ</Text>
            </View>
            <View style={styles.item}>
               <View style={[styles.ic, { backgroundColor: colors.red }]} />
               <Text style={styles.txt}>Tổng thu nhập: {formatMoney(this.state.totalIncome)} đ</Text>
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
