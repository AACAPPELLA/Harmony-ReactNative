import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../axios'; // axios 설정 파일을 import

const ResetPW = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params; // findPW 페이지에서 넘겨준 토큰을 받음
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // 비밀번호 변경 요청 함수
  const handleChangePassword = async () => {
    if (password === confirmPassword) {
      try {
        // 비밀번호 변경 API 요청
        const response = await api.patch('/users/password', {
          password: password,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`, // findPW에서 받은 토큰을 추가
          }
        });

        const result = response.data;

        if (result.success) {
          Alert.alert('성공', '비밀번호가 변경되었습니다.');
          navigation.navigate('Login'); // login.tsx 페이지로 이동
        } else {
          Alert.alert('오류', '비밀번호 변경에 실패했습니다.');
        }
      } catch (error) {
        console.error('비밀번호 변경 중 오류 발생:', error);
        Alert.alert('오류', '서버에 연결할 수 없습니다.');
      }
    } else {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
    }
  };

  // 뒤로가기 버튼 클릭 시 호출되는 함수
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image source={require('../../assets/mpBack.png')} style={styles.icon} resizeMode='contain'/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>비밀번호 재설정</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputText}
              placeholder="새 비밀번호"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={secureTextEntry}
            />
            <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.eyeIcon}>
              <Image source={secureTextEntry ? require('../../assets/eye_close.png') : require('../../assets/eye_open.png')} style={styles.icon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputText}
              placeholder="새 비밀번호 확인"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={secureTextEntry}
            />
          </View>
        </View>
        <TouchableOpacity onPress={handleChangePassword} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>변경하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  inputGroup: {
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    height: 50,
    width: '100%',
    paddingHorizontal: 15,
  },
  inputText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  nextButton: {
    backgroundColor: '#291695',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ResetPW;
