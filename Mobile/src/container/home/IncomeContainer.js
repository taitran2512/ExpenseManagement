import React, { Component } from 'react';
import { connect } from 'react-redux';
import Income from '../../component/home/Income';
import { postHistoryAction } from '../../redux/action/history/postHistoryAction';
import { getHistoryAction } from '../../redux/action/history/getHistoryAction';
import { getWalletAction } from '../../redux/action/home/getWalletAction';

export class IncomeContainer extends Component {
   render() {
      return <Income {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      status: state.postHistoryReducer.status,
      loading: state.postHistoryReducer.loading,
      message: state.postHistoryReducer.message,
      error: state.postHistoryReducer.error,
      dataWallet: state.getWalletReducer.data,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      postHistoryAction: (input) => dispatch(postHistoryAction(input)),
      getHistoryAction: () => dispatch(getHistoryAction()),
      getWalletAction: () => dispatch(getWalletAction()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeContainer);
