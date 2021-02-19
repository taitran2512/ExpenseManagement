import React, { Component } from 'react';
import { connect } from 'react-redux';
import Income from '../../component/home/Income';

export class IncomeContainer extends Component {
   render() {
      return <Income {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeContainer);
