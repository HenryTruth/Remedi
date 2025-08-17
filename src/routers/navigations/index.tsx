import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateReminderScreen, HomeScreen, LoginScreen, LogoutScreen, RegisterScreen } from "../../screens";
import { NavigationParamList, Stack } from "../router-constants";
import { routes } from "../router-constants/routes";

type RootStackParamList = {
  ApplicationProvider: undefined;
  AuthenticationProvider: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator initialRouteName={routes.RegisterScreen}>
      <Stack.Screen name={routes.LoginScreen} component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.RegisterScreen} component={RegisterScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={routes.CreateReminderScreen} component={CreateReminderScreen} />
      <Stack.Screen name={routes.LogoutScreen} component={LogoutScreen} />
    </Stack.Navigator>
  );
};

const NavigationProvider = () => {
  const isAuthenticated = false; // Replace with your actual auth state

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen 
            name="ApplicationProvider" 
            component={AppStack} 
          />
        ) : (
          <RootStack.Screen 
            name="AuthenticationProvider" 
            component={AuthenticationStack} 
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationProvider;