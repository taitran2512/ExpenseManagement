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
         </View>
      </Modal>
   );
};

export default LoadingView;
