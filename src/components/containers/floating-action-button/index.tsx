import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { styles } from './styles';
import { pallete } from '../../../configs/Colors';

export interface FloatingActionButtonProps {
  onPress: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Icon name="add" size={28} color={pallete.light} />
    </TouchableOpacity>
  );
};
