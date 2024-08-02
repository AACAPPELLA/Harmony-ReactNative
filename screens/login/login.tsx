import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import api from '../../axios';

const Login = ({ navigation }) => {
  const [serialId, setSerialId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      console.log('로그인 시도 중:', { serialId, password });
      const response = await api.post('/auth/login', null, {
        params: {
          serialId,
          password
        }
      });

      console.log('응답:', response.data);

      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data;
        // 토큰 처리 (예: 저장소에 저장, 홈 화면으로 이동 등)
        console.log('액세스 토큰:', accessToken);
        console.log('리프레시 토큰:', refreshToken);
        Alert.alert('로그인 성공', '성공적으로 로그인되었습니다.');
        navigation.navigate('Home');
      } else {
        Alert.alert('로그인 실패', '잘못된 아이디 또는 비밀번호입니다.');
      }
    } catch (error) {
      console.error('로그인 오류', error);
      Alert.alert('로그인 오류', '로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME TO</Text>
      <Text style={styles.harmony}>HARMONY</Text>
      
      <View style={styles.inputContainer}>
        <Image source={require('../../assets/id.png')} style={styles.idIcon} />
        <TextInput 
          placeholder="아이디"
          style={styles.input}
          value={serialId}
          onChangeText={setSerialId}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Image source={require('../../assets/password.png')} style={styles.passwordIcon} />
        <TextInput 
          placeholder="비밀번호"
          secureTextEntry={!passwordVisible}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Image 
            source={passwordVisible ? require('../../assets/eye_open.png') : require('../../assets/eye_close.png')} 
            style={styles.eyeIcon} 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.signupButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#291695',
  },
  harmony: {
    fontSize: 45,
    color: '#291695',
    marginBottom: 40,
  },
  idIcon: {
    marginLeft: 7,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#F7F7F7'
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#291695',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  signupButton: {
    borderWidth: 1,
    borderColor: '#291695',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#291695',
    fontSize: 18,
  },
});

export default Login;
