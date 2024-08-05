import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import BackButton from "../../components/BackButton";

function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, I’m fine, how can I help you?", sender: "bot" },
    { id: 2, text: "What is the best programming language?", sender: "user" },
    { id: 3, text: "There are many programming languages in the market that are used in designing and building websites, various applications and other tasks. All these languages are popular in their place and in the way they are used, and many programmers learn and use them.", sender: "bot" },
    { id: 4, text: "So explain to me more", sender: "user" }
  ]);

  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: inputText, sender: "user" }]);
      setInputText("");
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
