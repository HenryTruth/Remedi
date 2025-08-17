import React, {ReactNode} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {pallete} from '../../configs/Colors';
import AppText from '../app-text';
import { AppButtonTypes } from './type';
import { styles } from './styles';

const AppButton = ({
  isCentered = true,
  onPress,
  disabled = false,
  style,
  type = 'normal',
  text,
  textColor,
  fontSize,
  fontWeight,
}: AppButtonTypes) => {
  const Container = ({children}: {children: ReactNode}) => {
    return disabled ? (
      <View pointerEvents={disabled ? 'none' : 'auto'}>{children}</View>
    ) : (
      <>{children}</>
    );
  };

  return (
    <Container>
      <>
        <TouchableOpacity
          activeOpacity={disabled ? 1 : 0.7}
          onPress={onPress}
          style={[
            styles(type, pallete, isCentered, disabled).container,
            style,
          ]}>
          <AppText text={text} color={textColor} fontSize={fontSize} fontWeight={fontWeight} />
        </TouchableOpacity>
      </>
    </Container>
  );
};

export default AppButton;