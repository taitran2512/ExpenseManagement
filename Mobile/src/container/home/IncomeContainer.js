import React, { Component } from 'react';
import { connect } from 'react-redux';
import Income from '../../component/home/Income';
import { postHistoryAction } from '../../redux/action/history/postHistoryAction';

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
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeContainer);
