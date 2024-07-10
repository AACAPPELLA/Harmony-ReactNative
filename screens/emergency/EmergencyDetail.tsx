// screens/EmergencyDetail.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const EmergencyDetail = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>긴급 상황 판단 중</Text>
      <Text style={styles.detail}>- 가스 누출이 의심됩니다...</Text>
      <Button
        title="다시 듣기"
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

export default EmergencyDetail;
