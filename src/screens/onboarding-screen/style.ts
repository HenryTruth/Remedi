import { StyleSheet } from 'react-native';
import { pallete } from '../../configs/Colors';
import { moderateSize } from '../../utils/useResponsiveness';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: moderateSize(812),
    backgroundColor: pallete.screen,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: pallete.screen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateSize(100),
  },
  subtitle: {
    marginTop: moderateSize(8),
    textAlign: 'center',
    paddingHorizontal: moderateSize(20),
  },
  buttonContainer: {
    paddingHorizontal: moderateSize(20),
    paddingBottom: moderateSize(100),
    gap: moderateSize(16),
  },
  buttonStyles: {
    backgroundColor: pallete.dark,
    borderRadius: moderateSize(8),
    paddingVertical: moderateSize(16),
  },
});