import { StyleSheet } from 'react-native';
import { pallete } from '../../configs/Colors';
import { Size, moderateSize } from '../../utils/useResponsiveness';
import {  shadowStyles } from '../../configs/GlobalStyles';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: pallete.screen,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(20),
    paddingTop: Size.calcHeight(60),
    paddingBottom: Size.calcHeight(20),
    backgroundColor: pallete.light,
    borderBottomLeftRadius: moderateSize(24),
    borderBottomRightRadius: moderateSize(24),
    ...shadowStyles,
    shadowColor: pallete.dark,
    shadowOpacity: 0.1,
  },
  appTitle: {
    fontSize: moderateSize(28),
    fontWeight: '700',
    color: pallete.text,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateSize(12),
  },
  profileButton: {
    width: moderateSize(40),
    height: moderateSize(40),
    borderRadius: moderateSize(20),
    backgroundColor: pallete.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    width: moderateSize(40),
    height: moderateSize(40),
    borderRadius: moderateSize(20),
    backgroundColor: pallete.error || '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboardTitle: {
    fontSize: moderateSize(24),
    fontWeight: '600',
    color: pallete.text,
    paddingHorizontal: Size.calcWidth(20),
    paddingTop: Size.calcHeight(16),
    paddingBottom: Size.calcHeight(12),
  },
  content: {
    flex: 1,
    paddingBottom: Size.calcHeight(100), // Space for floating action button
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Size.calcWidth(40),
    paddingVertical: Size.calcHeight(60),
  },
  emptyStateText: {
    fontSize: moderateSize(16),
    color: pallete.grey,
    textAlign: 'center',
    marginTop: Size.calcHeight(16),
    lineHeight: moderateSize(24),
  },
  scrollContent: {
    paddingBottom: Size.calcHeight(20),
  },
});