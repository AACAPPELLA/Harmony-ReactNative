import React from 'react';
import StatusScreen from '../../components/StatusScreen';

const SafeDetected = ({ navigation }) => {
  return (
    <StatusScreen
      navigation={navigation}
      message="안전한 상황일 것으로 예측돼요"
      buttonTitle={null}
      nextScreen="SafeDetail"
      imageSource={require('../../assets/safe.png')} // 안전 상황 아이콘
    />
  );
};

export default SafeDetected;
