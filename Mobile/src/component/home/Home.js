import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { formatMoney } from '../../res/function/Functions';
import { colors, fonts, screenHeight } from '../../res/style/theme';
import Header from '../custom/Header';
import ItemCard from './custom/ItemCard';
import ActionButton from './custom/ActionButton';
import ItemHistory from './custom/ItemHistory';
const data = [
   { title: 'Vietcombank', money: 123456 },
   { title: 'Tiền trong ví', money: 456789 },
   { title: 'Tiền trong tủ', money: 1000000000 },
];

const history = [
   { code: 'clothes', money: 300000 },
   { code: 'fruit', money: 78423 },
   { code: 'phoneFix', money: 123456 },
   { code: 'bus', money: 300000 },
   { code: 'buyVehicle', money: 300000 },
   { code: 'shopping', money: 7894123 },
   { code: 'health', money: 789.789 },
   { code: 'travel', money: 123456 },
   { code: 'beer', money: 300000 },
   { code: 'book', money: 300000 },
   { code: 'snacks', money: 45612345 },
   { code: 'phoneBuy', money: 300000 },
   { code: 'phoneFee', money: 2321456 },
   { code: 'sale', money: 3000500 },
   { code: 'lease', money: 3006000 },
   { code: 'bingo', money: 3000600 },
   { code: 'return', money: 3007000 },
   { code: 'otherIncome', money: 3000010 },
];

export default class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   renderItemCard = ({ item, index }) => <ItemCard index={index} title={item.title} money={item.money} />;
   renderHistory = ({ item, index }) => <ItemHistory index={index} code={item.code} money={item.money} />;
   render() {
      return (
         <View style={styles.container}>
            <Header isShowMenu onPressMenu={() => this.props.navigation.openDrawer()} title="Trang chủ" />
            {/* ////////////////////////////////////// */}
            <View style={styles.header}>
               <Text style={[styles.txtWallet, { fontSize: 30 }]}>Tổng số tiền</Text>
               <Text style={styles.txtWallet}>{formatMoney(1000000000)} đ</Text>
            </View>

            {/* ////////////footer///////////////// */}
            <View style={{ flex: 1 }}>
               <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: colors.blue }} />
               <View style={styles.footer}>
                  <View
                     style={
                        {
                           // borderBottomWidth: 2,
                           // borderBottomColor: colors.gray2,
                        }
                     }>
                     <FlatList
                        contentContainerStyle={{ padding: 16 }}
                        data={data}
                        keyExtractor={(item, index) => String(index)}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={this.renderItemCard}
                     />
                  </View>
                  <Text style={styles.txtHistory}>Lịch sử</Text>
                  <FlatList
                     contentContainerStyle={{ paddingBottom: 70 }}
                     data={history}
                     keyExtractor={(item, index) => String(index)}
                     renderItem={this.renderHistory}
                     showsVerticalScrollIndicator={false}
                  />
               </View>
            </View>
            <ActionButton
               onPressExpense={() => this.props.navigation.navigate('Expense')}
               onPressIncome={() => this.props.navigation.navigate('Income')}
            />
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white3,
   },
   header: {
      height: screenHeight * 0.15,
      backgroundColor: colors.blue,
      borderBottomRightRadius: 75,
      alignItems: 'center',
      justifyContent: 'center',
   },
   footer: {
      flex: 1,
      backgroundColor: colors.white3,
      borderTopLeftRadius: 75,
   },
   txtWallet: {
      color: colors.white,
      fontFamily: fonts.semibold,
      fontSize: 35,
   },
   txtHistory: {
      fontSize: 20,
      fontFamily: fonts.bold,
      paddingVertical: 10,
      paddingHorizontal: 16,
   },
});
