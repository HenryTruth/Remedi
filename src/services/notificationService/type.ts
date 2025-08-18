export interface ScheduledNotification {
    id: string;
    reminderId: string;
    medicationName: string;
    dosage: string;
    time: string;
    scheduledDate: Date;
    isActive: boolean;
  }