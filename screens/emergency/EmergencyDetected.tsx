import React from 'react';
import StatusScreen from '../../components/StatusScreen';

const EmergencyDetected = ({ navigation }) => {
  return (
    <StatusScreen
      navigation={navigation}
      message="긴급 상황이에요"
      buttonTitle="자세히 보기"
      nextScreen="EmergencyDetail"
      imageSource={require('../../assets/emergency.png')} // 긴급 상황 아이콘
    />
  );
};

export default EmergencyDetected;
