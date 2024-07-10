// screens/SafeDetail.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SafeDetail = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>안전한 상황일 것으로 예측돼요</Text>
      <Text style={styles.detail}>- 시스템이 정상적으로 작동하고 있습니다...</Text>
      <Button
        title="종료하기"
        onPress={() => navigation.navigate('EmergencyChecking')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default SafeDetail;
