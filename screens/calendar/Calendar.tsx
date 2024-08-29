import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axios';  // axios를 통해 API 호출

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [fetchedConversations, setFetchedConversations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 토큰을 AsyncStorage에서 가져오기
  const getToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      return accessToken;
    } catch (error) {
      console.error('토큰 가져오기 오류:', error);
      return null;
    }
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  useEffect(() => {
    if (selectedDate) {
      fetchConversationsForDate(selectedDate);
    }
  }, [selectedDate]);

  // API 호출하여 해당 날짜의 대화 가져오기
  const fetchConversationsForDate = async (date) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = await getToken();
      if (!accessToken) {
        Alert.alert('토큰 없음', '로그인이 필요합니다.');
        navigation.navigate('Login');
        return;
      }

      console.log(`API 요청 시작: ${date}, accessToken: ${accessToken}`);

      const response = await api.get(`/shares/${date}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,  // Authorization 헤더 추가
        },
      });

      if (response.data.success) {
        console.log('API 요청 성공:', response.data.data);
        setFetchedConversations(response.data.data);
      } else {
        console.error('API 요청 실패: 성공 상태 아님', response.data);
        setError('해당 날짜에 저장된 대화가 없습니다.');
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      setError('데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: '#291695' },
        }}
        theme={calendarTheme}
      />

      <ScrollView contentContainerStyle={styles.conversationsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#291695" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : fetchedConversations && fetchedConversations.length > 0 ? (
          fetchedConversations.map((conversation, index) => (
            <TouchableOpacity
              key={index}
              style={styles.conversationItem}
              onPress={() => navigation.navigate('SavedShared', { date: selectedDate, title: conversation.title })}
            >
              <Text style={styles.conversationDate}>{selectedDate}</Text>
              <Text style={styles.conversationTitle}>{conversation.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noConversations}>저장된 공유 대화가 없습니다.</Text>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../../assets/home-icon-gray.png')} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('CalendarScreen')}>
          <Image source={require('../../assets/calendar-icon-navy.png')} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('MyPage')}>
          <Image source={require('../../assets/settings-icon-gray.png')} style={styles.footerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const calendarTheme = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  textSectionTitleDisabledColor: '#999999',
  selectedDayBackgroundColor: '#291695',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#ffffff',
  todayBackgroundColor: '#000000',
  dayTextColor: '#000000',
  textDisabledColor: '#999999',
  dotColor: '#00adf5',
  selectedDotColor: '#ffffff',
  arrowColor: '#999999',
  disabledArrowColor: '#999999',
  monthTextColor: 'black',
  indicatorColor: 'black',
  textDayFontFamily: 'monospace',
  textMonthFontFamily: 'monospace',
  textDayHeaderFontFamily: 'monospace',
  textDayFontWeight: '500',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  conversationsContainer: {
    padding: 15,
    paddingBottom: 70, 
  },
  conversationItem: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  conversationDate: {
    fontSize: 16,
    color: '#666',
  },
  conversationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  noConversations: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff', 
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 35,
    height: 35,
  },
});

export default CalendarScreen;