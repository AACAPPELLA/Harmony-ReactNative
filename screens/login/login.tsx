import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/login_logo.png')} style={styles.logo} />

      <View style={styles.idContainer}>
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
    width: 200, 
    height: 100,
    marginBottom: 40,
  },
  idIcon: {
    marginLeft: 7,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#F7F7F7'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
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
    width: 23,
    height: 23,
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