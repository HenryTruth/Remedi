import {ReactNode} from 'react';
import { fontFamilyTypes } from '../../configs/type';
import {TextStyle} from 'react-native';

export type AppTextTypes = {
  text: string | ReactNode;
  color?: string;
  styles?: TextStyle | Array<TextStyle>;
  numberOfLines?: number;
  cap?: boolean;
  allCaps?: boolean;
  fontSize?: number;
  fontWeight?: fontFamilyTypes[keyof fontFamilyTypes];
};