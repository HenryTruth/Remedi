import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import notificationService from '../services/notificationService';

interface NotificationContextType {
  hasPermission: boolean;
  isLoading: boolean;
  requestPermissions: () => Promise<boolean>;
  scheduleReminder: (reminderId: string) => Promise<void>;
  cancelReminder: (reminderId: string) => Promise<void>;
  scheduleTestNotification: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check permissions on app start
  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      setIsLoading(true);
      // For now, assume permissions are granted
      setHasPermission(true);
    } catch (error) {
      console.error('Error checking notification permissions:', error);
      setHasPermission(false);
    } finally {
      // Request notification permissions
      requestPermissions();
      setIsLoading(false);
    }
  };

  const requestPermissions = async (): Promise<boolean> => {
    try {
      console.log('[NOTIFICATION CONTEXT] Requesting permissions...');
      const granted = await notificationService.requestPermissions();
      setHasPermission(granted);
      return granted;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      setHasPermission(false);
      return false;
    }
  };

  const scheduleReminder = async (reminderId: string): Promise<void> => {
    try {
      // This would be handled by the reminder service
      console.log(`Scheduling notifications for reminder: ${reminderId}`);
    } catch (error) {
      console.error('Error scheduling reminder:', error);
      throw error;
    }
  };

  const scheduleTestNotification = async (): Promise<void> => {
    try {
      await notificationService.scheduleTestNotification();
    } catch (error) {
      console.error('Error scheduling test notification:', error);
      throw error;
    }
  };

  const cancelReminder = async (reminderId: string): Promise<void> => {
    try {
      await notificationService.cancelNotificationsForReminder(reminderId);
    } catch (error) {
      console.error('Error cancelling reminder:', error);
      throw error;
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        hasPermission,
        isLoading,
        requestPermissions,
        scheduleReminder,
        cancelReminder,
        scheduleTestNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
