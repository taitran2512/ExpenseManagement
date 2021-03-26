import React, { Component } from 'react';
import { connect } from 'react-redux';
import Expense from '../../component/home/Expense';
import { postHistoryAction } from '../../redux/action/history/postHistoryAction';
import { getHistoryAction } from '../../redux/action/history/getHistoryAction';
import { getWalletAction } from '../../redux/action/home/getWalletAction';

export class ExpenseContainer extends Component {
   render() {
      return <Expense {...this.props} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseContainer);
