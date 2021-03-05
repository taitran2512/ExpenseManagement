import React, { Component } from 'react';
import { connect } from 'react-redux';
import Setting from '../../component/drawer/screen/Setting';
import { setColorAcion } from '../../redux/action/drawer/setColorAcion';
export class SettingContainer extends Component {
   render() {
      return <Setting {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      color: state.setColorReducer.color,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setColorAcion: (color) => dispatch(setColorAcion(color)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);
