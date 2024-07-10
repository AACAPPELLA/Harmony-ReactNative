import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function Screen2({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/goback.png')} style={styles.backButtonImage} />
        </TouchableOpacity>
        <Text style={styles.title}>긴급 상황 판단 내용</Text>
      </View>
      <View style={styles.header}>
        <View style={styles.headerBox}>
          <View style={styles.headerContent}>
            <Image source={require('../../assets/safe.png')} style={styles.icon} />
            <View>
              <Text style={styles.headerText}>안전한 상황일 것으로 예측되지만</Text>
              <Text style={styles.headerSubText}>긴급 상황인지 스스로 한 번 더 판단해주세요</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>주변 상황</Text>
          <Text style={styles.sectionContent}>
            기내 안내방송 송출 중{'\n'}
            순조롭게 비행 중이며, 모든 시스템이 정상적으로 작동{'\n'}
            안전하고 편안한 여행을 위해 다음 사항을 안내
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>세부 내용</Text>
          <Text style={styles.sectionContent}>
            좌석 벨트 착용{'\n'}
            좌석에 앉아 계실 때는 항상 좌석벨트 착용 권장{'\n'}
            기내 서비스{'\n'}
            곧 기내 서비스를 시작할 예정{'\n'}
            음식과 음료 서비스 제공 예정{'\n'}
            안전 수칙 및 명령 요령 안내{'\n'}
            비상 탈출구 위치와 사용 방법
          </Text>
        </View> */}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen1')}>
        <Text style={styles.buttonText}>종료하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  backButtonImage: {
    width: 24,
    height: 24,
    marginRight:60,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e2e2e',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  headerBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 35,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#291695',
    marginTop: 10,
  },
  headerSubText: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
    marginBottom: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e2e2e',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 14,
    color: '#7d7d7d',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#291695',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
