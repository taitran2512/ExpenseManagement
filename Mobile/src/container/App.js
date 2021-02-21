import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../res/style/theme';

////////////////////////////////////////////////////////////
import LoginContainer from './login/LoginContainer';
import SignUpContainer from './login/SignUpContainer';
import HomeContainer from './home/HomeContainer';
import ExpenseContainer from './home/ExpenseContainer';
import IncomeContainer from './home/IncomeContainer';
import StatisticContainer from './statistic/StatisticContainer';
import DrawerComponent from '../component/drawer/DrawerComponent';
import UserInfo from '../component/drawer/screen/UserInfo';
////////////////////////////////////////////////////////////
//bottom-tab
const Tab = createMaterialBottomTabNavigator();
const bottomTab = () => {
   return (
      <Tab.Navigator
         initialRouteName="Home"
         activeColor={colors.white}
         inactiveColor={colors.black1}
         shifting={true}
         barStyle={{ backgroundColor: colors.red1, height: 48, justifyContent: 'center' }}
         backBehavior="initialRoute">
         <Tab.Screen
            name="Home"
            component={HomeContainer}
            options={{
               tabBarLabel: 'Trang chủ',
               tabBarIcon: ({ color }) => <Icon name="home" color={color} size={26} />,
            }}
         />
         <Tab.Screen
            name="Statistic"
            component={StatisticContainer}
            options={{
               tabBarLabel: 'Thống kê',
               tabBarIcon: ({ color }) => <Icon name="chart-bar" color={color} size={26} />,
            }}
         />
      </Tab.Navigator>
   );
};
//Drawer navigation
const Drawer = createDrawerNavigator();
const Drawers = () => {
   return (
      <Drawer.Navigator drawerContent={(props) => <DrawerComponent {...props} />}>
         <Drawer.Screen name="Drawer" component={bottomTab} />
      </Drawer.Navigator>
   );
};
//stack navigation
const Stack = createStackNavigator();
const App = () => {
   return (
      <NavigationContainer>
         <Stack.Navigator
            screenOptions={{
               headerShown: false,
               ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name="Login" component={LoginContainer} />
            <Stack.Screen name="SignUp" component={SignUpContainer} />
            <Stack.Screen name="Home" component={Drawers} />
            <Stack.Screen name="Expense" component={ExpenseContainer} />
            <Stack.Screen name="Income" component={IncomeContainer} />
            <Stack.Screen name="UserInfo" component={UserInfo} />
         </Stack.Navigator>
      </NavigationContainer>
   );
};
export default App;
