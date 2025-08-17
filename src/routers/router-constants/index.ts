import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import {Reminder} from "../../screens/home-screen/type";

export type NavigationParamList = {
    RegisterScreen: undefined;
    LoginScreen: undefined;
    HomeScreen:undefined;
    ReminderFormScreen: { reminder?: Reminder };
    LogoutScreen:undefined;
    ApplicationProvider:undefined;
    AuthenticationProvider:undefined;

};

export type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

const Stack = createNativeStackNavigator<NavigationParamList>();

export {Stack}