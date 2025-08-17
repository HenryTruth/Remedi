import {StyleSheet} from 'react-native';
import {pallete} from '../../configs/Colors';
import { moderateSize } from '../../utils/useResponsiveness';
import { hp, SCREEN_HEIGHT } from '../../configs/config';
import { fontFamilyWeightMap } from '../../configs/ThemeSetup';



export const styles = StyleSheet.create({
  container: {
    backgroundColor: pallete.screen,
  },
  mainContainer: {
    flex: 1,
    height: SCREEN_HEIGHT,
    backgroundColor: pallete.screen,
  },
  contentContainer: {
    flex: 1,
    backgroundColor:pallete.screen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateSize(48),
  },
  buttonContainer: {
    paddingBottom: moderateSize(40),
    paddingHorizontal: moderateSize(20),
    gap: moderateSize(12),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',

  },

  buttonStyles:{
    backgroundColor:pallete.dark,
    fontWeight:fontFamilyWeightMap.SemiBold,
    borderRadius: moderateSize(8),
    paddingVertical: hp(14),

  }
});
