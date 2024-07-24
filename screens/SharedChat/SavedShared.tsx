import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SavedShared = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('record');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{"<"}</Text>
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
                <Text style={[styles.messageText, styles.botText]}>상대방의 메시지 1</Text>
              </View>
              <View style={[styles.profileCircle, styles.userProfile]} />
            </View>
            <View style={styles.messageContainer}>
              <View style={[styles.messageBubble, styles.botBubble]}>
                <Text style={[styles.messageText, styles.botText]}>상대방의 메시지 2</Text>
              </View>
              <View style={[styles.profileCircle, styles.userProfile]} />
            </View>
            <View style={styles.messageContainer}>
              <View style={[styles.messageBubble, styles.botBubble]}>
                <Text style={[styles.messageText, styles.botText]}>상대방의 메시지 3</Text>
              </View>
              <View style={[styles.profileCircle, styles.userProfile]} />
            </View>
            <View style={styles.messageContainer}>
              <View style={[styles.messageBubble, styles.botBubble]}>
                <Text style={[styles.messageText, styles.botText]}>상대방의 메시지 4</Text>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: "#291695",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#291695",
    flex: 1,
    textAlign: "center",
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
