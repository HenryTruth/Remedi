import { StackNavigationProp } from '@react-navigation/stack';




export type RootStackParamList = {
  ApplicationProvider: undefined;
  AuthenticationProvider: undefined;
};


export type NavigatorScreenProps = {
  navigation: StackNavigationProp<
    Record<string, object | undefined>,
    'newProduct'
  >;
};


