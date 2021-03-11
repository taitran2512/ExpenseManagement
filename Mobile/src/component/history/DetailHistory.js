import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../res/style/theme';
import Header from '../custom/Header';
import TabviewHistory from './custom/TabviewHistory';
export default class DetailHistory extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   componentDidMount() {
      this.props.getHistoryExpenseAction();
      this.props.getHistoryIncomeAction();
   }
   render() {
      return (
         <View style={styles.container}>
            <Header isShowBack onPressBack={() => this.props.navigation.goBack()} title="Phân loại" />
            <TabviewHistory {...this.props} />
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
   },
});
