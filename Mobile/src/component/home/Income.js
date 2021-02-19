import React, { Component } from 'react';
import {
   FlatList,
   Image,
   KeyboardAvoidingView,
   Platform,
   Pressable,
   StyleSheet,
   Text,
   View,
} from 'react-native';
import { colors, fonts } from '../../res/style/theme';
import Header from '../custom/Header';
import { incomeType } from '../../utils/Utils';
import Images from '../../res/image';

export default class Income extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedOption: '',
      };
   }
   renderOption = ({ item, index }) => (
      <Pressable
         android_ripple={{ color: colors.black_transparent }}
         style={styles.options}
         onPress={() => this.setState({ selectedOption: item })}>
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styles.icon} source={item.icon} />
            <Text style={styles.txtOption}>{item.title}</Text>
         </View>
         {this.state.selectedOption === item ? (
            <Image style={{ width: 45, height: 45, resizeMode: 'contain' }} source={Images.ic_check} />
         ) : null}
      </Pressable>
   );

   render() {
      return (
         <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <Header title="Chi tiêu" isShowBack onPressBack={() => this.props.navigation.goBack()} />
            <FlatList
               data={incomeType}
               showsVerticalScrollIndicator={false}
               keyExtractor={(item, index) => String(index)}
               renderItem={this.renderOption}
            />
         </KeyboardAvoidingView>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
   },
   options: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      borderColor: colors.gray3,
      borderBottomWidth: 1,
      alignItems: 'center',
   },
   icon: {
      width: 70,
      height: 70,
      resizeMode: 'contain',
   },
   txtOption: {
      fontFamily: fonts.medium,
      fontSize: 16,
      marginLeft: 16,
   },
});
