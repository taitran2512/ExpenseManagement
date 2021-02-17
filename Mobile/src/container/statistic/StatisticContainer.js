import React, { Component } from 'react';
import { connect } from 'react-redux';
import Statistic from '../../component/statistic/Statistic';

export class StatisticContainer extends Component {
   render() {
      return <Statistic {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticContainer);
