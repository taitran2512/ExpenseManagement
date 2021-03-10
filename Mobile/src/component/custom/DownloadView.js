import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { colors, fonts } from '../../res/style/theme';
const DownloadView = (props) => {
   return (
      <Modal statusBarTranslucent transparent animationType="fade" visible={props.visible}>
         <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.outside}>
               <View style={[styles.inside, { backgroundColor: colors.app, width: props.percent }]} />
            </View>
         </View>
      </Modal>
   );
};

export default DownloadView;
DownloadView.defaultProps = {
   title: 'Đang tải bản cập nhật...',
   percent: '0%',
};
const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.white,
      flex: 1,
      justifyContent: 'center',
   },
   title: {
      fontSize: 16,
      fontFamily: fonts.bold,
      marginBottom: 10,
      textAlign: 'center',
   },
   outside: {
      height: 10,
      borderRadius: 10,
      justifyContent: 'center',
      borderColor: colors.gray,
      borderWidth: 1,
      marginHorizontal: 60,
   },
   inside: {
      borderRadius: 10,
      height: 8,
   },
});
