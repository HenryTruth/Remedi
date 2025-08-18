import { useState, useEffect } from 'react';
import { Reminder } from './type';
import reminderService from '../../services/reminderService/reminderService';
import { Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

export const useHome = () => {
  const { logout } = useAuth();

  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load reminders from AsyncStorage on component mount
  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      setIsLoading(true);
      const storedReminders = await reminderService.getReminders();
      setReminders(storedReminders);
    } catch (error) {
      console.error('Error loading reminders:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const upcomingReminders = reminders.filter(reminder => !reminder.isCompleted);
  const completedReminders = reminders.filter(reminder => reminder.isCompleted);

  const completeReminder = async (id: string) => {
    try {
      await reminderService.completeReminder(id);
      setReminders(prev => 
        prev.map(reminder => 
          reminder.id === id 
            ? { ...reminder, isCompleted: true }
            : reminder
        )
      );
    } catch (error) {
      console.error('Error completing reminder:', error);
    }
  };

  const addReminder = async (newReminder: Omit<Reminder, 'id' | 'createdAt'>) => {
    try {
      const reminder = await reminderService.addReminder(newReminder);
      setReminders(prev => [...prev, reminder]);
      return reminder;
    } catch (error) {
      console.error('Error adding reminder:', error);
      throw error;
    }
  };

  const updateReminder = async (id: string, updates: Partial<Reminder>) => {
    try {
      const updatedReminder = await reminderService.updateReminder(id, updates);
      if (updatedReminder) {
        setReminders(prev => 
          prev.map(reminder => 
            reminder.id === id ? updatedReminder : reminder
          )
        );
        return updatedReminder;
      }
    } catch (error) {
      console.error('Error updating reminder:', error);
      throw error;
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      await reminderService.deleteReminder(id);
      setReminders(prev => prev.filter(reminder => reminder.id !== id));
    } catch (error) {
      console.error('Error deleting reminder:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  return {
    reminders,
    upcomingReminders,
    completedReminders,
    isLoading,
    completeReminder,
    addReminder,
    updateReminder,
    deleteReminder,
    loadReminders,
    handleLogout
  };
};