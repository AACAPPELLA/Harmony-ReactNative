import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BackButton from "../../components/BackButton";
import AsyncStorage from '@react-native-async-storage/async-storage';


// Axios instance
const api = axios.create({
  baseURL: 'https://aacappella.shop/',
});

// Default messages for when no data is available
const defaultMessages = [
  { id: 1, text: "이번 회의는 000000건에 대해서 00000 논의를 해야합니다", sender: "bot" },
  { id: 2, text: "의견 있으신 분 있나요?", sender: "user" },
  { id: 3, text: "000해서 00000000하시죠.", sender: "bot" },
  { id: 4, text: "저는 000하고 000하는게 나을 것 같아요.", sender: "user" }
];

const fetchChatData = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await api.get('/chats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      setChatData(response.data.data);
    } else {
      console.error('Error', 'Failed to fetch chat data');
    }
  } catch (error) {
    console.error('Error fetching chat data:', error);
  }
};

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const fetchSharedChats = async (setMessages, navigation) => {
  let token = await AsyncStorage.getItem('accessToken');
  if (!token) {
    console.error("No token found, redirecting to login.");
    navigation.navigate('Login');
    return;
  }

  // Print the access token to the console
  console.log("Stored Access Token:", token);

  // Get the current date
  const date = getCurrentDate();

  try {
    const response = await api.get(`/shares/${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      if (response.data.data.length === 0) {
        setMessages(defaultMessages);
      } else {
        const fetchedMessages = response.data.data.flatMap(item =>
          item.chat.map(chatMessage => ({
            id: chatMessage.voiceId,
            text: chatMessage.content,
            sender: chatMessage.speaker === 0 ? "bot" : "user",
          }))
        );
        setMessages(fetchedMessages);
      }
    } else {
      console.error("API request failed with error:", response.data.error);
      setMessages(defaultMessages);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, attempting to refresh token.");
      const newToken = await refreshToken();
      if (newToken) {
        fetchSharedChats(setMessages, navigation); // 새 토큰으로 재시도
      } else {
        navigation.navigate('Login');
      }
    } else {
      console.error("Error fetching shared chats:", error.response ? error.response.data : error.message);
      setMessages(defaultMessages);
    }
  }
};

function SharedChatScreen() {
  const [messages, setMessages] = useState(defaultMessages);
  const navigation = useNavigation();
  const [inputText, setInputText] = useState("");
  const [selectedTab, setSelectedTab] = useState("voiceNotes");

  useEffect(() => {
    const fetchTokenAndChats = async () => {
        const token = await AsyncStorage.getItem('accessToken');
        console.log("Access Token on Mount:", token);
        if (token) {
            await fetchSharedChats(setMessages, navigation);
        } else {
            console.error("No token found, redirecting to login.");
            navigation.navigate('Login');
        }
    };

    fetchTokenAndChats();
}, []);

  const handleSend = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: inputText, sender: "user" }]);
      setInputText("");
      // handleSendVoiceFile(setMessages, messages); // 음성 파일 보내기 (선택 사항)
    }
  };

  const handleVoiceInput = () => {
    // handleSendVoiceFile(setMessages, messages); // 음성 인식 API 트리거 (선택 사항)
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
      <BackButton navigation={navigation}></BackButton>
      <View style={styles.header}>
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
          placeholderTextColor="#ccc"
          selectionColor="#291695"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleVoiceInput} style={styles.microphoneButton}>
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
    paddingTop: 35
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
    marginTop: 5,
    marginBottom: 15,
    width:'90%',
    paddingVertical: 10,
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
    flex: 1, // flex 1로 너비 조정
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center', // 텍스트 가운데 정렬
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
    paddingVertical: 5, // padding 조정
    paddingHorizontal: 10, // padding 조정
    borderRadius: 30,
    backgroundColor: "#f9f9f9",
    height: 55, // 높이 조정
    width: '90%', // 가로 길이 조정
    alignSelf: 'center', // 가운데 정렬
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
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0, // padding 조정
    paddingHorizontal: 10, // padding 조정
    fontSize: 14, // 폰트 크기 줄임
    color: "#291695", // 텍스트 색상 설정
    backgroundColor: "#fff",
    borderRadius: 10,
    height: "100%", // 높이 조정
  },
  microphoneButton: {
    marginRight: 8,
    justifyContent: "center", // 세로 중앙 정렬
  },
  sendButton: {
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: "100%", // 높이 조정
  },
  buttonIcon: {
    width: 25, // 아이콘 크기 원래대로 유지
    height: 25, // 아이콘 크기 원래대로 유지
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
