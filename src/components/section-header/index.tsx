import React from 'react';
import { View } from 'react-native';
import AppText from '../app-text';
import { styles } from './styles';
import { pallete } from '../../configs/Colors';
import { fontFamilyWeightMap } from '../../configs/ThemeSetup';
import { moderateSize } from '../../utils/useResponsiveness';

export interface SectionHeaderProps {
  title: string;
  count?: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, count }) => {
  return (
    <View style={styles.container}>
      <AppText 
        text={title}
        styles={styles.title}
        color={pallete.text}
        fontSize={moderateSize(12)}
        fontWeight={fontFamilyWeightMap.SemiBold}
      />
      {count !== undefined && (
        <View style={styles.countBadge}>
          <AppText 
            text={count.toString()}
            styles={styles.countText}
            color={pallete.light}
            fontSize={moderateSize(12)}
            fontWeight={fontFamilyWeightMap.SemiBold}
          />
        </View>
      )}
    </View>
  );
};
