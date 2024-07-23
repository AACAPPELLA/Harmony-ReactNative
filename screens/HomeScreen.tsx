import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isRiskModeEnabled, setIsRiskModeEnabled] = React.useState(false);

  const toggleRiskMode = () => setIsRiskModeEnabled(previousState => !previousState);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </TouchableOpacity>

      <Image source={require('../assets/harmony-logo.png')} style={styles.logo} />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EmergencyChecking')}>
          <Image source={require('../assets/emergency-icon.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>긴급 상황 판단</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListeningChat')}>
          <Image source={require('../assets/chat-icon.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>대화 시작하기</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>기능 선택</Text>
      
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>공유 대화 시작</Text>
        <Text style={styles.optionDescription}>회의 및 수업을 시작해요! 언제 어디서나 참여하고 실시간 내용을 확인할 수 있어요!</Text>
      </View>
      
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>나의 소리</Text>
        <Text style={styles.optionDescription}>다시 설명할 필요 없이 필요할 때 언제 어디서나 나의 필담을 공유할 수 있어요!</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require('../assets/home-icon.png')} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require('../assets/calendar-icon.png')} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('MyPage')}>
          <Image source={require('../assets/settings-icon.png')} style={styles.footerIcon}/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 28,
    marginTop: 70, 
    marginBottom: 20,
    marginRight: 130
    
  },
  logoutButton: {
    position: 'absolute',
    top: 80,
    right: 30,
    backgroundColor: '#291695', 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 22,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '45%',
  },
  buttonIcon: {
    width: 65,
    height: 65,
    marginTop: 22,
    marginBottom: 13,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 25,
    marginVertical: 20,
    width: '100%',
  },
  optionContainer: {
    backgroundColor: '#f8f8f8',
    padding: 23,
    borderRadius: 10,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '95%',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionDescription: {
    marginTop: 15,
    fontSize: 17,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
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

export default HomeScreen;
