import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const initialUserData = {
  name: '김소윤',
  id: 'soyxni',
  password: '********',
  phone: '010-1234-5678',
  disabilityType: '',
};

const MyPage = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(initialUserData);
  const [error, setError] = useState(null);

  // useEffect로 컴포넌트가 마운트될 때 사용자 정보 가져옴 .. 공부더해
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/user'); // url 수정
      const result = await response.json();
      if (result.success) {
        setEditedUserData({
          name: result.data.name,
          id: result.data.serialId,
          password: '********', // 패스워드는 비공개 -> 수정만 가능?? 회의 때 논의
          phone: result.data.phoneNumber,
          disabilityType: result.data.disabled,
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
    try {
      const response = await fetch('http://your-backend-url/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: editedUserData.password,
          name: editedUserData.name,
          phoneNumber: editedUserData.phone,
          email: 'your-email@example.com', //가입 시에는 입력X
          eDisabled: editedUserData.disabilityType,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsEditing(false);
        Alert.alert('Success', 'User data updated successfully');
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

  const handleFindPWPress = () => {
    navigation.navigate('FindPW');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image source={require('../assets/mpBack.png')} style={styles.icon} resizeMode='contain'/>
        </TouchableOpacity>
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
            {isEditing ? (
              <TextInput
                style={styles.inputText}
                value={editedUserData.id}
                onChangeText={(text) => handleChange('id', text)}
              />
            ) : (
              <Text style={styles.infoText}>{editedUserData.id}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Image source={require('../assets/mpPW.png')} style={styles.icon} resizeMode='contain' />
            {isEditing ? (
              <TextInput
                style={styles.inputText}
                value={editedUserData.password}
                onChangeText={(text) => handleChange('password', text)}
              />
            ) : (
              <Text style={styles.infoText}>{editedUserData.password}</Text>
            )}
          </View>
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
          <TouchableOpacity onPress={handleFindPWPress} style={styles.findPWButton}>
            <Text style={styles.findPWButtonText}>비밀번호를 잊어버리셨나요?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  findPWButton: {
    marginTop: 20,
    alignItems: 'flex-end',
    marginRight: 20,
  },
  findPWButtonText: {
    fontSize: 14,
    color: '#5A5A5A',
    textDecorationLine: 'underline',
  },
});

export default MyPage;
