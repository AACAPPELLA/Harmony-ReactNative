import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/BackButton';

const SetTitle = () => {
  const [title, setTitle] = useState("");
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation}></BackButton>
      <View style={styles.header}>
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
    fontSize: 22,
    color: "#000",
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    marginLeft: 30
  },
  highlight: {
    color: "#291695",
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    borderRadius: 15,
    fontSize: 17,
    color: "#000",
    marginBottom: 20,
    width: 320,
    marginLeft: 20
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
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 3
  },
});

export default SetTitle;
