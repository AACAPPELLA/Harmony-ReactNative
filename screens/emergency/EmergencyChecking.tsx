import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Linking, Platform } from 'react-native';
import BackButton from '../../components/BackButton'; // Adjust the path as needed
import SpeechCommand from 'react-native-speech-command';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const EmergencyChecking = ({ navigation }) => {
  const handleEmergency = () => {
    navigation.navigate('EmergencyDetected');
  };

  const handleSafe = () => {
    navigation.navigate('SafeDetected');
  };

  React.useEffect(() => {
    setTimeout(() => {
      SpeechCommand.addResultListener((result) => {
        console.log('addResultListener', result);
      });

      SpeechCommand.addErrorListener((error) => {
        console.error('addErrorListener', error);
      });
    }, 1000);
  }, []);

  const checkPermission = (callback: any) => {
    const permission =
      Platform.select({
        ios: PERMISSIONS.IOS.MICROPHONE,
        android: PERMISSIONS.ANDROID.RECORD_AUDIO,
      }) || PERMISSIONS.IOS.MICROPHONE;
    
    
    request(permission).then((result) => {
      if (result === RESULTS.GRANTED) {
        callback();
      } else {
        console.log('Permission denied');
        Linking.openSettings();
      }
    });
  };

  const handleStart = () => {
    checkPermission(() => SpeechCommand.start());
  };

  const handleStop = () => {
    checkPermission(() => SpeechCommand.stop());
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Image source={require('../../assets/emergency.png')} style={styles.icon} />
      <Text style={styles.text}>긴급 상황을 판단하는 중</Text>
      <Image source={require('../../assets/loading_red.png')} style={[styles.icon, styles.loadingIcon]} />
      <View style={styles.buttonContainer}>
        <Button title="긴급 상황" onPress={handleEmergency} color="#D0021B" />
        <Button title="안전 상황" onPress={handleSafe} color="#4CAF50" />
      </View>
      <Button title="Init" onPress={SpeechCommand.init} />
      <Button title='Start' onPress={handleStart} />
      <Button title='Stop' onPress={handleStop} />
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
  loadingIcon: {
    width: 10,  // loading_red.png 이미지만 너비를 10으로 설정
    height: 10, // loading_red.png 이미지만 높이를 10으로 설정
  },
  text: {
    fontSize: 20,
    color: '#D0021B',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default EmergencyChecking;
