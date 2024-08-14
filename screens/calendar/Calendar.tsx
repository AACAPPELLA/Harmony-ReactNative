// CalendarScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');

  const savedConversations = {
    '2024-07-18': [{ title: 'HARMONY 3차 정기 회의' }],
    '2024-07-19': [{ title: 'HARMONY 3차 정기 회의' }],
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: '#291695' },
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#999999',
          selectedDayBackgroundColor: '#291695',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#ffffff',
          todayBackgroundColor:'#000000',
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
          textDayHeaderFontSize: 16
        }}
      />
      <ScrollView contentContainerStyle={styles.conversationsContainer}>
        {savedConversations[selectedDate] ? (
          savedConversations[selectedDate].map((conversation, index) => (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  conversationsContainer: {
    padding: 15,
    paddingBottom: 70, // Ensure content does not overlap with footer
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 45,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff', // Ensure footer background matches app background
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