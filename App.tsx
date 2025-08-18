import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
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
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        
        if (notification.action === 'Take Now') {
          console.log('User chose to take medication now');
        } else if (notification.action === 'Snooze') {
          console.log('User chose to snooze medication');
        }

        notification.finish && notification.finish('UIBackgroundFetchResultNoData');
      },

      onRegistrationError: function(err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: Platform.OS === 'ios',
    });

    // Create notification channel for Android
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'medication-reminders',
          channelName: 'Medication Reminders',
          channelDescription: 'Notifications for medication reminders',
          playSound: true,
          soundName: 'default',
          importance: 4, // High importance
          vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`)
      );
    }
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
