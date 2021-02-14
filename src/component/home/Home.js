import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <View style={{ flex: 1 }}>
            <Text> Home </Text>
            <Button title="go backk" onPress={() => this.props.navigation.goBack()} />
         </View>
      );
   }
}
