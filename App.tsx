/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme, View, Text, Image} from 'react-native';
import MainLogo from './MainLogo.tsx';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#291695',
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <View style={styles.container}>
        <Image source={require('./assets/images/main-logo.png')} style={styles.image} />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20, // 이미지와 텍스트 사이의 간격을 추가합니다
  },
  image: {
    width: 150,
    height: 200,
  },
});

export default App;
