import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

export type NavigationParamList = {
    RegisterScreen: undefined;
    LoginScreen: undefined;
    HomeScreen:undefined;
    CreateReminderScreen:undefined;
    LogoutScreen:undefined;
    ApplicationProvider:undefined;
    AuthenticationProvider:undefined;

};

export type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const Stack = createNativeStackNavigator<NavigationParamList>();

export {Stack}