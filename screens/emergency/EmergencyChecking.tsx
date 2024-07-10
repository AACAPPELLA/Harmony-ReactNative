import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import type { SVGProps } from 'react';

export function EosIconsThreeDotsLoading(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" {...props}><circle cx={18} cy={12} r={0} fill="#ff0000"><animate attributeName="r" begin={0.67} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={12} r={0} fill="#ff0000"><animate attributeName="r" begin={0.33} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={6} cy={12} r={0} fill="#ff0000"><animate attributeName="r" begin={0} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle></svg>);
}

const EmergencyChecking = ({ navigation }) => {
  const handleEmergency = () => {
    navigation.navigate('EmergencyDetected');
  };

  const handleSafe = () => {
    navigation.navigate('SafeDetected');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/emergency.png')} style={styles.icon} />
      <Text style={styles.text}>긴급 상황을 판단하는 중</Text>
      <EosIconsThreeDotsLoading/>
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
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: '#D0021B',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default EmergencyChecking;
