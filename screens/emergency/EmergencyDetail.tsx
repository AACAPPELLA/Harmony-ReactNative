import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import RNFS from 'react-native-fs';
import axios from 'axios';
import BackButton from '../../components/BackButton';

// Clova Speech API handler for EmergencyScreen
async function handleEmergencyVoiceRecognition(setMessages, messages) {
  const filePath = `${RNFS.DocumentDirectoryPath}/voice.wav`; // Update with correct file path

  try {
    const formData = new FormData();
    formData.append('media', {
      uri: 'file://' + filePath,
      type: 'audio/wav',
      name: 'voice.wav',
    });
    formData.append('params', JSON.stringify({
      language: "ko-KR",
      completion: "sync",
      format: "JSON"
    }));

    const response = await axios.post('https://clovaspeech-gw.ncloud.com/external/v1/8575/acc8615eab5bb8f854efd2f4b8eaef29ffd35002a3aab6cf1ad163b12d90ee02/recognizer/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CLOVASPEECH-API-KEY': '8a0ab9b49bb54bfe98e7be0c6316a78b',
      }
    });

    setMessages([...messages, { id: messages.length + 1, text: response.data.text, sender: "bot" }]);
  } catch (error) {
    console.error("Error with Clova Speech API:", error);
    setMessages([...messages, { id: messages.length + 1, text: "Error processing the emergency voice file.", sender: "bot" }]);
  }
}

const EmergencyScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  const handleRetryListening = () => {
    handleEmergencyVoiceRecognition(setMessages, messages);
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Text style={styles.title}>긴급 상황 판단 내용</Text>
      <View style={styles.header}>
        <View style={styles.headerBox}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>긴급 상황 판단 중</Text>
            <TouchableOpacity style={styles.endButton}>
              <Text style={styles.endButtonText}>듣기 종료</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubText1}>주변 상황과 안내 방송을 들으며</Text>
          <View style={styles.subTextRow}>
            <Text style={styles.headerSubText2}>텍스트로 변환</Text>
            <Text style={styles.headerSubText3}>하는 중이에요</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View key={message.id} style={styles.messageBubble}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.retryButton} onPress={handleRetryListening}>
        <Text style={styles.retryButtonText}>다시 듣기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    paddingTop: 60
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#2e2e2e',
    alignSelf: 'center',
  },
  header: {
    marginBottom: 20,
    fontWeight: 'bold',
  },
  headerBox: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 30,
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e2e2e',
    marginLeft: 10,
  },
  headerSubText1: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
    marginLeft: 10,
  },
  subTextRow: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 10,
  },
  headerSubText2: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  headerSubText3: {
    fontSize: 14,
    color: '#000',
    marginLeft: 5,
  },
  endButton: {
    backgroundColor: '#C80136',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  endButtonText: {
    color: '#fff',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 70,
  },
  messageBubble: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  retryButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#C80136',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EmergencyScreen;


