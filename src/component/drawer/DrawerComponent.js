import React, { Component } from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import { colors } from '../../res/style/theme';
import StatusBarView from '../custom/StatusBarView';

export default class DrawerComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <View>
            <StatusBarView />
            <View style={styles.container}></View>
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      height: 48,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.blue,
   },
});
