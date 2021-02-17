import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../../component/login/Login';

export class LoginContainer extends Component {
   render() {
      return <Login {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
