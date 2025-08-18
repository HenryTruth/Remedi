import { View } from "react-native"
import HScreen from "../../components/containers/h-screen";
import { pallete } from "../../configs/Colors";
import { styles } from "./style";
import { moderateSize } from "../../utils/useResponsiveness";
import { fontFamilyWeightMap } from "../../configs/ThemeSetup";
import useRegister from "./useRegister";
import { GlobalScreenTypes } from "../../configs/global-screen-types";
import FormInputField from "../../components/containers/form-input-field";
import AppText from "../../components/common/app-text";
import AppButton from "../../components/common/app-button";

const RegisterScreen = ({navigation}:GlobalScreenTypes) => {
    const { 
        registrationFields,
        handleRegister,
        isLoading
    } = useRegister({navigation});

    return (
        <HScreen screenColor={pallete.screen} hasPadding={false}>
            <View style={{flex: 1}}>
                <View style={styles.contentContainer}>
                    <AppText text="Remedi" fontSize={moderateSize(24)} fontWeight={fontFamilyWeightMap.Bold} />
                </View>
                    
                <View style={styles.headerStyle}>
                    <AppText text="Create Account" fontSize={moderateSize(16)} fontWeight={fontFamilyWeightMap.SemiBold} styles={{textAlign:'center'}} />
                </View>
                
                <View style={styles.formContainer}>
                    {registrationFields.map((field, index) => (
                        <FormInputField key={index} field={field} />
                    ))}
                </View>
            </View>

            <View style={styles.bottomButtonContainer}>
                <AppButton
                    text={isLoading ? "Creating Account..." : "Create Account"}
                    textColor={pallete.light}
                    fontSize={moderateSize(14)}
                    onPress={handleRegister}
                    style={styles.submitButton}
                    fontWeight={fontFamilyWeightMap.SemiBold}
                    disabled={isLoading}
                />
            </View>
        </HScreen>
    );
};

export default RegisterScreen;