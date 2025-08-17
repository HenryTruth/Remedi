import { StyleSheet } from "react-native";
import { moderateSize } from "../../utils/useResponsiveness";
import { pallete } from "../../configs/Colors";
import { hp } from "../../configs/config";
import { wp } from "../../configs/config";

const styles = StyleSheet.create({
    inputLabel: {
        fontSize: moderateSize(14),
        fontWeight: '600',
        color: pallete.dark,
        marginBottom: hp(8),
        textAlign: 'left',
      },
      inputContainer: {
        marginBottom: hp(20),
      },
    
      
    
      inputField: {
        borderWidth: 1,
        borderColor: pallete.dark,
        borderRadius: moderateSize(8),
        paddingHorizontal: wp(16),
        paddingVertical: hp(12),
        fontSize: moderateSize(14),
        backgroundColor: pallete.light,
      },
    
      errorText: {
        fontSize: moderateSize(12),
        marginTop: hp(4),
        textAlign: 'left',
      },
})

export default styles;