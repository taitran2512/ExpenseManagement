import React, { Component } from 'react';
import { connect } from 'react-redux';
import Setting from '../../component/drawer/screen/Setting';
import { setLanguageAction } from '../../redux/action/drawer/setLanguageAction';
import { setColorAction } from '../../redux/action/drawer/setColorAction';
import { showAlertAction } from '../../redux/action/alert/showAlertAction';
export class SettingContainer extends Component {
   render() {
      return <Setting {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {
      lang: state.setLanguageReducer.lang,
      color: state.setColorReducer.color
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setLanguageAction: (lang) => dispatch(setLanguageAction(lang)),
      setColorAction: (color) => dispatch(setColorAction(color)),
      showAlertAction: (form, message) => dispatch(showAlertAction(form, message))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);
