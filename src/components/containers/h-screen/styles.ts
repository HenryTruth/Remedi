import {StyleSheet} from 'react-native';
import { pallete, palleteTypes } from '../../../configs/Colors';


const colorPallete:palleteTypes = pallete;

export const HScreenStyles = (hasPadding: boolean, colors?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors || colorPallete?.light,
      paddingHorizontal: hasPadding ? 16 : 0,
    },
  });