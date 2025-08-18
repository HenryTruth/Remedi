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
    // Configure PushNotification
    PushNotification.configure({
      // Called when token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        
        // Handle notification actions
        if (notification.action === 'Take Now') {
          // Handle "Take Now" action
          console.log('User chose to take medication now');
        } else if (notification.action === 'Snooze') {
          // Handle "Snooze" action - reschedule for 10 minutes later
          console.log('User chose to snooze medication');
        }

        // Required on iOS only (see fetchCompletionHandler docs: https://reactnative.dev/docs/pushnotificationios)
        notification.finish && notification.finish('UIBackgroundFetchResultNoData');
      },

      // Called when the user fails to register for remote notifications
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      popInitialNotification: true,

      // (optional) default: true
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
