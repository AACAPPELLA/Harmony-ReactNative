import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

function SharedChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, I’m fine, how can I help you?", sender: "bot" },
    { id: 2, text: "What is the best programming language?", sender: "user" },
    { id: 3, text: "There are many programming languages in the market that are used in designing and building websites, various applications and other tasks. All these languages are popular in their place and in the way they are used, and many programmers learn and use them.", sender: "bot" },
    { id: 4, text: "So explain to me more", sender: "user" }
  ]);

  const navigation = useNavigation();
  const [inputText, setInputText] = useState("");
  const [selectedTab, setSelectedTab] = useState("voiceNotes");

  const handleSend = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: inputText, sender: "user" }]);
      setInputText("");
    }
  };

  const renderMessages = () => {
    return messages.map((message) => (
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
    ));
  };

  const renderContent = () => {
    if (selectedTab === "voiceNotes") {
      return (
        <ScrollView style={styles.chatContainer}>
          {renderMessages()}
        </ScrollView>
      );
    } else if (selectedTab === "summary") {
      return (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>회의 종료 시에만 사용할 수 있어요</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>공유 대화</Text>
      </View>
      <View style={styles.statusBox}>
        <View style={styles.statusTextContainer}>
          <Text style={styles.statusMainText}>계속 내용 듣는 중</Text>
          <Text style={styles.statusSubText}>계속해서 내용을 들으며 {"\n"}텍스트로 변환하는 중이에요</Text>
        </View>
        <TouchableOpacity style={styles.endMeetingButton} onPress={() => navigation.navigate('SetTitle')}>
          <Text style={styles.endMeetingButtonText}>회의 종료</Text>
        </TouchableOpacity>
        <Image source={require('../../assets/shLoading.png')} style={styles.statusImage} />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "voiceNotes" && styles.selectedTabButton]}
          onPress={() => setSelectedTab("voiceNotes")}
        >
          <Text style={[styles.tabButtonText, selectedTab === "voiceNotes" && styles.selectedTabButtonText]}>음성 내용 기록</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "summary" && styles.selectedTabButton]}
          onPress={() => setSelectedTab("summary")}
        >
          <Text style={[styles.tabButtonText, selectedTab === "summary" && styles.selectedTabButtonText]}>요약</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.textInput}
          placeholder="텍스트 및 음성으로 내용을 추가할 수 있어요"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.microphoneButton}>
          <Image source={require('../../assets/shSound.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Image source={require('../../assets/shSend.png')} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 18,
    color: "#291695",
  },
  headerTitle: {
    fontSize: 20,
    color: "#291695",
    fontWeight: "bold",
  },
  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    margin: 10,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusMainText: {
    fontSize: 18,
    color: "#291695",
    fontWeight: "bold",
  },
  statusSubText: {
    fontSize: 14,
    color: "#291695",
    marginTop: 5,
  },
  endMeetingButton: {
    backgroundColor: "#291695",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  endMeetingButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  statusImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tabButtonText: {
    fontSize: 16,
    color: "#ccc",
  },
  selectedTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#291695",
  },
  selectedTabButtonText: {
    color: "#291695",
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderColor: "#ccc",
    fontSize: 16,
    color: "#291695",
  },
  microphoneButton: {
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
  summaryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryText: {
    fontSize: 18,
    color: "#291695",
  },
});

export default SharedChatScreen;
