import { StyleSheet } from 'react-native';
import { pallete } from '../../../configs/Colors';
import { Size, moderateSize } from '../../../utils/useResponsiveness';
import { shadowStyles } from '../../../configs/GlobalStyles';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Size.calcHeight(30),
    right: Size.calcWidth(20),
    width: moderateSize(56),
    height: moderateSize(56),
    borderRadius: moderateSize(28),
    backgroundColor: pallete.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowStyles,
    shadowColor: pallete.dark,
    shadowOpacity: 0.3,
    elevation: 8,
  },
});
