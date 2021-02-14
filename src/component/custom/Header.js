import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

const Header = (props) => {
   return (
      <View style={styles.container}>
         <TouchableOpacity style={styles.iconBack} onPress={() => props.onPressBack()}>
            <Icon name="arrow-left" size={20} />
         </TouchableOpacity>
         <Text style={styles.title}>{props.title}</Text>
      </View>
   );
};

export default Header;
Header.defaultProps = {
   onPressBack: () => {},
};
const styles = StyleSheet.create({
   container: {
      height: 48,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   title: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   iconBack: {
      position: 'absolute',
      left: 0,
      height: 48,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
