import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Animated } from 'react-native';
import { colors, fonts, screenWidth } from '../../res/style/theme';
import Images from '../../res/image';
import Video from 'react-native-video';
import StatusBarView from '../custom/StatusBarView';

// export default class Welcome extends React.Component {
//    constructor(props) {
//       super(props);
//       this.state = {};
//       this.animation = new Animated.Value(0);
//    }
//    componentDidMount() {
//       this.loading();
//    }
//    loading = () => {
//       const time = Math.floor(Math.random() * 2 + 1) * 1000;
//       Animated.timing(this.animation, {
//          toValue: 1,
//          duration: time,
//          useNativeDriver: false,
//       }).start(() => this.props.navigation.replace('Login'));
//    };
//    render() {
//       return (
//          <View style={styles.container}>
//             <StatusBarView />
//             <SafeAreaView />
//             <Image source={Images.mew_logo} style={styles.logo} />
//             <Text style={styles.title}>Ví điện tử tiện lợi cho mọi người</Text>
//             {/* //Progress */}
//             <View style={styles.parentProgress}>
//                <Animated.View
//                   style={[
//                      styles.childProgress,
//                      {
//                         width: this.animation.interpolate({
//                            inputRange: [0, 1],
//                            outputRange: ['0%', '100%'],
//                         }),
//                      },
//                   ]}
//                />
//             </View>
//             {/* //copyright */}
//             <Text style={styles.copyright}>{'\u00A9'} Mew. {new Date().getFullYear()}</Text>
//             <SafeAreaView />
//          </View>
//       );
//    }
// }

export default class Welcome extends React.Component {
   componentDidMount() {
      setTimeout(() => {
         this.props.navigation.replace('Login');
      }, 4000)
   }
   render() {
      return (
         <View style={styles.container}>
            <Video source={require('../../res/image/img/splash.mp4')}
               style={styles.videoStyle}
               muted={true}
               resizeMode='cover' />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
   },
   logo: {
      width: screenWidth * 0.3,
      height: screenWidth * 0.3 * 1.288,
      resizeMode: 'contain',
   },
   title: {
      color: colors.blue4,
      fontFamily: fonts.heavy,
      fontSize: 22,
      marginTop: 12,
      textAlign: 'center',
   },
   parentProgress: {
      borderRadius: 10,
      backgroundColor: '#DDDDDD',
      height: 12,
      width: '80%',
      position: 'absolute',
      bottom: 55,
   },
   childProgress: {
      backgroundColor: colors.blue4,
      borderRadius: 10,
      height: 12,
   },
   copyright: {
      position: 'absolute',
      bottom: 16,
      fontFamily: fonts.semibold,
      fontSize: 16,
   },
   videoStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
   }
});
