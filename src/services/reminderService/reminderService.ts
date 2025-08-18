import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reminder } from '../../screens/home-screen/type';
import notificationService from '../notificationService/notificationService';

const REMINDERS_KEY = '@remedi_reminders';

class ReminderService {
  async getReminders(): Promise<Reminder[]> {
    try {
      const reminders = await AsyncStorage.getItem(REMINDERS_KEY);
      return reminders ? JSON.parse(reminders) : [];
    } catch (error) {
      console.error('Error getting reminders:', error);
      return [];
    }
  }

  async storeReminders(reminders: Reminder[]): Promise<void> {
    try {
      await AsyncStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
    } catch (error) {
      console.error('Error storing reminders:', error);
      throw error;
    }
  }

  async addReminder(reminderData: Omit<Reminder, 'id' | 'createdAt'>): Promise<Reminder> {
    try {
      const reminders = await this.getReminders();
      const newReminder: Reminder = {
        ...reminderData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      
      reminders.push(newReminder);
      await this.storeReminders(reminders);
      
      await notificationService.scheduleNotificationsForReminder(newReminder);
      
      return newReminder;
    } catch (error) {
      console.error('Error adding reminder:', error);
      throw error;
    }
  }

  async updateReminder(id: string, updates: Partial<Reminder>): Promise<Reminder | null> {
    try {
      const reminders = await this.getReminders();
      const reminderIndex = reminders.findIndex(r => r.id === id);
      
      if (reminderIndex === -1) {
        throw new Error('Reminder not found');
      }

      const updatedReminder = { ...reminders[reminderIndex], ...updates };
      reminders[reminderIndex] = updatedReminder;
      
      await this.storeReminders(reminders);
      
      await notificationService.cancelNotificationsForReminder(id);
      await notificationService.scheduleNotificationsForReminder(updatedReminder);
      
      return updatedReminder;
    } catch (error) {
      console.error('Error updating reminder:', error);
      throw error;
    }
  }

  async deleteReminder(id: string): Promise<void> {
    try {
      const reminders = await this.getReminders();
      const filteredReminders = reminders.filter(r => r.id !== id);
      
      if (filteredReminders.length === reminders.length) {
        throw new Error('Reminder not found');
      }

      await this.storeReminders(filteredReminders);
      
      await notificationService.cancelNotificationsForReminder(id);
    } catch (error) {
      console.error('Error deleting reminder:', error);
      throw error;
    }
  }

  async completeReminder(id: string): Promise<Reminder | null> {
    try {
      return await this.updateReminder(id, { isCompleted: true });
    } catch (error) {
      console.error('Error completing reminder:', error);
      throw error;
    }
  }

  async getReminderById(id: string): Promise<Reminder | null> {
    try {
      const reminders = await this.getReminders();
      return reminders.find(r => r.id === id) || null;
    } catch (error) {
      console.error('Error getting reminder by ID:', error);
      return null;
    }
  }

  async getUpcomingReminders(): Promise<Reminder[]> {
    try {
      const reminders = await this.getReminders();
      return reminders.filter(r => !r.isCompleted);
    } catch (error) {
      console.error('Error getting upcoming reminders:', error);
      return [];
    }
  }

  async getCompletedReminders(): Promise<Reminder[]> {
    try {
      const reminders = await this.getReminders();
      return reminders.filter(r => r.isCompleted);
    } catch (error) {
      console.error('Error getting completed reminders:', error);
      return [];
    }
  }

  async clearAllReminders(): Promise<void> {
    try {
      await AsyncStorage.removeItem(REMINDERS_KEY);
    } catch (error) {
      console.error('Error clearing reminders:', error);
      throw error;
    }
  }
}

export default new ReminderService();
