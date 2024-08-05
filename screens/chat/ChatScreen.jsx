import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Platform } from "react-native";
import AudioRecord from 'react-native-audio';
import BackButton from "../../components/BackButton";
import { request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

const CLOVA_API_KEY = 'YOUR_API_KEY'; // 실제 API 키로 변경
const CLOVA_API_SECRET = 'YOUR_API_SECRET'; // 실제 API 비밀키로 변경

function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요, 무엇을 도와드릴까요?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const [recording, setRecording] = useState(false);
  const [mikePermission, setMikePermission] = useState(false);

  useEffect(() => {
    checkRecordPermission(); // 권한 체크 호출
  }, []);

  const handleSend = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: inputText, sender: "user" }]);
      setInputText("");
    }
  };

  const startRecording = async () => {
    if (!mikePermission) {
      await requestMicrophonePermission(); // 권한 요청 후 상태 업데이트
    }

    if (mikePermission) {
      console.log("Recording started");
      setRecording(true);
      AudioRecord.init({
        sampleRate: 16000,
        channels: 1,
        bitsPerSample: 16,
        wavFile: 'test.wav'
      });
      AudioRecord.start();
    } else {
      console.log("Microphone permission not granted");
    }
  };

  const stopRecording = async () => {
    if (recording) {
      console.log("Recording stopped");
      let audioFile;
      try {
        audioFile = await AudioRecord.stop();
      } catch (error) {
        console.error("Error stopping recording:", error);
      }
      setRecording(false);
      if (audioFile) {
        handleSendAudio(audioFile);
      }
    }
  };

  const handleSendAudio = async (audioFile) => {
    try {
      const formData = new FormData();
      formData.append('media', {
        uri: `file://${audioFile}`,
        type: 'audio/wav',
        name: 'audio.wav'
      });

      const response = await fetch('https://clovaspeech-gw.ncloud.com/external/v1/8575/acc8615eab5bb8f854efd2f4b8eaef29ffd35002a3aab6cf1ad163b12d90ee02/recognizer/object-storage', {
        method: 'POST',
        headers: {
          'X-CLOVASpeech-API-Key': CLOVA_API_KEY,
          'X-CLOVASpeech-API-Secret': CLOVA_API_SECRET,
        },
        body: formData
      });

      const result = await response.json();
      const recognizedText = result.text || "인식 실패"; // 인식 실패 시 기본값 설정
      setMessages([...messages, { id: messages.length + 1, text: recognizedText, sender: "user" }]);
    } catch (error) {
      console.error('Error recognizing speech:', error);
    }
  };

  const checkRecordPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios' 
          ? PERMISSIONS.IOS.MICROPHONE 
          : PERMISSIONS.ANDROID.RECORD_AUDIO
      );
      
      if (result === RESULTS.GRANTED) {
        console.log("마이크 권한이 허용되었습니다.");
        setMikePermission(true);
      } else if (result === RESULTS.DENIED) {
        console.log("마이크 권한이 거부되었습니다. 권한을 허용해 주세요.");
        Alert.alert(
          "권한 필요",
          "앱에서 음성을 녹음하려면 마이크 접근 권한이 필요합니다.",
          [{ text: "확인", onPress: () => requestMicrophonePermission() }]
        );
      } else if (result === RESULTS.BLOCKED) {
        console.log("마이크 권한이 차단되었습니다. 설정에서 권한을 허용해 주세요.");
        Alert.alert(
          "권한 필요",
          "앱에서 음성을 녹음하려면 마이크 접근 권한이 필요합니다. 설정에서 권한을 허용해 주세요.",
          [{ text: "설정으로 가기", onPress: () => openSettings() }]
        );
      }
    } catch (error) {
      console.error("권한 요청 중 오류 발생:", error);
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios' 
          ? PERMISSIONS.IOS.MICROPHONE 
          : PERMISSIONS.ANDROID.RECORD_AUDIO
      );

      if (result === RESULTS.GRANTED) {
        console.log("마이크 권한이 허용되었습니다.");
        setMikePermission(true);
      } else if (result === RESULTS.DENIED) {
        console.log("마이크 권한이 거부되었습니다. 권한을 허용해 주세요.");
        Alert.alert(
          "권한 필요",
          "앱에서 음성을 녹음하려면 마이크 접근 권한이 필요합니다.",
          [{ text: "확인", onPress: () => requestMicrophonePermission() }]
        );
      } else if (result === RESULTS.BLOCKED) {
        console.log("마이크 권한이 차단되었습니다. 설정에서 권한을 허용해 주세요.");
        Alert.alert(
          "권한 필요",
          "앱에서 음성을 녹음하려면 마이크 접근 권한이 필요합니다. 설정에서 권한을 허용해 주세요.",
          [{ text: "설정으로 가기", onPress: () => openSettings() }]
        );
      }
    } catch (error) {
      console.error("권한 요청 중 오류 발생:", error);
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
      </View>
      <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.recordButton}>
        <Text style={styles.recordButtonText}>{recording ? "녹음 중지" : "녹음 시작"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    marginTop: 90,
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
    fontWeight: '600',
  },
  recordButton: {
    padding: 15,
    backgroundColor: "#291695",
    borderRadius: 20,
    alignItems: "center",
    margin: 20,
  },
  recordButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ChatScreen;
