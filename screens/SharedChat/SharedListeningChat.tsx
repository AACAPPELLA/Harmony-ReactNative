import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BackButton from '../../components/BackButton';

const ListeningChat = ({ navigation }) => {
  const moveChat = () => {
    // ChatScreen으로 넘어가면서 triggerApiCall을 true로 전달
    navigation.navigate('SharedChatScreen', { triggerApiCall: true });
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation}></BackButton>
      <Image source={require('../../assets/blue-ear.png')} style={styles.icon} />
      <Text style={styles.text}>대화를 듣고 있어요</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10, 
    left: 10, 
    padding: 5,
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 40,
    marginTop: 220
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
    marginBottom: 180,
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
  confirmationText: {
    fontSize: 20,
    color: '#291695',
    marginBottom: 15,
  },
  blueButton: {
    marginTop: 45,
    backgroundColor: '#291695',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    width: '100%',
  },
  blueButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default ListeningChat;
