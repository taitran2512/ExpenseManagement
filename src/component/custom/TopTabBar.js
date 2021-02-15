import { Sizes } from '@dungdang/react-native-basic';
import React from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   Animated,
   ScrollView,
   Dimensions,
   StyleSheet,
} from 'react-native';
import { googleAnalyticLogEvent } from '../../config/GoogleAnalytic';
import { colors, fonts } from '../../res/values/styles/baseTheme';

const { width } = Dimensions.get('window');

export default class TopTabBar extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         active: 0,
         xTabOne: 0,
         xTabTwo: 0,
         translateX: new Animated.Value(Sizes.s2 * 4),
      };
      this.scrollView = React.createRef();
   }
   ////tab animated
   handleSlide = (value) => {
      let { translateX } = this.state;
      Animated.spring(translateX, {
         toValue: value,
         duration: 100,
         useNativeDriver: true,
      }).start();
   };
   ///press tab right
   onPressRight = () => {
      googleAnalyticLogEvent(`press_tab_${this.props.labelRightEN}`, {
         tabName: this.props.labelRightEN,
      });
      this.setState({ active: 1 }, () => this.handleSlide(this.state.xTabTwo));
      this.scrollView.current.scrollTo({ x: width, y: 0 });
   };
   ///press tab left
   onPressLeft = () => {
      googleAnalyticLogEvent(`press_tab_${this.props.labelLeftEN}`, {
         tabName: this.props.labelLeftEN,
      });
      this.setState({ active: 0 }, () => this.handleSlide(this.state.xTabOne));
      this.scrollView.current.scrollTo({ x: -width, y: 0 });
   };
   ///////////
   render() {
      let { xTabOne, xTabTwo, translateX, active } = this.state;
      return (
         <View style={styles.container}>
            {/* ////////Tab Bar////////// */}
            <View
               style={[
                  { borderBottomWidth: 1, borderBottomColor: '#E5E5E5' },
                  this.props.tabBarStyle,
               ]}>
               <View style={styles.tabBar}>
                  <Animated.View
                     style={{
                        position: 'absolute',
                        width: '50%',
                        height: '100%',
                        top: Sizes.s2 * 4,
                        bottom: Sizes.s2 * 4,
                        backgroundColor: colors.white,
                        borderRadius: Sizes.h12,
                        transform: [
                           {
                              translateX,
                           },
                        ],
                     }}
                  />
                  <TouchableOpacity
                     style={styles.tabOption}
                     onLayout={(event) => {
                        this.setState({
                           xTabOne: event.nativeEvent.layout.x,
                        });
                     }}
                     onPress={() => {
                        this.onPressLeft();
                        this.props.onPressTabLeft();
                     }}>
                     <Text
                        style={[styles.textTab, active === 0 && { color: colors.black }]}>
                        {this.props.labelLeft}
                     </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                     style={styles.tabOption}
                     onLayout={(event) =>
                        this.setState({
                           xTabTwo: event.nativeEvent.layout.x,
                        })
                     }
                     onPress={() => {
                        this.onPressRight();
                        this.props.onPressTabRight();
                     }}>
                     <Text
                        style={[styles.textTab, active === 1 && { color: colors.black }]}>
                        {this.props.labelRight}
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
            {/* ///////////ScrollView///////////////////// */}
            <ScrollView
               ref={this.scrollView}
               horizontal
               pagingEnabled
               scrollEnabled={false}
               showsHorizontalScrollIndicator={false}
               // onScroll={(event) => {
               //    console.log('asd', event.nativeEvent.contentOffset.x / width);
               //    // this.setState({ active: Math.round(event.nativeEvent.contentOffset.x / width) });
               //    if (event.nativeEvent.contentOffset.x / width === 0) {
               //       this.setState({ active: 0 });
               //       this.handleSlide(xTabOne);
               //    }
               //    if (
               //       Math.round(event.nativeEvent.contentOffset.x / width) === 1 &&
               //       event.nativeEvent.contentOffset.x / width > 0.999
               //    ) {
               //       this.setState({ active: 1 });
               //       this.handleSlide(xTabTwo);
               //    }
               // }}
               contentContainerStyle={{ flexGrow: 1 }}>
               {this.props.children}
            </ScrollView>
         </View>
      );
   }
}
TopTabBar.defaultProps = {
   onPressTabLeft: () => {},
   onPressTabRight: () => {},
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
   },
   tabBar: {
      flexDirection: 'row',
      backgroundColor: '#EFEFEF',
      marginVertical: Sizes.h16,
      marginHorizontal: Sizes.h32,
      padding: Sizes.s2 * 4,
      borderRadius: Sizes.h16,
   },
   tabOption: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Sizes.h18,
   },
   textTab: {
      fontSize: Sizes.h32,
      fontFamily: fonts.bold,
      color: '#A1A7AD',
   },
});
