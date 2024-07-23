import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SetTitle = () => {
  const [title, setTitle] = useState("");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{"<"}</Text>
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
  setTitleContainer: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  setTitleText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
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
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SetTitle;
