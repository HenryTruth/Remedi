import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from ".";

export const routes: Record<keyof NavigationParamList, keyof NavigationParamList> = {
    RegisterScreen: "RegisterScreen",
    LoginScreen: "LoginScreen",
    HomeScreen: "HomeScreen",
    CreateReminderScreen: "CreateReminderScreen",
    LogoutScreen: "LogoutScreen",
    ApplicationProvider: "ApplicationProvider",
    AuthenticationProvider: "AuthenticationProvider"
}

export type NavigationProps = NativeStackNavigationProp<NavigationParamList>;