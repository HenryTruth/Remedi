import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import notificationService from '../../services/notificationService/notificationService';
import { NotificationContextType, NotificationProviderProps } from './type';



const NotificationContext = createContext<NotificationContextType | undefined>(undefined);



export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      setIsLoading(true);
      setHasPermission(true);
    } catch (error) {
      setHasPermission(false);
    } finally {
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
      setHasPermission(false);
      return false;
    }
  };

  const scheduleReminder = async (reminderId: string): Promise<void> => {
    try {
    } catch (error) {
      throw error;
    }
  };

  const scheduleTestNotification = async (): Promise<void> => {
    try {
      await notificationService.scheduleTestNotification();
    } catch (error) {
      throw error;
    }
  };

  const cancelReminder = async (reminderId: string): Promise<void> => {
    try {
      await notificationService.cancelNotificationsForReminder(reminderId);
    } catch (error) {
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
