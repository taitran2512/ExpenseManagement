import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawerComponent from '../../component/drawer/DrawerComponent';
import { logoutAction } from '../../redux/action/account/loginAction';
export class DrawerContainer extends Component {
   render() {
      return <DrawerComponent {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {
      logoutAction: () => dispatch(logoutAction()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);
