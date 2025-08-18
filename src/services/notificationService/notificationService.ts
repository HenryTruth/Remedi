import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { Reminder } from '../../screens/home-screen/type';
import { Platform } from 'react-native';
import { ScheduledNotification } from './type';
import {
  NOTIFICATION_CHANNEL_ID,
  NOTIFICATION_CHANNEL_NAME,
  NOTIFICATION_ACTIONS,
  SCHEDULED_NOTIFICATIONS_KEY,
} from './constants';


class NotificationService {
  public initialize() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        if (notification.action === NOTIFICATION_ACTIONS[0]) {
          console.log('User chose to take medication now');
        } else if (notification.action === NOTIFICATION_ACTIONS[1]) {
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
      this.createAndroidChannel();
    }
  }

  /**
   * Requests notification permissions from the user.
   */
  public async requestPermissions(): Promise<boolean> {
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

  /**
   * Schedules all notifications for a given medication reminder.
   */
  public async scheduleNotificationsForReminder(reminder: Reminder): Promise<void> {
    try {
      const notifications = await this.getScheduledNotifications();
      
      // Remove existing notifications for this reminder to avoid duplicates
      const filteredNotifications = notifications.filter(n => n.reminderId !== reminder.id);
      
      const newNotifications: ScheduledNotification[] = reminder.times.map(time => ({
        id: `${reminder.id}_${time}_${Date.now()}`,
        reminderId: reminder.id,
        medicationName: reminder.medicationName,
        dosage: reminder.dosage,
        time: time,
        scheduledDate: this.getNextScheduledDate(time),
        isActive: true,
      }));

      const updatedNotifications = [...filteredNotifications, ...newNotifications];
      await this.storeScheduledNotifications(updatedNotifications);

      for (const notification of newNotifications) {
        await this.scheduleLocalNotification(notification);
      }

      console.log(`Scheduled ${newNotifications.length} notifications for ${reminder.medicationName}`);
    } catch (error) {
      console.error('Error scheduling notifications for reminder:', error);
      throw error;
    }
  }

  /**
   * Cancels all notifications for a given reminder ID.
   */
  public async cancelNotificationsForReminder(reminderId: string): Promise<void> {
    try {
      const notifications = await this.getScheduledNotifications();
      const activeNotifications = notifications.filter(n => n.reminderId === reminderId && n.isActive);
      
      for (const notification of activeNotifications) {
        await this.cancelLocalNotification(notification.id);
      }

      const updatedNotifications = notifications.filter(n => n.reminderId !== reminderId);
      await this.storeScheduledNotifications(updatedNotifications);

      console.log(`Cancelled notifications for reminder ${reminderId}`);
    } catch (error) {
      console.error('Error cancelling notifications for reminder:', error);
      throw error;
    }
  }

  /**
   * Retrieves all scheduled notifications for a specific reminder.
   */
  public async getNotificationsForReminder(reminderId: string): Promise<ScheduledNotification[]> {
    try {
      const notifications = await this.getScheduledNotifications();
      return notifications.filter(n => n.reminderId === reminderId);
    } catch (error) {
      console.error('Error getting notifications for reminder:', error);
      return [];
    }
  }

  /**
   * Clears all scheduled notifications from the system and storage.
   */
  public async clearAllNotifications(): Promise<void> {
    try {
      const notifications = await this.getScheduledNotifications();
      
      for (const notification of notifications) {
        await this.cancelLocalNotification(notification.id);
      }
      
      await this.storeScheduledNotifications([]);
      
      console.log('All notifications cleared');
    } catch (error) {
      console.error('Error clearing notifications:', error);
      throw error;
    }
  }

  /**
   * Schedules a test notification to fire in 10 seconds.
   */
  public async scheduleTestNotification(): Promise<void> {
    try {
      const testDate = new Date();
      testDate.setSeconds(testDate.getSeconds() + 10);
      
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
    } catch (error) {
      console.error('Error scheduling test notification:', error);
      throw error;
    }
  }


  private createAndroidChannel(): void {
    PushNotification.createChannel(
      {
        channelId: NOTIFICATION_CHANNEL_ID,
        channelName: NOTIFICATION_CHANNEL_NAME,
        channelDescription: 'Notifications for medication reminders',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`Channel created: ${created}`),
    );
  }

  private async getScheduledNotifications(): Promise<ScheduledNotification[]> {
    try {
      const notificationsJSON = await AsyncStorage.getItem(SCHEDULED_NOTIFICATIONS_KEY);
      return notificationsJSON ? JSON.parse(notificationsJSON) : [];
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }

  private async storeScheduledNotifications(notifications: ScheduledNotification[]): Promise<void> {
    try {
      await AsyncStorage.setItem(SCHEDULED_NOTIFICATIONS_KEY, JSON.stringify(notifications));
    } catch (error) {
      console.error('Error storing scheduled notifications:', error);
      throw error;
    }
  }

  private getNextScheduledDate(time: string): Date {
    const now = new Date();
    const scheduledDate = new Date();

    const timeMatch = time.match(/(\d+):(\d+)\s*(am|pm)/i);

    if (!timeMatch) {
      // Fallback for simplified time like "8am"
      const simpleMatch = time.match(/(\d+)(am|pm)/i);
      if (simpleMatch) {
        let hour = parseInt(simpleMatch[1], 10);
        const period = simpleMatch[2].toLowerCase();
        if (period === 'pm' && hour !== 12) hour += 12;
        if (period === 'am' && hour === 12) hour = 0;
        scheduledDate.setHours(hour, 0, 0, 0);
      } else {
        // Default to 1 hour from now if parsing fails completely
        scheduledDate.setHours(now.getHours() + 1, 0, 0, 0);
        return scheduledDate;
      }
    } else {
      let hour = parseInt(timeMatch[1], 10);
      const minute = parseInt(timeMatch[2], 10);
      const period = timeMatch[3].toLowerCase();

      if (period === 'pm' && hour !== 12) hour += 12;
      if (period === 'am' && hour === 12) hour = 0;

      scheduledDate.setHours(hour, minute, 0, 0);
    }

    if (scheduledDate <= now) {
      scheduledDate.setDate(scheduledDate.getDate() + 1);
    }

    return scheduledDate;
  }

  private async scheduleLocalNotification(notification: ScheduledNotification): Promise<void> {
    try {
      PushNotification.localNotificationSchedule({
        id: notification.id,
        channelId: NOTIFICATION_CHANNEL_ID,
        title: '💊 Medication Reminder',
        message: `Time to take ${notification.medicationName} (${notification.dosage})`,
        date: notification.scheduledDate,
        repeatType: 'day',
        actions: NOTIFICATION_ACTIONS,
        userInfo: {
          reminderId: notification.reminderId,
          medicationName: notification.medicationName,
          dosage: notification.dosage,
        },
        playSound: true,
        soundName: 'default',
        vibrate: true,
      });

      console.log(
        `[NOTIFICATION SCHEDULED] ${notification.medicationName} at ${notification.scheduledDate.toLocaleTimeString()}`,
      );
    } catch (error) {
      console.error('Error scheduling local notification:', error);
      throw error;
    }
  }

  private async cancelLocalNotification(notificationId: string): Promise<void> {
    try {
      PushNotification.cancelLocalNotifications({ id: notificationId });
      console.log(`[NOTIFICATION CANCELLED] ${notificationId}`);
    } catch (error) {
      console.error('Error cancelling local notification:', error);
      throw error;
    }
  }
}

export default new NotificationService();
