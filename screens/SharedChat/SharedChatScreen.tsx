import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

function SharedChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "이번 회의는 000000건에 대해서 00000 논의를 해야합니다", sender: "bot" },
    { id: 2, text: "의견 있으신 분 있나요?", sender: "user" },
    { id: 3, text: "000해서 00000000하시죠.", sender: "bot" },
    { id: 4, text: "저는 000하고 000하는게 나을 것 같아요.", sender: "user" }
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

  const handleBackPress = () => {
    navigation.goBack();
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
          <Text style={styles.summaryText}>회의 종료 시에만 사용할 수 있어요.</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image source={require('../../assets/mpBack.png')} style={styles.backIcon} resizeMode='contain'/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>공유 대화</Text>
      </View>
      <View style={styles.statusBox}>
        <View style={styles.statusTextContainer}>
          <Text style={styles.statusMainText}>계속 내용 듣는 중</Text>
          <Text style={styles.statusSubText}>계속해서 내용을 들으며 {"\n"}텍스트로 변환하는 중이에요</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.endMeetingButton} onPress={() => navigation.navigate('SetTitle')}>
            <Text style={styles.endMeetingButtonText}>회의 종료</Text>
          </TouchableOpacity>
          <Image source={require('../../assets/shLoading.png')} style={styles.statusImage} />
        </View>
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
          placeholder="텍스트 및 음성으로 내용을 추가할 수 있어요."
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  backIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#f9f9f9",
    borderRadius: 25,
    margin:10,
    width:'90%',
    paddingVertical:25,
    alignSelf: 'center',
    borderColor: "#EFEFEF", 
    borderWidth: 1, 
    shadowColor: "#000", 
    shadowOffset: {
      width: 2, 
      height: 2, 
    },
    shadowOpacity: 0.2, 
    shadowRadius: 3.84, 
    elevation: 5,
  },
  statusTextContainer: {
    flex: 1,
    flexDirection: 'column', // 세로 배치
    alignItems: 'flex-start', // 왼쪽 정렬
  },
  rightContainer: {
    flexDirection: 'column', // 세로 배치
    alignItems: 'center', // 중앙 정렬
  },
  statusMainText: {
    fontSize: 18,
    color: 'black',
    fontWeight: "bold",
  },
  statusSubText: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  endMeetingButton: {
    backgroundColor: "#291695",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  endMeetingButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusImage: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop: 15,
    resizeMode: 'contain',
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
    marginHorizontal: 30,
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
    maxWidth: "75%",
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
