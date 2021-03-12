import React, { Component } from 'react';
import { connect } from 'react-redux';
import Statistic from '../../component/statistic/Statistic';
import { getTotalByTypeAction } from '../../redux/action/statistic/getTotalByTypeAction';
export class StatisticContainer extends Component {
   render() {
      return <Statistic {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      getTotalMoney: {
         status: state.getTotalByTypeReducer.status,
         data: state.getTotalByTypeReducer.data,
         loading: state.getTotalByTypeReducer.loading,
         message: state.getTotalByTypeReducer.message,
         error: state.getTotalByTypeReducer.error,
      },
      dataWallet: state.getWalletReducer.data,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getTotalByTypeAction: () => dispatch(getTotalByTypeAction()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticContainer);
