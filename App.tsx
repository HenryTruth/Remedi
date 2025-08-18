import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import NavigationProvider from './src/routers/navigations';
import { pallete } from './src/configs/Colors';
import { AuthProvider } from './src/contexts/AuthContext';

enableScreens();



function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: pallete.screen}}>
        <AuthProvider>
          <NavigationProvider />
        </AuthProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
