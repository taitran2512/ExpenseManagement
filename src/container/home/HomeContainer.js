import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../../component/home/Home';

export class HomeContainer extends Component {
   render() {
      return <Home {...this.props} />;
   }
}

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
