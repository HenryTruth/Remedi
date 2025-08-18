import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from ".";

export const routes = {
    RegisterScreen: "RegisterScreen",
    LoginScreen: "LoginScreen",
    HomeScreen: "HomeScreen",
    ReminderFormScreen: "ReminderFormScreen",
    ProfileScreen: "ProfileScreen",
    ApplicationProvider: "ApplicationProvider",
    AuthenticationProvider: "AuthenticationProvider"
} as const;

export type NavigationProps = NativeStackNavigationProp<NavigationParamList>;