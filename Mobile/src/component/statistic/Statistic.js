import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, screenWidth } from '../../res/style/theme';
import Header from '../custom/Header';
import {
   LineChart,
   BarChart,
   PieChart,
   ProgressChart,
   ContributionGraph,
   StackedBarChart,
} from 'react-native-chart-kit';

const data = {
   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
   datasets: [
      {
         data: [50, 100, 25, 80, 99, 10],
         color: (opacity = 1) => colors.blue, // optional
         strokeWidth: 2, // optional
      },
   ],
   legend: ['Rainy Days'], // optional
};
const chartConfig = {
   backgroundGradientFrom: 'white',
   backgroundGradientTo: 'white',
   color: (opacity = 1) => `blue`,
   strokeWidth: 2, // optional, default 3
   barPercentage: 0.5,
   useShadowColorFromDataset: false, // optional
};
export default class Statistic extends Component {
   render() {
      return (
         <View style={styles.container}>
            <Header isShowMenu onPressMenu={() => this.props.navigation.openDrawer()} title="Thống kê" />
            {/* <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
               <LineChart
                  data={data}
                  width={screenWidth}
                  height={256}
                  verticalLabelRotation={30}
                  chartConfig={chartConfig}
                  bezier
               />
            </ScrollView> */}
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
