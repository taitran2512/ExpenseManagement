import React, { Component } from 'react';
import { connect } from 'react-redux';
import History from '../../component/history/History';

export class HistoryContainer extends Component {
   render() {
      return <History {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      data: state.getHistoryReducer.data,
      color: state.setColorReducer.color,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
