import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../../component/home/Home';
import { createWalletAction } from '../../redux/action/home/createWalletAction';
import { getWalletAction } from '../../redux/action/home/getWalletAction';
import { deleteWalletAction } from '../../redux/action/home/deleteWalletAction';
import { updateWalletAction } from '../../redux/action/home/updateWalletAction';
export class HomeContainer extends Component {
   render() {
      return <Home {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      //create wallet
      createWallet: {
         status: state.createWalletReducer.status,
         // data: state.createWalletReducer.data,
         loading: state.createWalletReducer.loading,
         message: state.createWalletReducer.message,
         error: state.createWalletReducer.error,
      },

      //get wallet by user id
      getWallet: {
         status: state.getWalletReducer.status,
         data: state.getWalletReducer.data,
         loading: state.getWalletReducer.loading,
         message: state.getWalletReducer.message,
         error: state.getWalletReducer.error,
      },
      deleteWallet: {
         status: state.deleteWalletReducer.status,
         // data: state.deleteWalletReducer.data,
         loading: state.deleteWalletReducer.loading,
         message: state.deleteWalletReducer.message,
         error: state.deleteWalletReducer.error,
      },
      updateWallet: {
         status: state.updateWalletReducer.status,
         // data: state.updateWalletReducer.data,
         loading: state.updateWalletReducer.loading,
         message: state.updateWalletReducer.message,
         error: state.updateWalletReducer.error,
      },
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      createWalletAction: (walletName, walletMoney) => dispatch(createWalletAction(walletName, walletMoney)),
      getWalletAction: () => dispatch(getWalletAction()),
      deleteWalletAction: (id) => dispatch(deleteWalletAction(id)),
      updateWalletAction: (_id, walletName, walletMoney) =>
         dispatch(updateWalletAction(_id, walletName, walletMoney)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
