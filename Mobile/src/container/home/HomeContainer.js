import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../../component/home/Home';
import { createWalletAction } from '../../redux/action/home/createWalletAction';
import { getWalletAction } from '../../redux/action/home/getWalletAction';
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
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      createWalletAction: (walletName, walletMoney) => dispatch(createWalletAction(walletName, walletMoney)),
      getWalletAction: () => dispatch(getWalletAction()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
