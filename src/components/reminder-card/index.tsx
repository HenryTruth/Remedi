import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated, Alert } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { styles } from './styles';
import { pallete } from '../../configs/Colors';
import { fontFamilyWeightMap } from '../../configs/ThemeSetup';
import { moderateSize } from '../../utils/useResponsiveness';
import AppText from '../common/app-text';

export interface ReminderCardProps {
  id: string;
  medicationName: string;
  dosage: string;
  time: string;
  isCompleted?: boolean;
  onPress?: () => void;
  onComplete?: () => void;
  onDelete?: () => void;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({
  medicationName,
  dosage,
  time,
  isCompleted = false,
  onPress,
  onComplete,
  onDelete,
}) => {
  const handleLongPress = () => {
    if (onDelete) {
      Alert.alert(
        'Delete Reminder',
        `Are you sure you want to delete "${medicationName}"?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: onDelete,
          },
        ]
      );
    }
  };
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity 
        style={[styles.container, isCompleted && styles.completedContainer]} 
        onPress={onPress}
        onLongPress={handleLongPress}
        activeOpacity={0.7}
        delayLongPress={500}
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
      
      {/* Delete Button - Overlay */}
      {onDelete && (
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleLongPress}
          activeOpacity={0.7}
        >
          <Icon name="trash-outline" size={16} color={pallete.error} />
        </TouchableOpacity>
      )}
    </View>
  );
};
