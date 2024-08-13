import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import api from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('비밀번호 불일치', '비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('토큰 오류', '로그인 토큰이 없습니다.');
        console.log('로그인 토큰이 없습니다.');
        return;
      }

      console.log('회원가입 요청:', { serialId: username, password, name, phoneNumber });

      const response = await api.post('/auth/register', {
        serialId: username,
        password,
        name,
        phoneNumber,
        age: 25 // 이 부분은 나이 입력 필드 추가 시 수정 필요
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      console.log('회원가입 응답:', response.data);

      if (response.data.success) {
        Alert.alert('회원가입 성공', '성공적으로 회원가입되었습니다.');
        console.log('회원가입 성공:', response.data);
        navigation.navigate('Login');
      } else {
        Alert.alert('회원가입 실패', '회원가입에 실패하였습니다.');
        console.log('회원가입 실패:', response.data.error);
      }
    } catch (error) {
      console.error('회원가입 오류', error);
      Alert.alert('회원가입 오류', '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const formatPhoneNumber = (number) => {
    const cleaned = ('' + number).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return number;
  };

  const handlePhoneNumberChange = (text) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>HARMONY</Text>

        <View style={styles.top}>
          <Text style={styles.holder}>아이디</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder="아이디를 입력해주세요"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <Text style={styles.holder}>비밀번호</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChangeText={setPassword}
              style={styles.textinput}
              secureTextEntry
            />
            <Image source={require('../../assets/password_uncheck.png')} style={styles.icon} />
          </View>

          <Text style={styles.holder}>비밀번호 확인</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder="비밀번호를 한번 더 입력해주세요"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.textinput}
              secureTextEntry
            />
            <Image source={require('../../assets/password_check.png')} style={styles.icon} />
          </View>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.holder}>이름</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder="본인 이름을 입력해주세요"
              value={name}
              onChangeText={setName}
            />
          </View>

          <Text style={styles.holder}>전화번호</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder="핸드폰 번호를 입력해주세요"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="numeric"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>가입 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top:{
    marginBottom:40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  holder: {
    fontSize: 15,
    color: '#000',
    textAlign: 'left',
    marginBottom: 8,
    marginLeft: 7,
  },
  header: {
    fontSize: 32,
    color: '#291695',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor:'#F7F7F7',
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 9,
  },
  textinput: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    padding: 20,
  },
  button: {
    backgroundColor: '#291695',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignUpScreen;
