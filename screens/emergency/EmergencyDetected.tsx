import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BackButton from '../../components/BackButton'; // Adjust the path as needed

const EmergencyScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('EmergencyDetail');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Image source={require('../../assets/emergency.png')} style={styles.icon} />
      <Text style={styles.text}>긴급 상황이에요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: '#d9534f',
    fontWeight: 'bold',
  },
});

export default EmergencyScreen;
