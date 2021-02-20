import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../../component/home/Home';
import { createWalletAction } from '../../redux/action/home/createWalletAction';
export class HomeContainer extends Component {
   render() {
      return <Home {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      statusCreateWallet: state.createWalletReducer.status,
      // dataCreateWallet: state.createWalletReducer.data,
      loadingCreateWallet: state.createWalletReducer.loading,
      messageCreateWallet: state.createWalletReducer.message,
      errorCreateWallet: state.createWalletReducer.error,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      createWalletAction: (walletName, walletMoney) => dispatch(createWalletAction(walletName, walletMoney)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
