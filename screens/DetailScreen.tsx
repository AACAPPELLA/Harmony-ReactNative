// HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

function DetailScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Detail Screen</Text>
      <Button
        title="Go to Detail Screen"
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  );
}

export default DetailScreen;

// DetailScreen.js, ProfileScreen.js, SettingsScreen.js 등도 비슷한 방식으로 작성합니다.
