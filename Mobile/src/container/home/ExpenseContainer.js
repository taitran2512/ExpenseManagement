import React, { Component } from 'react';
import { connect } from 'react-redux';
import Expense from '../../component/home/Expense';
import { postHistoryAction } from '../../redux/action/history/postHistoryAction';
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
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseContainer);
