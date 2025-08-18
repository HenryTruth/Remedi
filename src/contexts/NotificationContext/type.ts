import { ReactNode } from "react";

export interface NotificationContextType {
  hasPermission: boolean;
  isLoading: boolean;
  requestPermissions: () => Promise<boolean>;
  scheduleReminder: (reminderId: string) => Promise<void>;
  cancelReminder: (reminderId: string) => Promise<void>;
  scheduleTestNotification: () => Promise<void>;
}

export interface NotificationProviderProps {
    children: ReactNode;
  }