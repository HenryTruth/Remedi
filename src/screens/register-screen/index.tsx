import { View } from "react-native"
import HScreen from "../../components/containers/h-screen";
import AppText from "../../components/app-text";
import { pallete } from "../../configs/Colors";
import { styles } from "./style";
import { moderateSize } from "../../utils/useResponsiveness";
import { fontFamilyWeightMap } from "../../configs/ThemeSetup";
import AppButton from "../../components/app-button";
import useRegister from "./useRegister";
import { GlobalScreenTypes } from "../../configs/global-screen-types";

const RegisterScreen = ({navigation}:GlobalScreenTypes) => {
    const { navigateToCreateAccount, navigateToLogin } = useRegister({navigation});

    const buttons = [
        { text: "Create Account", onPress: navigateToCreateAccount },
        { text: "Login", onPress: navigateToLogin },
    ];

    return (
        <HScreen screenColor={pallete.screen} hasPadding={false}>
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                    <AppText text="Remedi" fontSize={moderateSize(24)} fontWeight={fontFamilyWeightMap.Bold} />
                </View>
                <View style={styles.buttonContainer}>
                    {buttons.map((button, index) => (
                        <AppButton
                            key={index}
                            text={button.text}
                            textColor={pallete.light}
                            fontSize={moderateSize(14)}
                            onPress={button.onPress}
                            style={styles.buttonStyles}
                            fontWeight={fontFamilyWeightMap.SemiBold}
                        />
                    ))}
                </View>
            </View>
        </HScreen>
    );
};

export default RegisterScreen;