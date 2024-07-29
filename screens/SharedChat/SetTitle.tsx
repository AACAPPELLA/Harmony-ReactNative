import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SetTitle = () => {
  const [title, setTitle] = useState("");
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image source={require('../../assets/mpBack.png')} style={styles.backIcon} resizeMode='contain'/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>공유 대화</Text>
      </View>
      <View style={styles.setTitleContainer}>
        <Text style={styles.setTitleText}>
          공유 대화의 저장을 위해{"\n"}<Text style={styles.highlight}>이름</Text>을 작성해주세요
        </Text>
        <TextInput
          style={styles.titleInput}
          placeholder="ex) 프로젝트 기획안 3차 회의"
          placeholderTextColor="#999999"
          value={title}
          onChangeText={setTitle}
        />
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('SavedShared')}>
          <Text style={styles.saveButtonText}>저장하기</Text>
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
  setTitleContainer: {
    padding: 20,
    marginTop: 10,
    flex: 1,

  },
  setTitleText: {
    fontSize: 18,
    color: "#000",
    fontWeight: 'bold',
    marginBottom: 40,
  },
  highlight: {
    color: "#291695",
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#291695",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SetTitle;
