import { routes } from "../../routers/router-constants/routes";
import { GlobalScreenTypes } from "../../configs/global-screen-types";


const useRegister = ({navigation}:GlobalScreenTypes) => {
   

    const navigateToLogin = () => {
        navigation.navigate(routes.LoginScreen);
    }

    const navigateToCreateAccount = () => {
        // TODO: implement navigation to create account screen
        navigation.navigate(routes.LoginScreen); // Placeholder
    }

    return {
        navigateToLogin,
        navigateToCreateAccount
    }
}

export default useRegister;