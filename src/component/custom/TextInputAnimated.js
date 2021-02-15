import React, { Component } from 'react';
import {
   TextInput,
   Animated,
   StyleSheet,
   Image,
   TouchableOpacity,
   View,
   Platform,
   Alert,
   Text,
} from 'react-native';
import Images from '../../res/image/index';
import { colors } from '../../res/style/theme';

const BASE_SIZE = 16; //text size and padding size
const VIEW_HEIGHT = BASE_SIZE * 3.5; //chiều cao của view tổng
export default class TextInputAnimated extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isFocused: false,
         hidePassword: true,
         labelHeight: 0,
      };
      this.textInput = React.createRef();
   }

   UNSAFE_componentWillMount() {
      this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
   }

   handleFocus = () => {
      this.setState({ isFocused: true });
   };

   handleBlur = () => {
      this.setState({ isFocused: false });
   };

   componentDidUpdate() {
      Animated.timing(this._animatedIsFocused, {
         toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
         duration: 200,
         useNativeDriver: false,
      }).start();
   }
   requireInput = () => <Text style={{ color: colors.red }}>*</Text>;
   render() {
      const { label, ...props } = this.props;
      const { isFocused, labelHeight } = this.state;
      const centerLabel = (VIEW_HEIGHT - labelHeight - 2) / 2;
      const labelStyle = {
         color: this.props.disabled ? colors.gray5 : colors.gray,
         padding: 0,
         textAlignVertical: 'top',
         position: 'absolute',
         left: BASE_SIZE,
         top: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [centerLabel, BASE_SIZE / 2],
         }),
         fontSize: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [BASE_SIZE, BASE_SIZE * 0.8125],
         }),
         // backgroundColor: '#00000036',
      };

      return (
         <TouchableOpacity
            activeOpacity={1}
            {...props}
            onPress={() => {
               this.props.isPicker ? null : this.textInput.current.focus();
               this.props.onPress();
            }}
            style={[
               styles.container,
               isFocused && {
                  borderColor: colors.lightblue1,
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOffset: {
                     width: 0,
                     height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  backgroundColor: colors.white,
               },
               this.props.disabled && { backgroundColor: colors.gray4 },
               this.props.style,
            ]}>
            {/* //////label floating///// */}
            <Animated.Text
               onLayout={(event) => {
                  labelHeight === 0 && this.setState({ labelHeight: event.nativeEvent.layout.height });
               }}
               style={[labelStyle, this.props.styleLabel]}>
               {label}
               {props.isRequired ? this.requireInput() : null}
            </Animated.Text>

            {this.props.isPassword ? (
               ///text input có icon ẩn hiện pass/////
               <>
                  <TextInput
                     {...props}
                     maxLength={100}
                     onChange={(e) => {
                        e.nativeEvent.text.length === 100 &&
                           setTimeout(() => {
                              Alert.alert('Thông báo', 'Không được nhập quá 100 kí tự');
                           }, 10);
                     }}
                     ref={this.textInput}
                     autoCorrect={false}
                     autoCompleteType="off"
                     style={[styles.textInput, isFocused && { width: '85%' }]}
                     onFocus={this.handleFocus}
                     secureTextEntry={this.state.hidePassword}
                     onBlur={this.handleBlur}
                     blurOnSubmit
                  />
                  {this.props.value !== '' && isFocused === true ? (
                     <>
                        <TouchableOpacity
                           style={{
                              position: 'absolute',
                              right: BASE_SIZE + 24,
                           }}
                           onPress={() => this.props.onPressClear()}>
                           <Image
                              resizeMode="contain"
                              style={{ width: 32, height: 32 }}
                              source={Images.ic_cancel}
                           />
                        </TouchableOpacity>
                        <View
                           style={{
                              width: 1,
                              height: 12,
                              backgroundColor: colors.gray3,
                              position: 'absolute',
                              right: BASE_SIZE + 24 + 2,
                           }}
                        />
                     </>
                  ) : null}

                  <TouchableOpacity
                     style={{ position: 'absolute', right: BASE_SIZE }}
                     onPress={() => {
                        this.setState({ hidePassword: !this.state.hidePassword });
                     }}>
                     <Image
                        resizeMode="contain"
                        style={{ width: 24, height: 24 }}
                        source={!this.state.hidePassword ? Images.ic_eye : Images.ic_eye_close}
                     />
                  </TouchableOpacity>
               </>
            ) : this.props.isHideInput ? (
               ///text input hide text/////
               <>
                  <TextInput
                     {...props}
                     maxLength={100}
                     onChange={(e) => {
                        e.nativeEvent.text.length === 100 &&
                           setTimeout(() => {
                              Alert.alert('Thông báo', 'Không được nhập quá 100 kí tự');
                           }, 10);
                     }}
                     ref={this.textInput}
                     autoCorrect={false}
                     autoCompleteType="off"
                     editable={!this.props.disabled}
                     style={[styles.textInput, this.props.disabled && { color: colors.gray }]}
                     secureTextEntry={this.state.hidePassword}
                     onFocus={this.handleFocus}
                     onBlur={this.handleBlur}
                     blurOnSubmit
                  />
                  {this.props.value !== '' && isFocused === true ? (
                     <TouchableOpacity
                        style={{
                           position: 'absolute',
                           right: BASE_SIZE / 2,
                        }}
                        onPress={() => this.props.onPressClear()}>
                        <Image
                           resizeMode="contain"
                           style={{ width: 32, height: 32 }}
                           source={Images.ic_cancel}
                        />
                     </TouchableOpacity>
                  ) : null}
               </>
            ) : this.props.isPicker ? (
               //textinput disable edit tích hợp vào picker
               <>
                  <TextInput
                     {...props}
                     maxLength={100}
                     editable={false}
                     ref={this.textInput}
                     autoCorrect={false}
                     autoCompleteType="off"
                     style={[styles.textInput, { color: colors.black }]}
                     onFocus={this.handleFocus}
                     onBlur={this.handleBlur}
                     blurOnSubmit
                  />
                  <View style={{ position: 'absolute', right: BASE_SIZE }}>
                     <Image
                        resizeMode="contain"
                        style={{
                           width: 24,
                           height: 24,
                           tintColor: colors.gray,
                        }}
                        source={Images.ic_down_arrow}
                     />
                  </View>
               </>
            ) : (
               //text input nhập chữ bình thường////////////
               <>
                  <TextInput
                     {...props}
                     onChange={(e) => {
                        e.nativeEvent.text.length === 100 &&
                           setTimeout(() => {
                              Alert.alert('Thông báo', 'Không được nhập quá 100 kí tự');
                           }, 10);
                     }}
                     maxLength={100}
                     ref={this.textInput}
                     autoCorrect={false}
                     autoCompleteType="off"
                     editable={!this.props.disabled}
                     style={[styles.textInput, this.props.disabled && { color: colors.gray }]}
                     style={styles.textInput}
                     onFocus={this.handleFocus}
                     onBlur={this.handleBlur}
                     blurOnSubmit
                  />
                  {this.props.value !== '' && isFocused === true ? (
                     <TouchableOpacity
                        style={{
                           position: 'absolute',
                           right: BASE_SIZE / 2,
                        }}
                        onPress={() => this.props.onPressClear()}>
                        <Image
                           resizeMode="contain"
                           style={{ width: 32, height: 32 }}
                           source={Images.ic_cancel}
                        />
                     </TouchableOpacity>
                  ) : null}
               </>
            )}
         </TouchableOpacity>
      );
   }
}
TextInputAnimated.defaultProps = {
   onPress: () => {},
   onPressClear: () => {},
};
const styles = StyleSheet.create({
   container: {
      borderColor: colors.gray3,
      borderRadius: BASE_SIZE / 2,
      borderWidth: 1,
      marginHorizontal: BASE_SIZE,
      paddingHorizontal: BASE_SIZE,
      paddingVertical: BASE_SIZE,
      height: VIEW_HEIGHT,
      justifyContent: 'center',
   },
   textInput: {
      width: '90%',
      position: 'absolute',
      left: BASE_SIZE,
      bottom: Platform.OS === 'ios' ? BASE_SIZE / 2 : BASE_SIZE / 2 - 5,
      // top: BASE_SIZE / 2,
      fontSize: BASE_SIZE,
      padding: 0,
      borderWidth: 0,
      // backgroundColor: '#00000036',
   },
});
