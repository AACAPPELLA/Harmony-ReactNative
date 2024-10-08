import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../axios'; 
import BackButton from '../components/BackButton';

const initialUserData = {
  name: '',
  id: '',
  password: '',
  confirmPassword: '',
  phone: '',
  // disabilityType: '', // 주석 처리
};

const MyPage = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(initialUserData);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setEditedUserData({
          name: response.data.data.name,
          id: response.data.data.serialId,
          password: '', // 패스워드는 비공개 -> 수정만 가능
          confirmPassword: '',
          phone: response.data.data.phoneNumber,
          // disabilityType: response.data.data.disabilityType, // 주석 처리
        });
      } else {
        console.error('Error', 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = async () => {
    if (editedUserData.password !== editedUserData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await api.put('/users', {
        password: editedUserData.password,
        name: editedUserData.name,
        phoneNumber: editedUserData.phone,
        // email: 'your-email@example.com', // 가입 시에는 입력X
        // disabilityType: editedUserData.disabilityType, // 주석 처리
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setIsEditing(false);
        Alert.alert('수정 성공!', '회원님의 정보를 성공적으로 수정하였습니다.');
      } else {
        console.error('Error', 'Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleCancelPress = () => {
    fetchUserData(); // 수정하기 취소 -> 원래 데이터 가져오기
    setIsEditing(false);
  };

  const handleChange = (key: keyof typeof editedUserData, value: string) => {
    setEditedUserData({ ...editedUserData, [key]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <BackButton navigation={navigation} />
        <Text style={styles.headerTitle}>MyPage</Text>
      </View>
      <ScrollView>
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>
              <Text style={styles.userName}>{editedUserData.name}</Text> 님,
            </Text>
            <Text style={styles.welcomeText}>오늘도 안녕하세요!</Text>
          </View>
          <Image
            source={require('../assets/logo-blue.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Image source={require('../assets/mpName.png')} style={styles.icon} resizeMode='contain' />
            {isEditing ? (
              <TextInput
                style={styles.inputText}
                value={editedUserData.name}
                onChangeText={(text) => handleChange('name', text)}
              />
            ) : (
              <Text style={styles.infoText}>{editedUserData.name}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../assets/mpId.png')} style={styles.icon} resizeMode='contain' />
            <Text style={styles.infoText}>{editedUserData.id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../assets/mpPW.png')} style={styles.icon} resizeMode='contain' />
            {isEditing ? (
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputText}
                  value={editedUserData.password}
                  secureTextEntry={!showPassword}
                  placeholder="새 비밀번호"
                  onChangeText={(text) => handleChange('password', text)}
                />
                <TouchableOpacity onPress={toggleShowPassword}>
                  <Image
                    source={showPassword ? require('../assets/eye_open.png') : require('../assets/eye_close.png')}
                    style={styles.eyeIcon}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.infoText}>********</Text>
            )}
          </View>
          {isEditing && (
            <View style={styles.infoRow}>
              <Image source={require('../assets/mpPW.png')} style={styles.icon} resizeMode='contain' />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputText}
                  value={editedUserData.confirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="비밀번호 재확인"
                  onChangeText={(text) => handleChange('confirmPassword', text)}
                />
                <TouchableOpacity onPress={toggleShowConfirmPassword}>
                  <Image
                    source={showConfirmPassword ? require('../assets/eye_open.png') : require('../assets/eye_close.png')}
                    style={styles.eyeIcon}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={styles.infoRow}>
            <Image source={require('../assets/mpTele.png')} style={styles.icon} resizeMode='contain' />
            {isEditing ? (
              <TextInput
                style={styles.inputText}
                value={editedUserData.phone}
                onChangeText={(text) => handleChange('phone', text)}
              />
            ) : (
              <Text style={styles.infoText}>{editedUserData.phone}</Text>
            )}
          </View>
          {/*
          <View style={styles.infoRow}>
            <Image source={require('../assets/mpCate.png')} style={styles.icon} resizeMode='contain' />
            {isEditing ? (
              <TextInput
                style={styles.inputText}
                value={editedUserData.disabilityType}
                onChangeText={(text) => handleChange('disabilityType', text)}
              />
            ) : (
              <Text style={styles.infoText}>{editedUserData.disabilityType}</Text>
            )}
          </View>
          */}
          {!isEditing && (
            <TouchableOpacity onPress={handleEditPress}>
              <Text style={styles.editButton}>수정하기</Text>
            </TouchableOpacity>
          )}
          {isEditing && (
            <View style={styles.editActions}>
              <TouchableOpacity onPress={handleSavePress} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>수정 내용 저장하기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancelPress} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Conditionally render the footer navigation bar */}
      {!isEditing && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/home-icon-gray.png')} style={styles.footerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Calendar')}>
            <Image source={require('../assets/calendar-icon-gray.png')} style={styles.footerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('MyPage')}>
            <Image source={require('../assets/settings-icon-navy.png')} style={styles.footerIcon} />
          </TouchableOpacity>
        </View>
      )}
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
  infoContainer: {
    padding: 20,
    marginLeft: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    height: 50,
    width: 320,
    paddingHorizontal: 15,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
  },
  inputText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 60,
    marginLeft: 45,
    marginTop: 20,
  },
  welcomeTextContainer: {
    flexDirection: 'column',
  },
  welcomeText: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  userName: {
    color: '#291695',
  },
  logo: {
    width: 60,
    height: 60,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  editButton: {
    fontSize: 14,
    color: '#5A5A5A',
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginLeft: 260,
  },
  editActions: {
    marginTop: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#291695',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: 280,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: 280,
    borderWidth: 1,
    borderColor: '#291695',
  },
  cancelButtonText: {
    color: '#291695',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 35,
    height: 35,
  },
});

export default MyPage;
