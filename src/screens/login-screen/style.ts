import {StyleSheet} from 'react-native';
import {pallete} from '../../configs/Colors';
import { moderateSize } from '../../utils/useResponsiveness';
import { hp, wp } from '../../configs/Config';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: pallete.screen,
    paddingTop: moderateSize(48),
    textAlign: 'center',
  },
  
  mainContainer: {
    flex: 1,
    backgroundColor: pallete.screen,
  },

  headerStyle:{
    backgroundColor:pallete.screen,
    paddingTop:moderateSize(30)
    
  },

  contentContainer: {
    backgroundColor:pallete.screen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateSize(48),
    paddingBottom: moderateSize(20),
  },

  buttonContainer:{
    marginTop: moderateSize(24),
  },

  formContainer: {
    paddingHorizontal: wp(24),
    paddingTop: hp(20),
    backgroundColor:pallete.screen
  },

  

  bottomButtonContainer: {
    backgroundColor:pallete.screen,
    paddingHorizontal: wp(9),
    paddingBottom: hp(40),
    paddingTop: hp(20),
  },

  submitButton: {
    backgroundColor: pallete.dark,
    borderRadius: moderateSize(8),
    paddingVertical: hp(14),
  }
});
