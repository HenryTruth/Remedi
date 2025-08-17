import {StyleSheet} from 'react-native';
import {pallete} from '../../configs/Colors';
import { moderateSize } from '../../utils/useResponsiveness';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: pallete.screen,
    paddingTop: moderateSize(48),
    textAlign: 'center',
  },
  buttonContainer:{
    marginTop: moderateSize(24),
  }
});
