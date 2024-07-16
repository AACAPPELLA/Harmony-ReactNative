import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BackButton from '../../components/BackButton'; // Adjust the path as needed

export default function Screen1({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SafeDetail');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Image source={require('../../assets/safe.png')} style={styles.image} />
      <Text style={styles.title}>안전한 상황일 것으로 예측돼요</Text>
      <Text style={styles.subtitle1}>혹시 모를 상황에 대비하여, </Text>
      <Text style={styles.subtitle2}>다음 내용을 주의 깊게 살펴주세요.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#291695',
  },
  subtitle1: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle2: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});
