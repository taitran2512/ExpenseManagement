import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../../component/login/Login';
import { loginAction } from '../../redux/action/account/loginAction';
import { showAlertAction } from '../../redux/action/alert/showAlertAction';

export class LoginContainer extends Component {
   render() {
      return <Login {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      status: state.loginReducer.status,
      data: state.loginReducer.data,
      loading: state.loginReducer.loading,
      message: state.loginReducer.message,
      error: state.loginReducer.error,
      appColor: state.setColorReducer.color,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      loginAction: (username, password) => dispatch(loginAction(username, password)),
      showAlertAction: (form, message) => dispatch(showAlertAction(form, message)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
