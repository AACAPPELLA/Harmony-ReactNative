import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isRiskModeEnabled, setIsRiskModeEnabled] = React.useState(false);

  const toggleRiskMode = () => setIsRiskModeEnabled(previousState => !previousState);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/harmony-logo.png')} style={styles.logo} />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Emergency')}>
          <Image source={require('../assets/emergency-icon.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>긴급 상황 판단</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
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
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require('../assets/settings-icon.png')} style={styles.footerIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 23,
    marginVertical: 20,
    marginRight: 180,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 150,
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '45%',
  },
  buttonIcon: {
    width: 60,
    height: 60,
    marginTop: 7,
    marginBottom: 13,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginVertical: 20,
    width: '100%',
  },
  optionContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionDescription: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
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
    width: 30,
    height: 30,
  },
});

export default HomeScreen;
