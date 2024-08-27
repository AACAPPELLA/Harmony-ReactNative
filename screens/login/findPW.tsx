import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../axios'; // API 호출을 위해 axios 인스턴스를 import

const FindPW = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    id: '',
    phone: '',
  });

  // 뒤로가기 버튼 클릭 시 호출되는 함수
  const handleBackPress = () => {
    navigation.goBack();
  };

  // '다음' 버튼 클릭 시 호출되는 함수
  const handleNextPress = async () => {
    const { name, id, phone } = userData;

    try {
      const response = await api.get('/auth/check/password', {
        params: {
          serialId: id,
          userName: name,
          phoneNumber: phone,
        },
      });

      if (response.data.success) {
        // 인증이 성공하면 토큰을 받아 비밀번호 재설정 페이지로 이동
        const token = response.data.data;
        navigation.navigate('resetPW', { token });
      } else {
        // 인증 실패 시 경고 메시지 출력
        Alert.alert('오류', '입력한 정보가 일치하지 않습니다. 다시 확인해 주세요.');
      }
    } catch (error) {
      // 네트워크 오류 등 예외 처리
      Alert.alert('오류', '서버와의 통신에 문제가 발생했습니다.');
      console.error('Error checking user info:', error);
    }
  };

  // 입력값 변경 시 호출되는 함수
  const handleChange = (key: keyof typeof userData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image source={require('../../assets/mpBack.png')} style={styles.icon} resizeMode='contain'/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>본인 확인</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputText}
              placeholder="이름"
              value={userData.name}
              onChangeText={(text) => handleChange('name', text)}
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputText}
              placeholder="아이디"
              value={userData.id}
              onChangeText={(text) => handleChange('id', text)}
            />
          </View>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputText}
              placeholder="전화번호"
              value={userData.phone}
              onChangeText={(text) => handleChange('phone', text)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={handleNextPress} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>다음</Text>
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 15,
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

export default FindPW;
