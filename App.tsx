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
import MyPage from './screens/MyPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Emergency" component={EmergencyScreen} />
        <Stack.Screen name="ListeningChat" component={ListeningChat} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="EmergencyChecking" component={EmergencyChecking} options={{headerShown: false}} />
        <Stack.Screen name="EmergencyDetected" component={EmergencyDetected} options={{headerShown: false}} />
        <Stack.Screen name="EmergencyDetail" component={EmergencyDetail} options={{headerShown: false}} />
        <Stack.Screen name="SafeDetected" component={SafeDetected} options={{headerShown: false}} />
        <Stack.Screen name="SafeDetail" component={SafeDetail} options={{headerShown: false}} />
        <Stack.Screen name="MyPage" component={MyPage}  options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
