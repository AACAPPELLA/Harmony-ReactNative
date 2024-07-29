import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SavedShared = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('record');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };
  const handleBackPress = () => {
    navigation.goBack();
  };

  const summaryData = {
    topics: [
      "하모니 3주차 회의의 시작을 알림",
      "안건은 하모니 서비스에 대한 사용자 경험 분석 및 피드백",
      "사용자 참여를 효과적으로 이끌어내기 위한 추가적 방안 검토",
    ],
    details: [
      "실제 청각 장애를 가진 지인을 대상으로 사용자 경험 분석 내용 발표",
      "2024년 6월부터 ..."
    ],
    keywords: [
      "사용자 경험",
      "하모니 서비스",
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image source={require('../../assets/mpBack.png')} style={styles.backIcon} resizeMode='contain'/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>저장된 대화</Text>
      </View>
      <View style={styles.savedInfoContainer}>
        <Text style={styles.savedTitle}>HARMONY 3차 정기 회의</Text>
        <Text style={styles.savedDate}>2024. 06. 22 15:30</Text>
        <View style={styles.savedDurationContainer}>
          <Text style={styles.savedDuration}>약 53분</Text>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'record' && styles.selectedTabButton]}
          onPress={() => handleTabPress('record')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'record' && styles.selectedTabButtonText]}>
            음성 내용 기록
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'summary' && styles.selectedTabButton]}
          onPress={() => handleTabPress('summary')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'summary' && styles.selectedTabButtonText]}>
            요약
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentContainer}>
        {selectedTab === 'record' ? (
          <View style={styles.chatContainer}>
            {/* 여기에 음성 내용 기록을 위한 임시 데이터 */}
            <View style={styles.messageContainer}>
              <View style={[styles.messageBubble, styles.botBubble]}>
                <Text style={[styles.messageText, styles.botText]}>안녕하세요. 하모니 3주차 회의 시작하겠습니다.</Text>
              </View>
              <View style={[styles.profileCircle, styles.userProfile]} />
            </View>
            <View style={styles.messageContainer}>
              <View style={[styles.messageBubble, styles.botBubble]}>
                <Text style={[styles.messageText, styles.botText]}>지난 회의에 이어 오늘 회의 안건은 하모니 서비스에 대한 사용자 경험 분석입니다. 각자 준비해오신 자료를 공유하며 피드백하는 시간을 가지도록 하겠습니다. </Text>
              </View>
              <View style={[styles.profileCircle, styles.userProfile]} />
            </View>
            <View style={styles.messageContainer}>
              <View style={[styles.messageBubble, styles.botBubble]}>
                <Text style={[styles.messageText, styles.botText]}>네. 혹시 추가적으로 사용자의 참여를 보다 효과적으로 이끌어내기 위해서 필요한 방안에 대한 검토가 필요할 것 같습니다. </Text>
              </View>
              <View style={[styles.profileCircle, styles.userProfile]} />
            </View>
            <View style={styles.messageContainer}>
              <View style={[styles.messageBubble, styles.botBubble]}>
                <Text style={[styles.messageText, styles.botText]}>네. 그럼 실제 청각장애를 가진 제 지인을 대상으로 준비해온 사용자 경험 분석 내용 발표 시작하도록 하겠습니다. 사용자는 2024년 6월부터 ...</Text>
              </View>
              <View style={[styles.profileCircle, styles.userProfile]} />
            </View>
            <View style={styles.messageContainer}>
              <View style={[styles.profileCircle, styles.botProfile]} />
              <View style={[styles.messageBubble, styles.userBubble]}>
                <Text style={[styles.messageText, styles.userText]}>내 메시지</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.summaryContainer}>
            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>주제</Text>
              {summaryData.topics.map((topic, index) => (
                <Text key={index} style={styles.summaryItem}>
                  • {topic}
                </Text>
              ))}
            </View>
            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>세부내용</Text>
              {summaryData.details.map((detail, index) => (
                <Text key={index} style={styles.summaryItem}>
                  • {detail}
                </Text>
              ))}
            </View>
            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>주요 키워드</Text>
              {summaryData.keywords.map((keyword, index) => (
                <Text key={index} style={styles.summaryItem}>
                  • {keyword}
                </Text>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
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
  savedInfoContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  savedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#291695",
    marginBottom: 5,
  },
  savedDate: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  savedDurationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  savedDuration: {
    fontSize: 16,
    color: "#000",
  },
  deleteButton: {
    backgroundColor: "#291695",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  tabButton: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  selectedTabButton: {
    borderBottomColor: "#291695",
  },
  tabButtonText: {
    fontSize: 16,
    color: "#291695",
  },
  selectedTabButtonText: {
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
  },
  chatContainer: {
    padding: 10,
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
    borderRadius: 20,
    maxWidth: "80%",
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
  summaryContainer: {
    padding: 20,
  },
  summarySection: {
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#291695",
    marginBottom: 10,
  },
  summaryItem: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
  },
});

export default SavedShared
