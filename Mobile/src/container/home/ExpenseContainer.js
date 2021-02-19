import React, { Component } from 'react';
import { connect } from 'react-redux';
import Expense from '../../component/home/Expense';

export class ExpenseContainer extends Component {
   render() {
      return <Expense {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseContainer);
