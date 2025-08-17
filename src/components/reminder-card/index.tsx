import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import AppText from '../app-text';
import { styles } from './styles';
import { pallete } from '../../configs/Colors';
import { fontFamilyWeightMap } from '../../configs/ThemeSetup';
import { moderateSize } from '../../utils/useResponsiveness';

export interface ReminderCardProps {
  id: string;
  medicationName: string;
  dosage: string;
  time: string;
  isCompleted?: boolean;
  onPress?: () => void;
  onComplete?: () => void;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({
  medicationName,
  dosage,
  time,
  isCompleted = false,
  onPress,
  onComplete,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, isCompleted && styles.completedContainer]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <AppText 
            text={medicationName}
            styles={[styles.medicationName, ...(isCompleted ? [styles.completedText] : [])]}
            color={isCompleted ? pallete.grey : pallete.text}
            fontSize={moderateSize(18)}
            fontWeight={fontFamilyWeightMap.SemiBold}
          />
          <AppText 
            text={dosage}
            styles={[styles.dosage, ...(isCompleted ? [styles.completedText] : [])]}
            color={pallete.grey}
            fontSize={moderateSize(14)}
            fontWeight={fontFamilyWeightMap.Regular}
          />
        </View>
        
        <View style={styles.rightContent}>
          <AppText 
            text={time}
            styles={[styles.time, ...(isCompleted ? [styles.completedText] : [])]}
            color={isCompleted ? pallete.grey : pallete.text}
            fontSize={moderateSize(16)}
            fontWeight={fontFamilyWeightMap.Medium}
          />
          {!isCompleted && onComplete && (
            <TouchableOpacity 
              style={styles.completeButton} 
              onPress={onComplete}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="checkmark-circle-outline" size={24} color={pallete.success} />
            </TouchableOpacity>
          )}
          {isCompleted && (
            <Icon name="checkmark-circle" size={24} color={pallete.success} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
