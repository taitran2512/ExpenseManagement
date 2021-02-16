import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../res/style/theme';
import Header from '../custom/Header';

export default class Statistic extends Component {
   render() {
      return (
         <View style={styles.container}>
            <Header isShowMenu onPressMenu={() => this.props.navigation.openDrawer()} title="Thống kê" />
            <ScrollView></ScrollView>
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
