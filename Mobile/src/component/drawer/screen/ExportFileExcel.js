import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Header from '../../custom/Header';
import { colors, screenWidth } from '../../../res/style/theme';

export class ExportFileExcel extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      return (
         <View style={styles.container}>
            <Header isShowBack onPressBack={() => this.props.navigation.goBack()} title="Xuất file Excel" />
         </View>
      );
   }
}

export default ExportFileExcel;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
   },
});
