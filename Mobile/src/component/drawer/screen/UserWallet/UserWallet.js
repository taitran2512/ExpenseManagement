import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Images from '../../../../res/image';
import { colors, fonts } from '../../../../res/style/theme';
import Header from '../../../custom/Header';
import UsingItem from '../../../custom/UsingItem';

export class UserWallet extends Component {
   constructor(props) {
      super(props);
      this.state = {
         totalMoney: this.props.route.params,
      };
   }

   componentDidMount() {
      this.willFocusTotalMoney = this.props.navigation.addListener('focus', () => {
         console.log('Route TotalMoney', this.props.route.params);
      });
   }

   render() {
      return (
         <View style={styles.container}>
            <Header isShowBack onPressBack={() => this.props.navigation.goBack()} title="Ví của tôi" />
            <Text style={styles.txtTotal}> TÍNH VÀO TỔNG </Text>
            <UsingItem
               style={styles.itemStyle}
               label={'Tiền mặt ' + this.state.totalMoney}
               icon={Images.ic_money}
            />
         </View>
      );
   }
}

export default UserWallet;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white2,
   },
   txtTotal: {
      fontSize: 15,
      padding: 20,
      marginTop: 10,
   },
   itemStyle: {
      backgroundColor: colors.white,
      padding: 10,
   },
});
