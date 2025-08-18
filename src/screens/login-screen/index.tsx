import { View } from "react-native";
import HScreen from "../../components/containers/h-screen";
import { pallete } from "../../configs/Colors";
import AppText from "../../components/app-text";
import AppButton from "../../components/app-button";
import { fontFamilyWeightMap } from "../../configs/ThemeSetup";
import { styles } from "./style";
import { moderateSize } from "../../utils/useResponsiveness";
import { useLogin } from "./useLogin";
import FormInputField from "../../components/containers/form-input-field";

const LoginScreen = () => {
    const { formFields, handleLogin, isLoading } = useLogin();

    return(
        <HScreen screenColor={pallete.screen} hasPadding={false}>
            <View style={{flex: 1}}>
                <View style={styles.contentContainer}>
                    <AppText text="Remedi" fontSize={moderateSize(24)} fontWeight={fontFamilyWeightMap.Bold} />
                </View>
                    
                <View style={styles.headerStyle}>
                    <AppText text="Login" fontSize={moderateSize(16)} fontWeight={fontFamilyWeightMap.SemiBold} styles={{textAlign:'center'}} />
                </View>
                
                <View style={styles.formContainer}>
                    {formFields.map((field, index) => (
                        <FormInputField key={index} field={field} />
                    ))}
                </View>
            </View>

            <View style={styles.bottomButtonContainer}>
                <AppButton
                    text={isLoading ? "Logging in..." : "Login"}
                    textColor={pallete.light}
                    fontSize={moderateSize(14)}
                    onPress={handleLogin}
                    style={styles.submitButton}
                    fontWeight={fontFamilyWeightMap.SemiBold}
                    disabled={isLoading}
                />
            </View>
        </HScreen>
    )
}

export default LoginScreen;