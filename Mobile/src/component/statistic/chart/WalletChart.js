import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { colors, fonts, screenWidth } from '../../../res/style/theme';

const data = {
   labels: ['January', 'February'],
   datasets: [
      {
         data: [20, 45],
      },
   ],
};
const chartConfig = {
   backgroundGradientFrom: '#1E2923',
   backgroundGradientFromOpacity: 0,
   backgroundGradientTo: '#08130D',
   backgroundGradientToOpacity: 0,
   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
   strokeWidth: 2, // optional, default 3
   barPercentage: 0.5,
   useShadowColorFromDataset: false, // optional
};
export default class TotalTypeChart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         label: [],
         value: [],
      };
   }
   // shouldComponentUpdate(nextProps) {
   //    return this.props.dataWallet !== nextProps.dataWallet;
   // }
   componentDidMount() {
      let label = [];
      for (var item of this.props.dataWallet) {
         label.push(item.walletName);
      }
      let value = [];
      for (var items of this.props.dataWallet) {
         value.push(items.walletMoney / 1000000);
      }
      this.setState({ label: label, value: value }, () => console.log(this.state.label, this.state.value));
   }
   render() {
      return (
         <View style={styles.container}>
            <Text style={styles.title}>Thống kê ví tiền {'\n'}Đơn vị tính: Triệu đồng</Text>
            <BarChart
               data={{
                  labels: this.state.label,
                  datasets: [
                     {
                        data: this.state.value,
                     },
                  ],
               }}
               width={screenWidth}
               height={220}
               chartConfig={{
                  backgroundGradientFrom: '#ffff',
                  backgroundGradientTo: '#ffff',
                  decimalPlaces: 0,
                  color: (opacity = 0) => colors.blue,
                  labelColor: (opacity = 0) => colors.red,
                  fillShadowGradient: colors.blue,
                  fillShadowGradientOpacity: 1,
               }}
            />
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.white,
      paddingVertical: 10,
      marginTop: 20,
   },
   title: {
      fontFamily: fonts.bold,
      fontSize: 18,
      textAlign: 'center',
   },
});
