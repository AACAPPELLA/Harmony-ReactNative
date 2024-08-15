import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, PermissionsAndroid, Platform, Alert } from "react-native";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import BackButton from "../../components/BackButton";
import { DocumentDirectoryPath } from 'react-native-fs';

// 권한 요청 함수
async function requestPermissions() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      const permissionsGranted =
        granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED;

      if (!permissionsGranted) {
        Alert.alert(
          "권한 필요",
          "이 기능을 사용하려면 오디오 녹음 및 저장소 권한이 필요합니다.",
          [{ text: "확인" }]
        );
        return false;
      }
      return true;
    } catch (err) {
      console.warn("권한 요청 중 오류 발생: ", err);
      return false;
    }
  }
  return true;
}

// ChatScreen 컴포넌트
function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요, 무엇을 도와드릴까요?", sender: "bot" },
    { id: 2, text: "최고의 프로그래밍 언어는 무엇인가요?", sender: "user" },
    { id: 3, text: "시장에는 웹사이트, 애플리케이션 등을 설계하고 구축하는 데 사용되는 다양한 프로그래밍 언어가 있습니다. 이 모든 언어는 각자 쓰임새와 방식에 따라 인기가 있으며, 많은 프로그래머가 이를 배우고 사용하고 있습니다.", sender: "bot" },
    { id: 4, text: "좀 더 설명해 주세요.", sender: "user" }
  ]);

  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const handleSend = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: inputText, sender: "user" }]);
      setInputText("");
    }
  };

  const handleRecord = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    if (isRecording) {
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      console.log(result); // 녹음된 파일 경로 출력
    } else {
      const path = `${DocumentDirectoryPath}/hello.m4a`; // 안전한 파일 경로 사용
      await audioRecorderPlayer.startRecorder(path);
      setIsRecording(true);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <ScrollView style={styles.chatContainer}>
        {messages.map((message) => (
          <View key={message.id} style={styles.messageContainer}>
            {message.sender === "bot" && (
              <View style={[styles.profileCircle, styles.botProfile]} />
            )}
            <View style={[styles.messageBubble, message.sender === "user" ? styles.userBubble : styles.botBubble]}>
              <Text style={[styles.messageText, message.sender === "user" ? styles.userText : styles.botText]}>{message.text}</Text>
            </View>
            {message.sender === "user" && (
              <View style={[styles.profileCircle, styles.userProfile]} />
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputSection}>
        <Text style={styles.confirmationText}>사용자님의 이야기를 작성해주세요</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="이곳을 눌러 답변을 입력해주세요"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Image source={require('../../assets/send.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleRecord} style={styles.recordButton}>
          <Text style={styles.recordButtonText}>{isRecording ? "녹음 중지" : "녹음 시작"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  // ... 기존 스타일들 ...
  recordButton: {
    backgroundColor: "#FF6F61",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  recordButtonText: {
    color: "white",
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    paddingLeft: 20,
    paddingRight: 20
  },
  chatContainer: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  profileCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  botProfile: {
    backgroundColor: "#FEEAE3",
  },
  userProfile: {
    backgroundColor: "#FEEAE3",
    marginLeft: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  userBubble: {
    backgroundColor: "#291695",
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  botBubble: {
    backgroundColor: "#EEEEEE",
    alignSelf: "flex-start",
    marginRight: "auto",
  },
  messageText: {
    color: "#fff",
  },
  userText: {
    color: "#fff",
  },
  botText: {
    color: "#000",
  },
  inputSection: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonIcon: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginBottom: 5,
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderColor: "#ccc",
    marginRight: 10,
    fontSize: 16,
    color: "#291695",
  },
  sendButton: {
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontSize: 20,
  },
  confirmationText: {
    fontSize: 20,
    color: '#291695',
    marginBottom: 15,
    textAlign: "center",
    fontWeight: '600'
  },
});

export default ChatScreen;
