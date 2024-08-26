import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import BackButton from '../../components/BackButton';
import getSummary from '../../api/ClovaSummary';
import { TouchableOpacity } from 'react-native';
import PushNotification from 'react-native-push-notification';

export default function SafeDetail({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [shortSummary, setShortSummary] = useState('');
  const [filteredSummary, setFilteredSummary] = useState('');
  const [showFilteredSummary, setShowFilteredSummary] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      const text = `안녕하십니까, 승객 여러분. 항공편에 탑승해 주셔서 감사합니다. 기내에서의 편안하고 안전한 여행을 위해 몇 가지 중요한 안내 말씀을 드리겠습니다. 
현재 비행기는 순조롭게 항로를 따라 이동 중이며, 예상 도착 시간은 3시간 후로 예정되어 있습니다. 기내에서는 비행 중 내내 승무원의 지시에 따라주시고, 좌석 벨트 착용 신호등이 켜져 있을 때는 반드시 좌석 벨트를 착용해 주시기 바랍니다. 기내에서 이동할 때는 앞 좌석이나 손잡이를 꼭 잡고 이동해 주시기 바랍니다. 비상시에는 좌석 아래 또는 상단 수납칸에 위치한 구명조끼를 착용하시고, 비상구는 앞뒤로 각각 두 곳씩 위치해 있으니 비상시에 승무원의 안내를 따라 침착하게 대피해 주시기 바랍니다. 
또한, 기내에서는 전자기기 사용이 제한되며, 이륙 및 착륙 시에는 모든 전자기기를 반드시 비행기 모드로 전환해 주시거나 전원을 꺼주시기 바랍니다. 
이번 비행에서는 특별한 기내 서비스로 다양한 음료와 간식이 제공될 예정입니다. 메뉴는 좌석 주머니에 비치된 안내 책자를 참고하시기 바라며, 알레르기가 있으신 승객께서는 미리 승무원에게 알려주시면 대체 메뉴를 제공해 드리겠습니다. 
항공사에서는 모든 승객의 편의를 위해 깨끗하고 위생적인 기내 환경을 유지하고 있으며, 필요시 언제든지 승무원에게 요청해 주시면 최대한 빠르게 도와드리겠습니다. 이번 항공편을 이용해 주셔서 다시 한번 감사드리며, 여러분의 안전하고 편안한 여행을 기원합니다. 감사합니다.`;

      const fullSummary = await getSummary(text);
      const shortSummary = await getSummary(fullSummary);

      if (fullSummary) {
        setSummary(fullSummary);
        setShortSummary(shortSummary);
        filterDangerousLines(fullSummary);
      } else {
        setSummary('요약 실패');
      }
      setLoading(false);
    };

    const filterDangerousLines = (text) => {
      const keywords = ['비상', '위험', '구명조끼', '대피', '비상구'];
      const lines = text.split('\n');
      const filtered = lines.filter(line => keywords.some(keyword => line.includes(keyword)));
      setFilteredSummary(filtered.join('\n'));
    };

    fetchSummary();
  }, []);

  const toggleSummary = () => {
    setShowFilteredSummary(!showFilteredSummary);

    if (!showFilteredSummary) {
      console.log('Sending notification:', filteredSummary);
      PushNotification.localNotification({
        channelId: "1234", // App.js에서 설정한 채널 ID 동일
        title: '간략히 보기 내용', 
        message: filteredSummary,
        playSound: true, // 알림 소리 설정
        soundName: 'default', // 기본 알림 소리
        importance: 'high', // 중요도 설정
        vibrate: true, // 진동 설정
      });
    }
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <View style={styles.titleContainer}>
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
        {loading ? (
          <ActivityIndicator size="large" color="#291695" />
        ) : (
          summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>요약 결과</Text>
              <Text style={styles.sectionContent}>{summary}</Text>
              {showFilteredSummary && (
                <Text style={styles.filteredSummary}>{filteredSummary}</Text>
              )}
              <TouchableOpacity onPress={toggleSummary}>
                <Text style={styles.toggleText}>
                  {showFilteredSummary ? '중요한 내용 숨기기' : '중요한 내용 보기'}
                </Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#291695', marginTop: 10 }]}
        onPress={() => navigation.navigate('Screen1')}
      >
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
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e2e2e',
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
  filteredSummary: {
    fontSize: 14,
    color: '#ff0000', // 강조하기 위해 다른 색상으로 변경 가능
    marginTop: 10,
  },
  toggleText: {
    color: '#291695',
    fontWeight: 'bold',
    marginTop: 10,
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
