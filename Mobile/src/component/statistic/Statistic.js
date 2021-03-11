import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../res/style/theme';
import Header from '../custom/Header';
import LoadingView from '../custom/LoadingView';
import TotalTypeChart from './chart/TotalTypeChart';
export default class Statistic extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <View style={styles.container}>
            <Header isShowMenu onPressMenu={() => this.props.navigation.openDrawer()} title="Thống kê" />
            <ScrollView
               // style={styles.container}
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{ flexGrow: 1 }}>
               <TotalTypeChart {...this.props} />
            </ScrollView>
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white2,
   },
});
