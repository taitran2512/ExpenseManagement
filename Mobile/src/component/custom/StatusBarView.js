import React from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import { colors } from '../../res/style/theme';

//import bỏ vào đầu
const StatusBarView = () => {
   return (
      <View>
         <SafeAreaView style={{ backgroundColor: colors.app }} />
         <View style={{ height: StatusBar.currentHeight, backgroundColor: colors.app }} />
         <StatusBar
            barStyle="light-content"
            backgroundColor={'transparent'}
            hidden={false}
            translucent={true}
         />
      </View>
   );
};

export default StatusBarView;
