import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import { fontFamilyTypes } from '../../configs/type';

export type AppButtonTypes = {
  isCentered?: boolean;
  children?: ReactNode;
  onPress?: () => void ;
  disabled?: boolean;
  style?: ViewStyle;
  text?: string;
  type?: buttonTypes;
  textColor?:string;
  fontSize?: number;
  fontWeight?: fontFamilyTypes[keyof fontFamilyTypes];

};

export type buttonTypes = 'outlined' | 'normal';