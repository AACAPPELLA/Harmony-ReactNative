import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FindPW = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    id: '',
    phone: '',
  });

  // 임시 데이터 설정
  const mockData = {
    name: 'kimsoyoon',
    id: 'soyxni',
    phone: '01012345678',
    token: 'mock-token-1234567890abcdef',
  };

  // 뒤로가기 버튼 클릭 시 호출되는 함수
  const handleBackPress = () => {
    navigation.goBack();
  };

  // '다음' 버튼 클릭 시 호출되는 함수
  const handleNextPress = async () => {
    const { name, id, phone } = userData;

    if (name && id && phone) {
      try {
        // API 요청 URL
        const response = await fetch(`https://your-backend-api.com/auth/check/password?serialId=${id}&userName=${name}&phoneNumber=${phone}`);
        const result = await response.json();

        if (result.success) {
          const token = result.data;

          // 비밀번호 재설정 페이지로 이동하며 토큰을 전달
          navigation.navigate('ResetPassword', { token });
        } else {
          // 서버 응답이 실패했을 때 임시 데이터와 비교
          if (name === mockData.name && id === mockData.id && phone === mockData.phone) {
            // 비밀번호 재설정 페이지로 이동하며 임시 토큰을 전달
            navigation.navigate('ResetPassword', { token: mockData.token });
          } else {
            Alert.alert('오류', '정보가 일치하는 회원이 없습니다.');
          }
        }
      } catch (error) {
        console.error('데이터 요청 중 오류 발생:', error);
        
        // 서버 오류 발생 시 임시 데이터와 비교
        if (name === mockData.name && id === mockData.id && phone === mockData.phone) {
          // 비밀번호 재설정 페이지로 이동하며 임시 토큰을 전달
          navigation.navigate('ResetPassword', { token: mockData.token });
        } else {
          Alert.alert('오류', '서버에 연결할 수 없습니다.');
        }
      }
    } else {
      Alert.alert('오류', '모든 정보를 입력해 주세요.');
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
