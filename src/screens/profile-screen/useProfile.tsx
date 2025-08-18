import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import reminderService from '../../services/reminderService/reminderService';

export const useProfile = () => {
  const { user: authUser, logout } = useAuth();
  const [reminderStats, setReminderStats] = useState({
    activeMedications: 0,
    completedToday: 0,
    totalToday: 0,
    nextReminder: null as string | null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReminderStats();
  }, []);

  const loadReminderStats = async () => {
    try {
      setIsLoading(true);
      const reminders = await reminderService.getReminders();
      const upcomingReminders = await reminderService.getUpcomingReminders();
      const completedReminders = await reminderService.getCompletedReminders();

      const uniqueMedications = new Set(upcomingReminders.map(r => r.medicationName));
      
      const totalToday = reminders.length;
      const completedToday = completedReminders.length;

      const nextReminder = upcomingReminders.length > 0 
        ? upcomingReminders[0].times[0] 
        : null;

      setReminderStats({
        activeMedications: uniqueMedications.size,
        completedToday,
        totalToday,
        nextReminder,
      });
    } catch (error) {
      console.error('Error loading reminder stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return {
    user: authUser,
    reminderStats,
    isLoading,
    handleLogout,
    loadReminderStats,
  };
};