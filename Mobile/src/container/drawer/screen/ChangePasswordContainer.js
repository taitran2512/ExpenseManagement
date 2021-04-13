import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChangePassword from '../../../component/drawer/screen/ChangePassword';
import { changePasswordAction } from '../../../redux/action/account/forget/changePasswordAction';
import { showAlertAction } from '../../../redux/action/alert/showAlertAction';

export class ChangePasswordContainer extends Component {
   render() {
      return <ChangePassword {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      status: state.changePasswordReducer.status,
      message: state.changePasswordReducer.message,
      loading: state.changePasswordReducer.loading,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      changePasswordAction: (oldPassword, newPassword) =>
         dispatch(changePasswordAction(oldPassword, newPassword)),
      showAlertAction: (form, message) => dispatch(showAlertAction(form, message)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordContainer);
