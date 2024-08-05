import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Image source={require('../assets/goback.png')} style={styles.backButtonImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 5,
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
});

export default BackButton;