import React, { Component } from 'react';
import { connect } from 'react-redux';
import Forget from '../../component/login/foget/Forget';
import { sendOTPAction } from '../../redux/action/account/forget/sendOTPAction';
import { verifyOTPAction } from '../../redux/action/account/forget/verifyOTPAction';
import { createNewPassAction } from '../../redux/action/account/forget/createNewPassAction';
import { showAlertAction } from '../../redux/action/alert/showAlertAction';

export class ForgetContainer extends Component {
   render() {
      return <Forget {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      sendOtp: {
         status: state.sendOTPReducer.status,
         loading: state.sendOTPReducer.loading,
         message: state.sendOTPReducer.message,
         _id: state.sendOTPReducer._id,
         error: state.sendOTPReducer.error,
      },
      verifyOtp: {
         status: state.verifyOTPReducer.status,
         loading: state.verifyOTPReducer.loading,
         message: state.verifyOTPReducer.message,
         error: state.verifyOTPReducer.error,
      },
      createNewPass: {
         status: state.createNewPassReducer.status,
         loading: state.createNewPassReducer.loading,
         message: state.createNewPassReducer.message,
         error: state.createNewPassReducer.error,
      },
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      sendOTPAction: (email) => dispatch(sendOTPAction(email)),
      verifyOTPAction: (_id, otp) => dispatch(verifyOTPAction(_id, otp)),
      createNewPassAction: (_id, newPassword) => dispatch(createNewPassAction(_id, newPassword)),
      showAlertAction: (form, message) => dispatch(showAlertAction(form, message))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetContainer);
