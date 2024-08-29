import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import BackButton from '../../components/BackButton';
import getSummary from '../../api/ClovaSummary'; // 요약 API 모듈
import { handleSendVoiceFile } from '../chat/ChatScreen';

export default function Screen2({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [recognizedText, setRecognizedText] = useState(''); // 음성 인식 결과
  const [summary, setSummary] = useState(''); // 요약 결과

  // useCallback을 사용하여 handleSummarize가 매 렌더링마다 새로 생성되지 않도록 함
  const handleSummarize = useCallback(async () => {
    setLoading(true);

    try {
      // 음성 파일 전송 및 텍스트 변환 호출
      const messages = [];
      const setMessages = (newMessages) => { messages.push(...newMessages); };

      await handleSendVoiceFile(setMessages, messages);

      // 변환된 텍스트가 존재할 경우
      const text = messages[messages.length - 1]?.text || '';

      if (text) {
        setRecognizedText(text); // 변환된 텍스트 저장

        // Clova 요약 API 호출
        const result = await getSummary(text);
        if (result) {
          setSummary(result); // 요약 결과 저장
        } else {
          setSummary('요약 실패');
        }
      } else {
        setRecognizedText('변환된 텍스트가 없습니다.');
        setSummary('');
      }
    } catch (error) {
      console.error('Error during summarization:', error);
      setRecognizedText('오류 발생');
      setSummary('요약 실패');
    } finally {
      setLoading(false);
    }
  }, []); // 빈 의존성 배열로 이 함수를 컴포넌트가 마운트될 때만 생성됨

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
          <>
            {/* 음성 인식 결과 표시 */}
            {recognizedText ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>음성 인식 결과</Text>
                <Text style={styles.sectionContent}>{recognizedText}</Text>
              </View>
            ) : null}

            {/* 요약 결과 표시 */}
            {summary ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>주요 요약 결과</Text>
                <Text style={styles.sectionContent}>{summary}</Text>
              </View>
            ) : null}
          </>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleSummarize}>
        <Text style={styles.buttonText}>요약하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#d9534f', marginTop: 10 }]}
        onPress={() => navigation.navigate('HomeScreen')}
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
    paddingTop: 60
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
