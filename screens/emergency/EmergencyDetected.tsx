import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const EmergencyScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('EmergencyDetail');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/goback.png')} style={styles.backButtonImage} />
      </TouchableOpacity>
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
  backButton: {
    position: 'absolute',
    top: 20, // Adjust according to your need
    left: 20, // Adjust according to your need
    padding: 5,
  },
  backButtonImage: {
    width: 24,
    height: 24,
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
