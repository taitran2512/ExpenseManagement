import React from 'react';
import { View, Text, ActivityIndicator, Modal } from 'react-native';
import { colors } from '../../res/style/theme';
const LoadingView = (props) => {
   return (
      <Modal visible={props.visible} statusBarTranslucent transparent>
         <View
            style={{
               flex: 1,
               backgroundColor: 'rgba(0, 0, 0, 0.2)',
               justifyContent: 'center',
               alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={colors.blue} />
            <Text style={{ fontSize: 16, color: 'white', marginTop: 8, fontWeight: 'bold' }}>
               {props.loadingText}
            </Text>
         </View>
      </Modal>
   );
};

export default LoadingView;
