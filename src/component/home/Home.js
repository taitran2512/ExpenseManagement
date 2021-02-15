import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../custom/Header';

export default class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <View style={{ flex: 1 }}>
            <Header isShowMenu onPressMenu={() => this.props.navigation.openDrawer()} title="Trang chủ" />
            <Text> Home </Text>
         </View>
      );
   }
}
