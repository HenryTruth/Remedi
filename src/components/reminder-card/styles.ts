import { StyleSheet } from 'react-native';
import { pallete } from '../../configs/Colors';
import { Size, moderateSize } from '../../utils/useResponsiveness';
import { shadowStyles } from '../../configs/GlobalStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: pallete.light,
    borderRadius: moderateSize(16),
    padding: Size.calcWidth(20),
    marginVertical: Size.calcHeight(8),
    marginHorizontal: Size.calcWidth(16),
    ...shadowStyles,
    shadowColor: pallete.dark,
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  completedContainer: {
    backgroundColor: '#F8F9FA',
    opacity: 0.8,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
    marginRight: Size.calcWidth(16),
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  medicationName: {
    fontSize: moderateSize(18),
    fontWeight: '600',
    color: pallete.text,
    marginBottom: Size.calcHeight(4),
  },
  dosage: {
    fontSize: moderateSize(14),
    color: pallete.grey,
    fontWeight: '400',
  },
  time: {
    fontSize: moderateSize(16),
    fontWeight: '500',
    color: pallete.text,
    marginBottom: Size.calcHeight(8),
  },
  completedText: {
    color: pallete.grey,
    textDecorationLine: 'line-through',
  },
  completeButton: {
    padding: moderateSize(4),
  },
});
