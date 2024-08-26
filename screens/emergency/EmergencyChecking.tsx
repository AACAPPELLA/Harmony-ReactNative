import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import axios from 'axios';
import BackButton from '../../components/BackButton';

const EmergencyChecking = ({ navigation }) => {
  
  useEffect(() => {
    const checkEmergencyStatus = async () => {
      try {
        // 로컬 파일 경로 설정
        const localFilePath = `${RNFS.DocumentDirectoryPath}/sound.wav`;

        // 'assets/sound.wav' 파일을 로컬 파일 시스템으로 복사
        await RNFS.copyFileAssets('sound.wav', localFilePath);

        // 파일 URI 확인
        const soundFileUri = `file://${localFilePath}`;
        console.log('Local sound file URI:', soundFileUri);

        // FormData 설정
        const formData = new FormData();
        formData.append('file', {
          uri: soundFileUri,
          name: 'sound.wav',
          type: 'audio/wav',
        });

        console.log('FormData:', formData);

        // API 요청aㄴ라ㅓㄴ리ㅏㅓㅁ나ㅣ러남람ㄴ어 뭐가 문제여ㅣ멀이ㅏ너라ㅣㄴ멍라ㅣㄴ머ㅏㅣ
        const response = await axios.post('https://aacappella.shop/ai/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('API Response:', response.data);

        const { is_warning, prediction } = response.data;

        if (is_warning) {
          navigation.navigate('EmergencyDetected', { prediction });
        } else {
          navigation.navigate('SafeDetected');
        }
      } catch (error) {
        // 에러 디버깅 정보 출력
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request:', error.request);
        } else {
          console.error('Error:', error.message);
        }
        console.error('Error config:', error.config);
        Alert.alert('오류', '긴급 상황 확인에 실패했습니다.');
      }
    };

    checkEmergencyStatus(); // 컴포넌트가 마운트될 때 자동으로 긴급 상황 확인

  }, [navigation]);

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Image source={require('../../assets/emergency.png')} style={styles.icon} />
      <Text style={styles.text}>긴급 상황을 판단하는 중</Text>
      <Image source={require('../../assets/loading_red.png')} style={styles.loadingIcon} />
      <View style={styles.buttonContainer}>
        <Button title="긴급 상황" onPress={() => navigation.navigate('EmergencyDetected')} color="#D0021B" />
        <Button title="안전 상황" onPress={() => navigation.navigate('SafeDetected')} color="#4CAF50" />
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
    width: 45,
    height: 10,
    marginBottom: 100
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
