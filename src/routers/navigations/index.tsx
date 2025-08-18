import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, LoginScreen, OnboardingScreen, ProfileScreen, RegisterScreen, ReminderFormScreen } from "../../screens";
import { Stack } from "../router-constants";
import { routes } from "../router-constants/routes";
import { RootStackParamList } from "./type";
import { useAuth } from "../../contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { pallete } from "../../configs/Colors";



const RootStack = createNativeStackNavigator<RootStackParamList>();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator initialRouteName={routes.OnboardingScreen}>
      <Stack.Screen name={routes.OnboardingScreen} component={OnboardingScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.LoginScreen} component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.RegisterScreen} component={RegisterScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName={routes.HomeScreen}>
      <Stack.Screen name={routes.HomeScreen} component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.ReminderFormScreen} component={ReminderFormScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.ProfileScreen} component={ProfileScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

const NavigationProvider = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: pallete.screen }}>
        <ActivityIndicator size="large" color={pallete.primary} />
      </View>
    );
  }

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