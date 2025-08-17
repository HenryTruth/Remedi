import { Text, View } from "react-native";
import HScreen from "../../components/containers/h-screen";
import { pallete } from "../../configs/Colors";
import { topViewStyle } from "../../configs/GlobalStyles";
import AppText from "../../components/app-text";
import { fontFamilyWeightMap } from "../../configs/ThemeSetup";
import { styles } from "./style";
import { moderateSize } from "../../utils/useResponsiveness";

const LoginScreen = () => {

    return(
        <HScreen screenColor={pallete.screen}>
            <View style={styles.container}>
                <AppText text="Remedi" fontSize={moderateSize(24)} fontWeight={fontFamilyWeightMap.Bold} />
            </View>
        </HScreen>
    )
}

export default LoginScreen;