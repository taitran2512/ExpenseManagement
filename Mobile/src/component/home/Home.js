import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   Alert,
   TouchableOpacity,
   BackHandler,
   ActivityIndicator,
   Image,
} from 'react-native';
import { convertDate, emtyValue, formatMoney } from '../../res/function/Functions';
import { colors, fonts, screenHeight, screenWidth } from '../../res/style/theme';
import Header from '../custom/Header';
import ItemCard from './custom/ItemCard';
import ActionButton from './custom/ActionButton';
import ItemHistory from './custom/ItemHistory';
import WalletModal from './custom/WalletModal';
import LoadingView from '../custom/LoadingView';
import Skeleton from '../custom/Skeleton';
import Images from '../../res/image';
export default class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         totalMoney: 0,
      };
      this.walletModal = React.createRef();
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
   }
   handleBackButtonClick() {
      if (!this.props.navigation.isFocused()) {
         this.props.navigation.goBack(null);
      } else {
         Alert.alert('Thông báo', 'Bạn có muốn thoát khỏi ứng dụng?', [
            {
               text: 'cancel',
               style: 'cancel',
            },
            { text: 'ok', onPress: () => BackHandler.exitApp() },
         ]);
      }
      return true;
   }
   componentDidMount() {
      this.getData();

      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
   }

   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
   }

   getData = () => {
      this.props.getWalletAction();
      this.props.getHistoryAction();
   };
   //
   useMoney = (screen) => {
      if (!emtyValue(this.props.getWallet.data)) {
         this.props.navigation.navigate(screen);
      } else {
         this.props.showAlertAction('warn', 'Hãy tạo mới ví tiền trước');
      }
   };
   renderItemCard = ({ item, index }) => (
      <ItemCard
         index={index}
         cardName={item.walletName}
         money={item.walletMoney}
         onSubmit={(cardName, money) => this.onEditWallet(item._id, cardName, money)}
         onDelete={() => this.onDeleteWallet(item._id)}
      />
   );
   loadingCard = () => (
      <Skeleton>
         <View style={{ width: screenWidth * 0.6, height: screenWidth * 0.6 * 0.585, borderRadius: 30 }} />
      </Skeleton>
   );
   renderHistory = ({ item, index }) => (
      <ItemHistory
         index={index}
         code={item.code}
         money={item.money}
         date={convertDate(item.date)}
         time={item.time}
         type={item.type}
         note={item.note}
      />
   );
   loadingHistory = () => {
      let list = [];
      for (var i = 0; i < 10; i++) {
         list.push(
            <View key={i} style={{ marginHorizontal: 16, marginTop: 16, height: 44, borderRadius: 10 }} />,
         );
      }
      return <Skeleton>{list}</Skeleton>;
   };
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
            this.props.getWalletAction();
            this.props.showAlertAction('success', this.props.createWallet.message);
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
            this.props.showAlertAction('success', this.props.deleteWallet.message);
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
            this.setState({ totalMoney: totalMoney });
         } else {
            this.setState({ totalMoney: 0 });
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
            this.props.showAlertAction('success', this.props.updateWallet.message);
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
      return (
         <View style={styles.container}>
            <Header isShowMenu onPressMenu={() => this.props.navigation.openDrawer()} title="Trang chủ" />
            {/* ////////////////////////////////////// */}
            <View style={[styles.header, { backgroundColor: colors.app }]}>
               {/* <Text style={[styles.txtWallet, { fontSize: 30 }]}>Tổng số tiền</Text>
               {this.props.getWallet.loading ? (
                  <ActivityIndicator color="white" size="small" />
               ) : (
                  <Text style={styles.txtWallet}>{formatMoney(this.state.totalMoney)} đ</Text>
               )} */}
               <TotalMoneyView totalMoney={this.state.totalMoney} loading={this.props.getWallet.loading} />
            </View>
            {/* ////////////footer///////////////// */}
            <View style={{ flex: 1 }}>
               <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: colors.app }} />
               <View style={styles.footer}>
                  <View>
                     <FlatList
                        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
                        data={this.props.getWallet.data}
                        keyExtractor={(item, index) => String(index)}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={this.renderItemCard}
                        ListEmptyComponent={
                           this.props.getWallet.loading ? this.loadingCard() : this.emtyCardView()
                        }
                     />
                  </View>
                  {/* ////////////history///////////////// */}
                  <View style={styles.viewHistory}>
                     <Text style={styles.txtHistory}>Gần đây</Text>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailHistory')}>
                        <Text style={styles.txtDetail}>Phân loại</Text>
                     </TouchableOpacity>
                  </View>
                  {/* ////////////history list ///////////////// */}
                  <FlatList
                     contentContainerStyle={{ paddingBottom: 70 }}
                     data={this.props.history.data}
                     keyExtractor={(item, index) => String(index)}
                     renderItem={this.renderHistory}
                     showsVerticalScrollIndicator={false}
                     ListEmptyComponent={this.props.history.loading ? this.loadingHistory() : null}
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
               onPressExpense={() => this.useMoney('Expense')}
               onPressIncome={() => this.useMoney('Income')}
            />
         </View>
      );
   }
}
const TotalMoneyView = (props) => {
   const [showMoney, setShowMoney] = React.useState(false);
   return (
      <>
         <Text style={[styles.txtWallet, { fontSize: 30 }]}>Tổng số dư</Text>
         <View style={styles.totalMoneyView}>
            {/* {props.loading ? (
               <ActivityIndicator color="white" size="small" />
            ) : (
               <> */}
            <Text style={styles.txtWallet}>{showMoney ? formatMoney(props.totalMoney) : '*******'}</Text>
            <TouchableOpacity onPress={() => setShowMoney(!showMoney)}>
               <Image source={showMoney ? Images.ic_eye : Images.ic_eye_close} style={styles.ic_eye} />
            </TouchableOpacity>
            {/* </>
            )} */}
         </View>
      </>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white3,
   },
   header: {
      height: screenHeight * 0.15,
      backgroundColor: colors.app,
      borderBottomRightRadius: 75,
      alignItems: 'center',
      justifyContent: 'center',
   },
   footer: {
      flex: 1,
      backgroundColor: colors.white3,
      borderTopLeftRadius: 75,
   },
   totalMoneyView: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   ic_eye: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
      tintColor: colors.white,
      marginLeft: 10,
   },
   txtWallet: {
      color: colors.white,
      fontFamily: fonts.semibold,
      fontSize: 35,
      textAlign: 'center',
   },
   txtHistory: {
      fontSize: 20,
      fontFamily: fonts.bold,
   },
   txtDetail: {
      fontSize: 16,
      fontFamily: fonts.bold,
      color: colors.green,
   },
   viewHistory: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
});
