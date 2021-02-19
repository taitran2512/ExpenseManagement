import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { formatMoney } from '../../../res/function/Functions';
import Images from '../../../res/image';
import { colors, fonts } from '../../../res/style/theme';
import { expenseType, incomeType } from '../../../utils/Utils';
const ItemHistory = (props) => {
   const getType = () => {
      const iconExpense = expenseType.find((element) => element.code === props.code);
      const iconIncome = incomeType.find((element) => element.code === props.code);
      return iconExpense || iconIncome;
   };
   return (
      <View style={styles.container}>
         <View style={styles.type}>
            <Image source={getType()?.icon ?? Images.ic_noimg} style={styles.icon} />
            <View style={styles.title}>
               <Text style={styles.date}>22/02/2021</Text>
               <Text style={styles.txt}>{getType()?.title}</Text>
            </View>
         </View>
         <Text style={styles.txt}>{formatMoney(props.money)}</Text>
      </View>
   );
};

export default ItemHistory;

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.white,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray2,
      paddingHorizontal: 16,
   },
   type: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   icon: {
      width: 65,
      height: 65,
      // resizeMode: 'contain',
   },
   title: {
      marginLeft: 16,
   },
   txt: {
      fontSize: 18,
      fontFamily: fonts.medium,
   },
   date: {
      color: colors.gray,
      fontSize: 14,
      fontFamily: fonts.regular,
   },
});
