import React, { Component } from 'react';
import { connect } from 'react-redux';
import Forget from '../../component/login/foget/Forget';
export class ForgetContainer extends Component {
   render() {
      return <Forget {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetContainer);
