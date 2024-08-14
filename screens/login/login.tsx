import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleFindPWPress = () => {
    navigation.navigate('findPW');
  }
  
  const storeTokens = async (accessToken, refreshToken) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      console.log('토큰 저장 성공');
      
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
    
      console.log('Stored Access Token:', storedAccessToken);
      console.log('Stored Refresh Token:', storedRefreshToken);
    } catch (error) {
      console.error('토큰 저장 오류', error);
    }
  };

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
        // 토큰 저장
        await storeTokens(accessToken, refreshToken);
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
      <Image source={require('../../assets/login_logo.png')} style={styles.logo} />

      <View style={styles.inputContainer}>
        <Image source={require('../../assets/id.png')} style={styles.idIcon} />
        <TextInput 
          placeholder="아이디"
          style={styles.input}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Image source={require('../../assets/password.png')} style={styles.passwordIcon} />
        <TextInput 
          placeholder="비밀번호"
          secureTextEntry={!passwordVisible}
          style={styles.input}
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
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton}>
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
  logo: {
    width: 200, // Adjust the width as needed
    height: 100, // Adjust the height as needed
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
    padding: 6,
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
    padding: 6,
  },
});

export default Login;