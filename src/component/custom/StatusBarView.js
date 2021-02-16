import React from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import { colors } from '../../res/style/theme';

//import bỏ vào đầu 
const StatusBarView = () => {
   return (
      <View>
         <SafeAreaView />
         <View style={{ height: StatusBar.currentHeight, backgroundColor: colors.blue }} />
         <StatusBar
            barStyle="dark-content"
            backgroundColor={'transparent'}
            hidden={false}
            translucent={true}
         />
      </View>
   );
};

export default StatusBarView;
