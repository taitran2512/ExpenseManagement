import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { formatMoney } from '../../res/function/Functions';
import Images from '../../res/image';
import { colors } from '../../res/style/theme';

const ItemHistory = (props) => {
   return (
      <View style={styles.container}>
         <View style={styles.type}>
            <Image source={Images.ic_cancel} style={styles.icon} />
            <Text style={styles.txt}>asdasd</Text>
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
      width: 48,
      height: 48,
      resizeMode: 'contain',
   },
   txt: {
      fontSize: 18,
   },
});
