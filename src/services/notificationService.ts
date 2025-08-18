import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { Reminder } from '../screens/home-screen/type';

const SCHEDULED_NOTIFICATIONS_KEY = '@remedi_scheduled_notifications';

export interface ScheduledNotification {
  id: string;
  reminderId: string;
  medicationName: string;
  dosage: string;
  time: string;
  scheduledDate: Date;
  isActive: boolean;
}

import { Platform } from 'react-native';

class NotificationService {
  initialize() {
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

      onRegistrationError: function (err) {
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
        (created) => console.log(`Channel created: ${created}`),
      );
    }
  }

  // Get all scheduled notifications
  async getScheduledNotifications(): Promise<ScheduledNotification[]> {
    try {
      const notifications = await AsyncStorage.getItem(SCHEDULED_NOTIFICATIONS_KEY);
      return notifications ? JSON.parse(notifications) : [];
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }

  // Store scheduled notifications
  async storeScheduledNotifications(notifications: ScheduledNotification[]): Promise<void> {
    try {
      await AsyncStorage.setItem(SCHEDULED_NOTIFICATIONS_KEY, JSON.stringify(notifications));
    } catch (error) {
      console.error('Error storing scheduled notifications:', error);
      throw error;
    }
  }

  // Schedule notifications for a reminder
  async scheduleNotificationsForReminder(reminder: Reminder): Promise<void> {
    try {
      const notifications = await this.getScheduledNotifications();
      
      // Remove existing notifications for this reminder
      const filteredNotifications = notifications.filter(n => n.reminderId !== reminder.id);
      
      // Create new notifications for each time
      const newNotifications: ScheduledNotification[] = reminder.times.map(time => ({
        id: `${reminder.id}_${time}_${Date.now()}`,
        reminderId: reminder.id,
        medicationName: reminder.medicationName,
        dosage: reminder.dosage,
        time: time,
        scheduledDate: this.getNextScheduledDate(time),
        isActive: true,
      }));

      // Add new notifications
      const updatedNotifications = [...filteredNotifications, ...newNotifications];
      await this.storeScheduledNotifications(updatedNotifications);

      // Schedule each notification (placeholder for actual notification scheduling)
      for (const notification of newNotifications) {
        await this.scheduleLocalNotification(notification);
      }

      console.log(`Scheduled ${newNotifications.length} notifications for ${reminder.medicationName}`);
    } catch (error) {
      console.error('Error scheduling notifications for reminder:', error);
      throw error;
    }
  }

  // Cancel notifications for a reminder
  async cancelNotificationsForReminder(reminderId: string): Promise<void> {
    try {
      const notifications = await this.getScheduledNotifications();
      const activeNotifications = notifications.filter(n => n.reminderId === reminderId && n.isActive);
      
      // Cancel each notification (placeholder for actual notification cancellation)
      for (const notification of activeNotifications) {
        await this.cancelLocalNotification(notification.id);
      }

      // Remove from storage
      const updatedNotifications = notifications.filter(n => n.reminderId !== reminderId);
      await this.storeScheduledNotifications(updatedNotifications);

      console.log(`Cancelled notifications for reminder ${reminderId}`);
    } catch (error) {
      console.error('Error cancelling notifications for reminder:', error);
      throw error;
    }
  }

  // Get next scheduled date for a time (e.g., "8am" -> next 8am)
  private getNextScheduledDate(time: string): Date {
    const now = new Date();
    const scheduledDate = new Date();
    
    // Parse time (simplified - assumes format like "8am", "12pm", "6pm")
    const timeMatch = time.match(/(\d+)(am|pm)/i);
    if (!timeMatch) {
      // Default to current time + 1 hour if parsing fails
      scheduledDate.setHours(now.getHours() + 1, 0, 0, 0);
      return scheduledDate;
    }

    let hour = parseInt(timeMatch[1]);
    const period = timeMatch[2].toLowerCase();
    
    // Convert to 24-hour format
    if (period === 'pm' && hour !== 12) {
      hour += 12;
    } else if (period === 'am' && hour === 12) {
      hour = 0;
    }

    scheduledDate.setHours(hour, 0, 0, 0);

    // If the time has already passed today, schedule for tomorrow
    if (scheduledDate <= now) {
      scheduledDate.setDate(scheduledDate.getDate() + 1);
    }

    return scheduledDate;
  }

  // Schedule a local notification
  private async scheduleLocalNotification(notification: ScheduledNotification): Promise<void> {
    try {
      PushNotification.localNotificationSchedule({
        id: notification.id,
        title: "💊 Medication Reminder",
        message: `Time to take ${notification.medicationName} (${notification.dosage})`,
        date: notification.scheduledDate,
        repeatType: 'day', // Repeat daily
        channelId: 'medication-reminders', // Android channel
        actions: ['Take Now', 'Snooze'],
        userInfo: {
          reminderId: notification.reminderId,
          medicationName: notification.medicationName,
          dosage: notification.dosage,
        },
        playSound: true,
        soundName: 'default',
        vibrate: true,
        vibration: 300,
        importance: 'high',
        invokeApp: true,
      });
      
      console.log(`[NOTIFICATION SCHEDULED] ${notification.medicationName} (${notification.dosage}) at ${notification.time}`);
    } catch (error) {
      console.error('Error scheduling local notification:', error);
      throw error;
    }
  }

  // Cancel a local notification
  private async cancelLocalNotification(notificationId: string): Promise<void> {
    try {
      PushNotification.cancelLocalNotifications({ id: notificationId });
      console.log(`[NOTIFICATION CANCELLED] ${notificationId}`);
    } catch (error) {
      console.error('Error cancelling local notification:', error);
      throw error;
    }
  }

  // Request notification permissions
  async requestPermissions(): Promise<boolean> {
    try {
      console.log('[NOTIFICATION PERMISSIONS] Requesting permissions...');
      
      const permissions = await PushNotification.requestPermissions(['alert', 'badge', 'sound']);
      const granted = !!(permissions.alert && permissions.badge && permissions.sound);
      
      console.log('[NOTIFICATION PERMISSIONS] Granted:', granted);
      return granted;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  // Clear all scheduled notifications
  async clearAllNotifications(): Promise<void> {
    try {
      const notifications = await this.getScheduledNotifications();
      
      // Cancel each notification
      for (const notification of notifications) {
        await this.cancelLocalNotification(notification.id);
      }
      
      // Clear stored notifications
      await this.storeScheduledNotifications([]);
      
      console.log('All notifications cleared');
    } catch (error) {
      console.error('Error clearing notifications:', error);
      throw error;
    }
  }

  // Test function - schedule a notification for 10 seconds from now
  async scheduleTestNotification(): Promise<void> {
    try {
      const testDate = new Date();
      testDate.setSeconds(testDate.getSeconds() + 10); // 10 seconds from now
      
      const testNotification: ScheduledNotification = {
        id: `test_${Date.now()}`,
        reminderId: 'test_reminder',
        medicationName: 'Test Medication',
        dosage: '1 tablet',
        time: testDate.toLocaleTimeString(),
        scheduledDate: testDate,
        isActive: true,
      };

      await this.scheduleLocalNotification(testNotification);
      
      console.log(`Test notification scheduled for: ${testDate.toLocaleTimeString()}`);
      return;
    } catch (error) {
      console.error('Error scheduling test notification:', error);
      throw error;
    }
  }

  // Get notifications for a specific reminder
  async getNotificationsForReminder(reminderId: string): Promise<ScheduledNotification[]> {
    try {
      const notifications = await this.getScheduledNotifications();
      return notifications.filter(n => n.reminderId === reminderId);
    } catch (error) {
      console.error('Error getting notifications for reminder:', error);
      return [];
    }
  }
}

export default new NotificationService();
