import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import EmergencyScreen from './screens/EmergencyScreen';  
import ChatScreen from './screens/chat/ChatScreen'; 
import EmergencyChecking from './screens/emergency/EmergencyChecking';
import EmergencyDetected from './screens/emergency/EmergencyDetected';
import EmergencyDetail from './screens/emergency/EmergencyDetail';
import SafeDetected from './screens/emergency/SafeDetected';
import SafeDetail from './screens/emergency/SafeDetail' 
import ListeningChat from './screens/chat/ListeningChat';
import CalendarScreen from './screens/calendar/Calendar';

import LoginScreen from './screens/login/login'
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Emergency" component={EmergencyScreen} />
        <Stack.Screen name="ListeningChat" component={ListeningChat} options={{headerShown: false}} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}}/>
        <Stack.Screen name="EmergencyChecking" component={EmergencyChecking} options={{headerShown: false}} />
        <Stack.Screen name="EmergencyDetected" component={EmergencyDetected} options={{headerShown: false}} />
        <Stack.Screen name="EmergencyDetail" component={EmergencyDetail} options={{headerShown: false}} />
        <Stack.Screen name="SafeDetected" component={SafeDetected} options={{headerShown: false}} />
        <Stack.Screen name="SafeDetail" component={SafeDetail} options={{headerShown: false}} />
        <Stack.Screen name="Calendar" component={CalendarScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
