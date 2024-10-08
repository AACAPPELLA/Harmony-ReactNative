import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const StatusScreen = ({ navigation, message, buttonTitle, nextScreen, imageSource,loadingimageSource }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.icon} />
      <Text style={styles.text}>{message}</Text>
      <Image source={loadingimageSource} style={styles.loadingicon} />
      {buttonTitle && (
        <Button
          title={buttonTitle}
          onPress={() => navigation.navigate(nextScreen)}
          color="#841584"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingicon:{
    width: 10,
    height: 10
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default StatusScreen;
