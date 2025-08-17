import { Text, View, Dimensions } from "react-native"
import HScreen from "../../components/containers/h-screen";
import AppText from "../../components/app-text";
import { pallete } from "../../configs/Colors";
import { styles } from "./style";
import { moderateSize } from "../../utils/useResponsiveness";
import { fontFamilyWeightMap } from "../../configs/ThemeSetup";
import AppButton from "../../components/app-button";

const RegisterScreen = () => {

    return(
        <HScreen screenColor={pallete.screen} hasPadding={false}>
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                    <AppText text="Remedi" fontSize={moderateSize(24)} fontWeight={fontFamilyWeightMap.Bold} />
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton text="Create Account" textColor={pallete.light}  fontSize={moderateSize(12)}  onPress={()=>{}} style={styles.buttonStyles} fontWeight={fontFamilyWeightMap.SemiBold}/>
                    <AppButton text="Login" textColor={pallete.light} style={styles.buttonStyles} onPress={()=>{}} fontWeight={fontFamilyWeightMap.SemiBold} fontSize={moderateSize(12)}/>
                </View>
                
            </View>
        </HScreen>
    )
}

export default RegisterScreen;