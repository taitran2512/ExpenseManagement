import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailHistory from '../../component/history/DetailHistory';
import { getHistoryExpenseAction, getHistoryIncomeAction } from '../../redux/action/history/getHistoryType';
export class DetailHistoryContainer extends Component {
   render() {
      return <DetailHistory {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      expense: {
         status: state.getExpenseReducer.status,
         data: state.getExpenseReducer.data,
         loading: state.getExpenseReducer.loading,
         message: state.getExpenseReducer.message,
         error: state.getExpenseReducer.error,
      },
      income: {
         status: state.getIncomeReducer.status,
         data: state.getIncomeReducer.data,
         loading: state.getIncomeReducer.loading,
         message: state.getIncomeReducer.message,
         error: state.getIncomeReducer.error,
      },
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getHistoryExpenseAction: () => dispatch(getHistoryExpenseAction()),
      getHistoryIncomeAction: () => dispatch(getHistoryIncomeAction()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHistoryContainer);
