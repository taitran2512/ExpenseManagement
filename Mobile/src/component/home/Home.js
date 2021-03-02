import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { convertDate, formatMoney } from '../../res/function/Functions';
import { colors, fonts, screenHeight, screenWidth } from '../../res/style/theme';
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
      this.state = {
         totalMoney: 0,
      };
      this.walletModal = React.createRef();
   }

   componentDidMount() {
      this.props.getWalletAction();
      this.props.getHistoryAction();
   }

   renderItemCard = ({ item, index }) => (
      <ItemCard
         index={index}
         cardName={item.walletName}
         money={item.walletMoney}
         onSubmit={(cardName, money) => this.onEditWallet(item._id, cardName, money)}
         onDelete={() => this.onDeleteWallet(item._id)}
      />
   );
   renderHistory = ({ item, index }) => (
      <ItemHistory
         index={index}
         code={item.code}
         money={item.money}
         date={convertDate(item.date)}
         type={item.type}
      />
   );

   onEditWallet = (_id, cardName, money) => {
      this.props.updateWalletAction(_id, cardName, money);
   };
   onDeleteWallet = (id) => {
      Alert.alert('Cảnh báo', 'Bạn có muốn xóa ví này không', [
         {
            text: 'Không',
            style: 'cancel',
         },
         { text: 'Có', onPress: () => this.props.deleteWalletAction(id) },
      ]);
   };
   onCreateWallet = (cardName, money) => {
      this.props.createWalletAction(cardName, money);
   };
   emtyCardView = () => (
      <View style={{ width: screenWidth - 32 }}>
         <Text style={[styles.txtHistory, { textAlign: 'center' }]}>
            Bạn chưa có ví tiền, {'\n'}vui lòng thêm mới
         </Text>
      </View>
   );
   //tạo mới ví tiền
   createWallet = (prevProps) => {
      if (
         this.props.createWallet.status !== null &&
         this.props.createWallet.status !== prevProps.createWallet.status
      ) {
         if (this.props.createWallet.status === 'success') {
            this.walletModal.current.close();
            this.props.getWalletAction();
            setTimeout(() => {
               Alert.alert('Thông báo', this.props.createWallet.message);
            }, 10);
         }
      }
   };
   deleteWallet = (prevProps) => {
      if (
         this.props.deleteWallet.status !== null &&
         this.props.deleteWallet.status !== prevProps.deleteWallet.status
      ) {
         if (this.props.deleteWallet.status === 'success') {
            this.props.getWalletAction();
            setTimeout(() => {
               Alert.alert('Thông báo', this.props.deleteWallet.message);
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
         if (this.props.getWallet.status === 'success') {
            let totalMoney = 0;
            for (let wallet of this.props.getWallet.data) {
               totalMoney += wallet.walletMoney;
            }
            this.setState({ totalMoney });
         }
      }
   };
   //update ví  tiền
   updateWallet = (prevProps) => {
      if (
         this.props.updateWallet.status !== null &&
         this.props.updateWallet.status !== prevProps.updateWallet.status
      ) {
         if (this.props.updateWallet.status === 'success') {
            this.props.getWalletAction();
            setTimeout(() => {
               Alert.alert('Thông báo', this.props.updateWallet.message);
            }, 10);
         }
      }
   };
   /////////
   componentDidUpdate(prevProps) {
      this.createWallet(prevProps);
      this.getWallet(prevProps);
      this.deleteWallet(prevProps);
      this.updateWallet(prevProps);
   }
   ///////////////////////////
   render() {
      // console.log(this.props);
      return (
         <View style={styles.container}>
            <Header isShowMenu onPressMenu={() => this.props.navigation.openDrawer()} title="Trang chủ" />
            <LoadingView
               visible={
                  this.props.createWallet.loading ||
                  this.props.getWallet.loading ||
                  this.props.deleteWallet.loading ||
                  this.props.history.loading
               }
            />
            {/* ////////////////////////////////////// */}
            <View style={styles.header}>
               <Text style={[styles.txtWallet, { fontSize: 30 }]}>Tổng số tiền</Text>
               <Text style={styles.txtWallet}>{formatMoney(this.state.totalMoney)} đ</Text>
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
                        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
                        data={this.props.getWallet.data}
                        keyExtractor={(item, index) => String(index)}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={this.renderItemCard}
                        ListEmptyComponent={this.emtyCardView()}
                     />
                  </View>
                  <Text style={styles.txtHistory}>Lịch sử</Text>
                  <FlatList
                     contentContainerStyle={{ paddingBottom: 70 }}
                     data={this.props.history.data}
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
