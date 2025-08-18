import React, { useEffect } from 'react';
import NotificationService from './src/services/notificationService/notificationService';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import NavigationProvider from './src/routers/navigations';
import { pallete } from './src/configs/Colors';
import { AuthProvider } from './src/contexts/AuthContext';
import { NotificationProvider } from './src/contexts/NotificationContext';

enableScreens();



function App(): React.JSX.Element {
  useEffect(() => {
    NotificationService.initialize();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: pallete.screen}}>
        <AuthProvider>
          <NotificationProvider>
            <NavigationProvider />
          </NotificationProvider>
        </AuthProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
