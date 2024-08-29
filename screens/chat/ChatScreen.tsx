import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import RNFS from 'react-native-fs'; // react-native-fs import
import axios from 'axios'; // axios import
import BackButton from "../../components/BackButton";

// handleSendVoiceFile 함수를 외부에서도 사용할 수 있도록 export
export async function handleSendVoiceFile(setMessages) {
  const filePath = `${RNFS.DocumentDirectoryPath}/daily2.wav`; // 로컬 음성 파일 경로를 입력하세요
  console.log("Voice file path:", filePath);

  // 파일이 존재하는지 확인
  const fileExists = await RNFS.exists(filePath);
  if (!fileExists) {
    console.error("File does not exist at path:", filePath);
    setMessages(prevMessages => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: "Voice file not found.", sender: "bot" }
    ]);
    return;
  }

  try {
    const formData = new FormData();
    formData.append('media', {
      uri: 'file://' + filePath,
      type: 'audio/wav',
      name: 'daily2.wav',
    });
    formData.append('params', JSON.stringify({
      language: "ko-KR",
      completion: "sync",
      format: "JSON"
    }));

    const response = await axios.post(
      'https://clovaspeech-gw.ncloud.com/external/v1/8575/acc8615eab5bb8f854efd2f4b8eaef29ffd35002a3aab6cf1ad163b12d90ee02/recognizer/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CLOVASPEECH-API-KEY': '8a0ab9b49bb54bfe98e7be0c6316a78b', // CLOVA Speech API secret key
        }
      }
    );

    // API 응답에서 텍스트를 확인하고, 메시지에 추가
    if (response.data && response.data.text) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: response.data.text, sender: "bot" }
      ]);
    } else {
      console.error("Unexpected response structure:", response.data);
      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: "Failed to retrieve text from voice file.", sender: "bot" }
      ]);
    }
  } catch (error) {
    console.error("Error sending voice file to CLOVA API:", error.message);
    if (error.response) {
      // 서버 응답이 있는 경우
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: `Error ${error.response.status}: ${error.response.data.message}`, sender: "bot" }
      ]);
    } else if (error.request) {
      // 응답을 받지 못한 경우
      console.error("No response received:", error.request);
      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: "No response from the server.", sender: "bot" }
      ]);
    } else {
      // 기타 오류
      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: "Error processing the voice file.", sender: "bot" }
      ]);
    }
  }
}

function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, I’m fine, how can I help you?", sender: "bot" },
    { id: 2, text: "What is the best programming language?", sender: "user" },
    { id: 3, text: "There are many programming languages in the market that are used in designing and building websites, various applications and other tasks. All these languages are popular in their place and in the way they are used, and many programmers learn and use them.", sender: "bot" },
    { id: 4, text: "So explain to me more", sender: "user" }
  ]);

  const [inputText, setInputText] = useState("");

  // 페이지에 들어가자마자 음성 파일 전송
  useEffect(() => {
    handleSendVoiceFile(setMessages);
  }, []);

  const handleSend = () => {
    if (inputText.trim() !== "") {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: inputText, sender: "user" }
      ]);
      setInputText("");
      handleSendVoiceFile(setMessages); // 음성 파일 보내기 함수 호출
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
    </View>
  );
}
const styles = StyleSheet.create({
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
