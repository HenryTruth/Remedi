import { StackNavigationProp } from '@react-navigation/stack';







export type NavigatorScreenProps = {
  navigation: StackNavigationProp<
    Record<string, object | undefined>,
    'newProduct'
  >;
};


