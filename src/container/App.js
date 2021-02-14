import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

////////////////////////////////////////////////////////////
import LoginContainer from './login/LoginContainer';
import HomeContainer from './home/HomeContainer';
////////////////////////////////////////////////////////////
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
            <Stack.Screen name="Home" component={HomeContainer} />
         </Stack.Navigator>
      </NavigationContainer>
   );
};
export default App;
