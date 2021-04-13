import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawerComponent from '../../component/drawer/DrawerComponent';
import { logoutAction } from '../../redux/action/account/loginAction';
import { showAlertAction } from '../../redux/action/alert/showAlertAction';
export class DrawerContainer extends Component {
   render() {
      return <DrawerComponent {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      color: state.setColorReducer.color,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      logoutAction: () => dispatch(logoutAction()),
      showAlertAction: (form, message) => dispatch(showAlertAction(form, message))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);
