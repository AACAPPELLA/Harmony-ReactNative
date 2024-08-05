import React, { useEffect } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const handlePermissionError = (message, essential) => {
  // 권한 오류 처리 로직을 여기에 작성하세요.
  console.log(message);
};

const handlePermissionSuccess = () => {
  // 권한 허용 후의 성공 처리 로직을 여기에 작성하세요.
  console.log('Permission granted');
};

const checkAndRequestPermission = async (needPermission, essential) => {
  let requested;

  try {
    // 권한 상태 확인
    const checked = await check(needPermission);

    switch (checked) {
      case RESULTS.UNAVAILABLE:
        // 권한이 지원되지 않는 경우
        return handlePermissionError('Permission unavailable', essential);

      case RESULTS.GRANTED:
        // 권한이 이미 허용된 경우
        return handlePermissionSuccess();

      case RESULTS.DENIED:
        // 권한 요청이 거부된 경우, 권한 요청
        requested = await request(needPermission);
        if (requested === RESULTS.GRANTED) {
          return handlePermissionSuccess();
        }
        // 권한 요청 후에 GRANTED가 아닌 경우 아래로 이동

      case RESULTS.LIMITED:
      case RESULTS.BLOCKED:
      default:
        // 권한이 제한되었거나 차단된 경우
        return handlePermissionError('Permission blocked', essential);
    }
  } catch (error) {
    // 권한 요청 중 오류가 발생한 경우
    console.error('Permission request failed:', error);
    handlePermissionError('Permission request failed', essential);
  }
};

const Test = () => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      checkAndRequestPermission(PERMISSIONS.IOS.MICROPHONE, true);
    }
  }, []);

  return (
    <View>
      <Text>권한 요청 컴포넌트</Text>
      <Button
        title="마이크 권한 요청"
        onPress={() => checkAndRequestPermission(PERMISSIONS.IOS.MICROPHONE, true)}
      />
    </View>
  );
};

export default Test;
