import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { formatMoney } from '../../res/function/Functions';
import { colors, fonts, screenHeight } from '../../res/style/theme';
import Header from '../custom/Header';
import ItemCard from './custom/ItemCard';
import ActionButton from './custom/ActionButton';
import ItemHistory from './custom/ItemHistory';
import WalletModal from './custom/WalletModal';
import LoadingView from '../custom/LoadingView';

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
      this.walletModal = React.createRef();
   }

   componentDidMount() {
      this.props.getWalletAction();
   }

   renderItemCard = ({ item, index }) => (
      <ItemCard
         index={index}
         cardName={item.walletName}
         money={item.walletMoney}
         onSubmit={this.onEditWallet}
      />
   );
   renderHistory = ({ item, index }) => <ItemHistory index={index} code={item.code} money={item.money} />;

   onEditWallet = (cardName, money) => {
      alert(cardName + money);
   };
   onCreateWallet = (cardName, money) => {
      this.props.createWalletAction(cardName, money);
   };
   //tạo mới ví tiền
   createWallet = (prevProps) => {
      if (
         this.props.createWallet.status !== null &&
         this.props.createWallet.status !== prevProps.createWallet.status
      ) {
         if (this.props.createWallet.status) {
            this.walletModal.current.close();
            setTimeout(() => {
               Alert.alert('Thông báo', this.props.createWallet.message);
            }, 10);
         }
      }
   };
   //get ví tiền
   getWallet = (prevProps) => {
      if (
         this.props.getWallet.status !== null &&
         this.props.getWallet.status !== prevProps.getWallet.status
      ) {
         if (this.props.getWallet.status) {
         }
      }
   };
   /////////
   componentDidUpdate(prevProps) {
      this.createWallet(prevProps);
      this.getWallet(prevProps);
   }
   ///////////////////////////
   render() {
      // console.log(this.props);
      return (
         <View style={styles.container}>
            <Header isShowMenu onPressMenu={() => this.props.navigation.openDrawer()} title="Trang chủ" />
            <LoadingView visible={this.props.createWallet.loading || this.props.getWallet.loading} />
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
                        data={this.props.getWallet.data}
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
            <WalletModal
               ref={this.walletModal}
               modalTitle="Thêm ví tiền"
               textSubmit="Thêm"
               onSubmit={this.onCreateWallet}
               cardName=""
            />
            <ActionButton
               onPressAddWallet={() => this.walletModal.current.open()}
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
