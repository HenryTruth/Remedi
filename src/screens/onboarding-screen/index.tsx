import { View } from "react-native"
import HScreen from "../../components/containers/h-screen"
import AppText from "../../components/app-text"
import { moderateSize } from "../../utils/useResponsiveness"
import AppButton from "../../components/app-button"
import { pallete } from "../../configs/Colors"
import { fontFamilyWeightMap } from "../../configs/ThemeSetup"
import { styles } from "./style"
import { GlobalScreenTypes } from "../../configs/global-screen-types"
import { routes } from "../../routers/router-constants/routes"

const OnboardingScreen = ({navigation}: GlobalScreenTypes) => {
    const navigateToLogin = () => {
        navigation.navigate(routes.LoginScreen);
    }

    const navigateToRegister = () => {
        navigation.navigate(routes.RegisterScreen);
    }

    const buttons = [
        { text: "Create Account", onPress: navigateToRegister },
        { text: "Login", onPress: navigateToLogin },
    ];

    return(
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
    )
}

export default OnboardingScreen