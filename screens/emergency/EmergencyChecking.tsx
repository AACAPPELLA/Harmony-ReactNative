import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import BackButton from '../../components/BackButton'; // Adjust the path as needed

const EmergencyChecking = ({ navigation }) => {
  const handleEmergency = () => {
    navigation.navigate('EmergencyDetected');
  };

  const handleSafe = () => {
    navigation.navigate('SafeDetected');
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Image source={require('../../assets/emergency.png')} style={styles.icon} />
      <Text style={styles.text}>긴급 상황을 판단하는 중</Text>
      <Image source={require('../../assets/loading_red.png')} style={[styles.loadingIcon]} />
      <View style={styles.buttonContainer}>
        <Button title="긴급 상황" onPress={handleEmergency} color="#D0021B" />
        <Button title="안전 상황" onPress={handleSafe} color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 40,
    marginTop: 120
  },
  loadingIcon: {
    width: 45,  // loading_red.png 이미지만 너비를 10으로 설정
    height: 10, // loading_red.png 이미지만 높이를 10으로 설정
    marginBottom : 100
  },
  text: {
    fontSize: 27,
    color: '#D0021B',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default EmergencyChecking;
