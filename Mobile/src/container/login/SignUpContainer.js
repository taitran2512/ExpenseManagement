import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUp from '../../component/login/SignUp';
import { signupAction } from '../../redux/action/account/signupAction';
export class SignUpContainer extends Component {
   render() {
      return <SignUp {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      status: state.signupReducer.status,
      // data: state.signupReducer.data,
      loading: state.signupReducer.loading,
      message: state.signupReducer.message,
      error: state.signupReducer.error,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      signupAction: (input) => dispatch(signupAction(input)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
