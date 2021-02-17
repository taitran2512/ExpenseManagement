import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUp from '../../component/login/SignUp';

export class SignUpContainer extends Component {
   render() {
      return <SignUp {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
