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

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNextPress = () => {
    // 본인 확인을 위한 로직 추가
    if (userData.name && userData.id && userData.phone) {
      Alert.alert('Success', '본인 확인이 완료되었습니다.');
      // 다음 단계로 이동하는 로직 추가
    } else {
      Alert.alert('Error', '모든 정보를 입력해 주세요.');
    }
  };

  const handleChange = (key: keyof typeof userData, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image source={require('../assets/mpBack.png')} style={styles.icon} resizeMode='contain'/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>본인 확인</Text>
      </View>
      <View style={styles.formContainer}>
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
    padding: 20,
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
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
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FindPW;
