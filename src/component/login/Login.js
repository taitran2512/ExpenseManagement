import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Header from '../custom/Header';

export default class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <View>
            <Header title="dang98 nhap" />
            <Text> Login </Text>
            <Button title="go to main" onPress={() => this.props.navigation.navigate('Home')} />
         </View>
      );
   }
}
