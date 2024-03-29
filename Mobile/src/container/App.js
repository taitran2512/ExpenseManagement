import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { language, colors } from '../res/style/theme';
import { connect } from 'react-redux';

////////////////////////////////////////////////////////////
import LoginContainer from './login/LoginContainer';
import SignUpContainer from './login/SignUpContainer';
import ForgetContainer from './login/ForgetContainer';
import HomeContainer from './home/HomeContainer';
import ExpenseContainer from './home/ExpenseContainer';
import IncomeContainer from './home/IncomeContainer';
import StatisticContainer from './statistic/StatisticContainer';
import DrawerContainer from './drawer/DrawerContainer';
import UserInfo from '../component/drawer/screen/UserInfo';
import DetailHistoryContainer from './history/DetailHistoryContainer';
import HistoryContainer from './history/HistoryContainer';
import ChangePasswordContainer from './drawer/screen/ChangePasswordContainer';
import SettingContainer from './drawer/SettingContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLanguageAction } from '../redux/action/drawer/setLanguageAction';
import { setColorAction } from '../redux/action/drawer/setColorAction';
import InfoApp from '../component/drawer/screen/InfoApp';
import ExportFileExcel from '../component/drawer/screen/ExportFileExcel';
import AlertAnimated from '../component/custom/AlertAnimated';
import Welcome from '../component/welcome/Welcome';
import MatomoTracker, { MatomoProvider, useMatomo } from 'matomo-tracker-react-native';
import { userData } from '../config/Config';
import { navigationRef } from './NavigionRef';

////////////////////////////////////////////////////////////
//bottom-tab
const Tab = createMaterialBottomTabNavigator();
const bottomTab = () => {
   return (
      <Tab.Navigator
         initialRouteName="Home"
         activeColor={colors.black}
         inactiveColor={colors.gray1}
         shifting={true}
         barStyle={{
            backgroundColor: colors.white,
            justifyContent: 'center',
            borderWidth: 1,
            borderTopColor: colors.gray2,
            overflow: 'hidden',
         }}
         iconStyle={{ width: 48, height: 48 }}
         backBehavior="initialRoute">
         <Tab.Screen
            name="Home"
            component={HomeContainer}
            options={{
               tabBarLabel: 'Trang chủ',
               tabBarIcon: ({ color }) => <Icon name="home" color={color} size={24} />,
            }}
         />
         <Tab.Screen
            name="History"
            component={HistoryContainer}
            options={{
               tabBarLabel: 'Lịch sử',
               tabBarIcon: ({ color }) => <Icon name="history" color={color} size={24} />,
            }}
         />
         <Tab.Screen
            name="Statistics"
            component={StatisticContainer}
            options={{
               tabBarLabel: 'Thống kê',
               tabBarIcon: ({ color }) => <Icon name="chart-bar" color={color} size={24} />,
            }}
         />
      </Tab.Navigator>
   );
};
//Drawer navigation
const Drawer = createDrawerNavigator();
const Drawers = () => {
   return (
      <Drawer.Navigator drawerContent={(props) => <DrawerContainer {...props} />}>
         <Drawer.Screen name="Drawer" component={bottomTab} />
      </Drawer.Navigator>
   );
};
//stack navigation
const Stack = createStackNavigator();
const MainStack = (props) => {
   const { trackAppStart, trackScreenView } = useMatomo();

   React.useLayoutEffect(() => {
      if (props.color !== colors.app) {
         colors.app = props.color;
         storeColor();
      }
      if (props.lang !== language.app) {
         language.app = props.lang;
         storeLanguage();
      }
   }, [props.color, props.lang]);
   async function storeLanguage() {
      try {
         await AsyncStorage.setItem('@appLanguage', props.lang);
      } catch (e) {
         // saving error
      }
   }
   async function storeColor() {
      try {
         await AsyncStorage.setItem('@appColor', props.color);
      } catch (e) {
         // saving error
      }
   }
   React.useEffect(() => {
      getLanguage();
      getColor();
      trackAppStart();
   }, []);
   async function getLanguage() {
      try {
         const value = await AsyncStorage.getItem('@appLanguage');
         if (value !== null && value !== undefined && value !== '') {
            // value previously stored
            language.app = value;
            props.setLanguageAction(value);
         }
      } catch (e) {
         // error reading value
      }
   }
   async function getColor() {
      try {
         const value = await AsyncStorage.getItem('@appColor');
         if (value !== null && value !== undefined && value !== '') {
            // value previously stored
            colors.app = value;
            props.setColorAction(value);
         }
      } catch (e) {
         // error reading value
      }
   }

   const routeNameRef = React.useRef();
   return (
      <NavigationContainer
         ref={navigationRef}
         onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
         onStateChange={() => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute().name;
            if (previousRouteName !== currentRouteName) {
               trackScreenView(currentRouteName);
            }
            // Save the current route name for later comparison
            routeNameRef.current = currentRouteName;
         }}>
         <Stack.Navigator
            screenOptions={{
               headerShown: false,
               ...TransitionPresets.SlideFromRightIOS,
            }}>
            {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
            <Stack.Screen name="Login" component={LoginContainer} />
            <Stack.Screen name="SignUp" component={SignUpContainer} />
            <Stack.Screen name="Forget" component={ForgetContainer} />
            <Stack.Screen name="Home" component={Drawers} />
            <Stack.Screen name="Expense" component={ExpenseContainer} />
            <Stack.Screen name="Income" component={IncomeContainer} />
            <Stack.Screen name="UserInfo" component={UserInfo} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordContainer} />
            <Stack.Screen name="DetailHistory" component={DetailHistoryContainer} />
            <Stack.Screen name="Setting" component={SettingContainer} />
            <Stack.Screen name="InfoApp" component={InfoApp} />
            <Stack.Screen name="ExportExcel" component={ExportFileExcel} />
         </Stack.Navigator>
         <AlertAnimated />
      </NavigationContainer>
   );
};

const App = (props) => {
   const instance = new MatomoTracker({
      urlBase: 'https://tatt19.matomo.cloud', // required
      trackerUrl: 'https://tatt19.matomo.cloud/matomo.php', // optional, default value: `${urlBase}matomo.php`
      siteId: 1, // required, number matching your Matomo project
      userId: userData._id, // optional, default value: `undefined`.
      disabled: false, // optional, default value: false. Disables all tracking operations if set to true.
      log: false, // optional, default value: false. Enables some logs if set to true.
   });

   return (
      <MatomoProvider instance={instance}>
         <MainStack {...props} />
      </MatomoProvider>
   );
};
const mapStateToProps = (state) => {
   return {
      lang: state.setLanguageReducer.lang,
      color: state.setColorReducer.color,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      setLanguageAction: (lang) => dispatch(setLanguageAction(lang)),
      setColorAction: (color) => dispatch(setColorAction(color)),
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
