import { StyleSheet } from 'react-native';
import { pallete } from '../../../configs/Colors';
import { Size, moderateSize } from '../../../utils/useResponsiveness';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(16),
    // paddingVertical: Size.calcHeight(12),
    marginTop: Size.calcHeight(24),
    marginBottom: Size.calcHeight(8),
  },
  title: {
    fontSize: moderateSize(20),
    fontWeight: '600',
    color: pallete.text,
  },
  countBadge: {
    backgroundColor: pallete.primary,
    borderRadius: moderateSize(12),
    paddingHorizontal: Size.calcWidth(8),
    paddingVertical: Size.calcHeight(6),
    minWidth: moderateSize(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: moderateSize(12),
    fontWeight: '600',
    color: pallete.light,
  },
});
