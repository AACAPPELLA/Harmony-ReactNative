import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BackButton from '../../components/BackButton';

const SharedListeningChat = ({ navigation }) => {
  const moveChat = () => {
    navigation.navigate('SharedChatScreen');
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation}></BackButton>
      <Image source={require('../../assets/blue-ear.png')} style={styles.icon} />
      <Text style={styles.text}>내용을 듣고 있어요</Text>
      <View style={styles.indicatorContainer}>
        <View style={styles.indicatorInactive} />
        <View style={styles.indicatorInactive} />
        <View style={styles.indicatorActive} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.blueButton} onPress={moveChat}>
          <Text style={styles.blueButtonText}>실시간 내용 확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // 요소를 위, 아래로 분산
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 40, // 안전한 여백 추가
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 40,
    marginTop: 200,
  },
  text: {
    fontSize: 27,
    color: '#291695',
    marginBottom: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40, // 간격 조정
  },
  indicatorInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  indicatorActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#291695',
    marginHorizontal: 4,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  blueButton: {
    backgroundColor: '#291695',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    width: '100%', // 버튼이 전체 너비를 차지하도록
  },
  blueButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SharedListeningChat;
