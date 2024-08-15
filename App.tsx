import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PushNotification from 'react-native-push-notification';

import HomeScreen from './screens/HomeScreen';
import EmergencyScreen from './screens/EmergencyScreen';
import ChatScreen from './screens/chat/ChatScreen';
import EmergencyChecking from './screens/emergency/EmergencyChecking';
import EmergencyDetected from './screens/emergency/EmergencyDetected';
import EmergencyDetail from './screens/emergency/EmergencyDetail';
import SafeDetected from './screens/emergency/SafeDetected';
import SafeDetail from './screens/emergency/SafeDetail';
import ListeningChat from './screens/chat/ListeningChat';
import LoginScreen from './screens/login/login';
import SignUpScreen from './screens/login/signup';
import MyPage from './screens/MyPage';
import SharedListeningChat from './screens/SharedChat/SharedListeningChat';
import SharedChatScreen from './screens/SharedChat/SharedChatScreen';
import SetTitle from './screens/SharedChat/SetTitle';
import SavedShared from './screens/SharedChat/SavedShared';
import CalendarScreen from './screens/calendar/Calendar';
import findPW from './screens/login/findPW';
import resetPW from './screens/login/resetPW';

const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    // 앱이 시작될 때 알림 채널 생성
    PushNotification.createChannel(
      {
        channelId: "1234", // 채널 ID
        channelName: "Default Channel", // 채널 이름
        channelDescription: "A default channel for notifications", // 채널 설명
        soundName: "default", // (optional) 특정 사운드를 사용할 수 있음. 'default'는 기본 사운드를 의미
        importance: 4, // (optional) 1~5로 중요도를 설정 가능. 4는 HIGH를 의미
        vibrate: true, // (optional) 진동 여부
      },
      (created) => console.log(`createChannel returned '${created}'`) // 생성 여부를 확인하는 로그
    );
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
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
        <Stack.Screen name="MyPage" component={MyPage}  options={{headerShown: false}}/>
        <Stack.Screen name="SharedListeningChat" component={SharedListeningChat}  options={{headerShown: false}}/>
        <Stack.Screen name="SharedChatScreen" component={SharedChatScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="SetTitle" component={SetTitle}  options={{headerShown: false}}/>
        <Stack.Screen name="SavedShared" component={SavedShared}  options={{headerShown: false}}/>
        <Stack.Screen name="findPW" component={findPW}  options={{headerShown: false}}/>
        <Stack.Screen name="resetPW" component={resetPW}  options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
